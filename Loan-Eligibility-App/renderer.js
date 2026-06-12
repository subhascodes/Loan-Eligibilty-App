window.addEventListener('DOMContentLoaded', () => {
  const minimizeButton = document.getElementById('minimizeButton');
  const maximizeButton = document.getElementById('maximizeButton');
  const closeButton = document.getElementById('closeButton');
  const canUseElectronApi = typeof window.electronAPI !== 'undefined';

  // Title bar buttons
  if (minimizeButton && canUseElectronApi) {
    minimizeButton.addEventListener('click', () => {
      window.electronAPI.minimize();
    });
  }
  
  if (maximizeButton && canUseElectronApi) {
    maximizeButton.addEventListener('click', () => {
      window.electronAPI.maximize();
    });
  }
  
  if (closeButton && canUseElectronApi) {
    closeButton.addEventListener('click', () => {
      window.electronAPI.close();
    });
  }
  

  // Sidebar toggle buttons
  const menuButtonTop = document.getElementById('menuButtonTop');
  const menuButtonSidebar = document.getElementById('menuButtonSidebar');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  function toggleSidebar() {
    console.log("Toggle sidebar clicked"); // ✅ debug log
    if (sidebar && overlay) {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    }
  }
  

  if (menuButtonTop) {
    document.addEventListener('click', (event) => {
      if (event.target.closest('#menuButtonTop')) {
        toggleSidebar();
      }
    });
    
  }

  if (menuButtonSidebar) {
    document.addEventListener('click', (event) => {
      if (event.target.closest('#menuButtonSidebar')) {
        toggleSidebar();
      }
    });
    
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  }
 
  // Sidebar navigation links
  const loanPredictionLink = document.getElementById('loanPrediction');
  if (loanPredictionLink) {
    loanPredictionLink.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  const loanVizLink = document.getElementById('loanViz');
  if (loanVizLink) {
    loanVizLink.addEventListener('click', () => {
      window.location.href = 'data_visualization.html';
    });
  }

  const aboutLink = document.getElementById('about');
  if (aboutLink) {
    aboutLink.addEventListener('click', () => {
      window.location.href = 'about_us.html';
    });
  }

  const backToHomeLink = document.getElementById('backButton');
  if (backToHomeLink) {
    backToHomeLink.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  // Predict Button enhanced functionality (replaces earlier alert-only code)
  const predictButton = document.getElementById('predictButton');
  if (predictButton) {
    predictButton.addEventListener('click', async () => {
      console.log("Predict clicked!")
      const formData = {
        Gender: document.getElementById('gender').value,
        Married: document.getElementById('married').value,
        Dependents: document.getElementById('dependents').value,
        Education: document.getElementById('education').value,
        Self_Employed: document.getElementById('self_employed').value,
        ApplicantIncome: parseFloat(document.getElementById('applicant_income').value),
        CoapplicantIncome: parseFloat(document.getElementById('coapplicant_income').value),
        LoanAmount: parseFloat(document.getElementById('loan_amount').value),
        Loan_Amount_Term: parseFloat(document.getElementById('loan_term').value),
        Credit_History: parseFloat(document.getElementById('credit_history').value),
        Property_Area: document.getElementById('property_area').value
      };

      console.log("Form Data to send:", formData);

      try {
        const result = canUseElectronApi && typeof window.electronAPI.predictLoan === 'function'
          ? await window.electronAPI.predictLoan(formData)
          : await fetch('/api/predict', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            }).then(async (response) => {
              const data = await response.json();
              if (!response.ok) {
                throw new Error(data.error || 'Prediction request failed');
              }
              return data;
            });

        console.log("Prediction result:", result);
        localStorage.setItem('confidenceScore', result.probability);
        if (result.prediction === 'Y') {
          window.location.href = 'approved.html';
        } else {
          window.location.href = 'not_approved.html';
        }

      } catch (err) {
        console.error("Caught error during prediction:", err);
        alert("Prediction failed. See console.");
      }      
    });
  }

});

