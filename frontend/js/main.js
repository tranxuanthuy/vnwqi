import { initCalcWQI } from './calc_wqi.js';
import { initPredictWQI } from './predict_wq.js';
document.addEventListener("DOMContentLoaded", function () {
  const tabCalc = document.getElementById("tab-calc");
  const tabPredict = document.getElementById("tab-predict");
  const mainContent = document.getElementById("main-content");

  function loadCalcUI() {
    mainContent.innerHTML = `
      <section class="wqi-section">
        <h2>Calculate Water Quality Index (WQI)</h2>
        <div class="step-box">
          <h4>Step 1: Download Template</h4>
          <p>Download the required CSV template file, fill it with your data, then upload the completed file in Step 2.</p>
          <a class="btn-download" href="assets/wqi_template.csv" download>
            &#128190; Download Template
          </a>
          <p class="template-note">Template includes columns: pH, Aldrin, BHC, ...</p>
        </div>
        <div class="step-box">
          <h4>Step 2: Upload Your Data</h4>
          <input type="file" id="csv-file" accept=".csv" />
          <button id="submit-file">Submit</button>
          <div id="calc-result"></div>
        </div>
      </section>
    `;
    initCalcWQI();
  }

  function loadPredictUI() {
    mainContent.innerHTML = `
    <section class="wqi-form-container">
      <h2>Predict Water Quality Index (WQI)</h2>
      <form id="predict-form">
        <div class="form-group"><label>BOD5</label><input name="BOD5" type="number" step="0.01" required /></div>
        <div class="form-group"><label>COD</label><input name="COD" type="number" step="0.01" required /></div>
        <div class="form-group"><label>TOC</label><input name="TOC" type="number" step="0.01" required /></div>
        <div class="form-group"><label>BHC</label><input name="BHC" type="number" step="0.01" required /></div>
        <div class="form-group"><label>Cd</label><input name="Cd" type="number" step="0.01" required /></div>
        <div class="form-group"><label>Cr6</label><input name="Cr6" type="number" step="0.01" required /></div>
        <button type="submit">Predict</button>
      </form>
      <div id="predict-result"></div>
    </section>
    `;
    initPredictWQI();
  }
  
  // Tab switching
  tabCalc.addEventListener("click", function () {
    tabCalc.classList.add("active");
    tabPredict.classList.remove("active");
    loadCalcUI();
  });

  tabPredict.addEventListener("click", function () {
    tabPredict.classList.add("active");
    tabCalc.classList.remove("active");
    loadPredictUI();
  });

  // default to load the calculation UI
  loadCalcUI();
});
