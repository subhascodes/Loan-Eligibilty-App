from http.server import BaseHTTPRequestHandler
import json
import os

import joblib
import pandas as pd


MODEL_DIR = os.path.join(os.getcwd(), 'model')
MODEL_PATH = os.path.join(MODEL_DIR, 'svm_loan_model.pkl')
SCALER_PATH = os.path.join(MODEL_DIR, 'scaler.pkl')
MODEL_COLUMNS_PATH = os.path.join(MODEL_DIR, 'model_columns.pkl')

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
model_columns = joblib.load(MODEL_COLUMNS_PATH)


def preprocess_input(user_input):
    df = pd.DataFrame([user_input])
    categorical = ['Gender', 'Married', 'Dependents', 'Education', 'Self_Employed', 'Property_Area']
    df = pd.get_dummies(df, columns=categorical)

    for column in model_columns:
        if column not in df.columns:
            df[column] = 0

    df = df[model_columns]

    numerical = ['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History']
    df[numerical] = scaler.transform(df[numerical])

    return df


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status_code, payload):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path != '/api/predict':
            self._send_json(404, {'error': 'Not found'})
            return

        try:
            content_length = int(self.headers.get('Content-Length', '0'))
            raw_body = self.rfile.read(content_length).decode('utf-8')
            user_input = json.loads(raw_body)

            processed = preprocess_input(user_input)
            prediction = model.predict(processed)[0]
            probability = model.predict_proba(processed)[0].max()

            self._send_json(200, {
                'prediction': str(prediction),
                'probability': round(float(probability), 2),
            })
        except Exception as exc:
            self._send_json(500, {'error': str(exc)})