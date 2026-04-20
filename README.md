# 🏦 Loan Eligibility Prediction App

An AI-powered desktop application designed to predict loan approval eligibility using Machine Learning. This project combines a modern **Electron** frontend with a robust **SVM (Support Vector Machine)** prediction model.

---

## 🚀 Overview

This application streamlines the loan application process by providing instant feedback on eligibility. By analyzing key applicant data—such as income, credit history, education, and property area—the system predicts whether a loan is likely to be approved or rejected.

### Key Features
- **Real-time Prediction**: Get instant results based on applicant data.
- **Data Visualization**: Interactive charts (Gender distribution, Loan status by property area) to understand trends.
- **Premium UI/UX**: A clean, desktop-native interface built with Electron.
- **ML Powered**: Driven by a Support Vector Machine (SVM) model trained on historical loan data.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Electron](https://www.electronjs.org/)
- **Core**: HTML5, CSS3 (Vanilla), JavaScript
- **Inter-Process Communication (IPC)**: Used for secure bridge between Frontend and Python logic.

### AI & Machine Learning
- **Language**: Python 3.x
- **Libraries**:
  - `Scikit-learn`: SVM Model training & prediction.
  - `Pandas`: Data manipulation and preprocessing.
  - `Joblib`: Model serialization.
  - `Matplotlib`: Data visualization logic.

---

## 📁 Project Structure

```text
├── Loan-Eligibility-App/          # Electron Frontend Application
│   ├── assets/                    # UI images and icons
│   ├── model/                     # Trained ML models and prediction bridge
│   ├── index.html                 # Main dashboard
│   ├── renderer.js                # Frontend logic & IPC handling
│   └── main.js                    # Electron main process
├── Loan_Approval_Prediction_AI/   # ML Training & Research
│   ├── loan_approval_prediction.py # Model training script
│   └── loan_prediction.csv        # Dataset used for training
└── README.md                      # Project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Python 3.x](https://www.python.org/)
- `npm` (comes with Node.js)

### 1. Setup Python Environment
Install the required ML libraries:
```bash
pip install pandas scikit-learn joblib matplotlib
```

### 2. Setup Electron Frontend
Navigate to the app directory and install dependencies:
```bash
cd Loan-Eligibility-App
npm install
```

### 3. Run the Application
Start the desktop app:
```bash
npm start
```

---

## 🔗 Resources

- 🎨 [Frontend Design (Figma)](https://www.figma.com/design/AdG1x9TFtwiQkrg8nxJ9LI/AI-Project?node-id=0-1&t=yoTCN6fI0PiNBE7r-1)
- 📊 [Project Presentation](https://drive.google.com/file/d/1oMdQnRfUO2ENptJIw4Gxt3DWy4NaAe-P/view?usp=sharing)
- 🖼️ [Project Poster](https://drive.google.com/file/d/1bidA_PmZ8ivigv4qcKugudw6I8DIXgyg/view?usp=sharing)

---

## 📝 License
This project is licensed under the **ISC License**.
