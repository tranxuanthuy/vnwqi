import { BASE_API_URL } from "./config.js";
export function initCalcWQI() {
  const fileInput = document.getElementById("csv-file");
  const submitBtn = document.getElementById("submit-file");
  const resultBox = document.getElementById("calc-result");

  submitBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) {
      resultBox.innerHTML = `<p style="color:red">Please select a CSV file.</p>`;
      return;
    }

    const reader = new FileReader();
    reader.onload = async function (e) {
      const csvText = e.target.result;
      const jsonData = parseCSV(csvText);  // Chuyển CSV thành JSON array

      resultBox.innerHTML = `<p>Processing...</p>`;

      try {
        const response = await fetch(`${BASE_API_URL}/calculate_wqi_batch`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: jsonData }),
        });

        if (!response.ok) {
          const err = await response.text();
          throw new Error(err);
        }

        const result = await response.json();
        displayResult(result, resultBox);
      } catch (error) {
        resultBox.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
      }
    };

    reader.readAsText(file);
  });
}

// Hàm đơn giản để chuyển CSV thành Array<Object>
function parseCSV(csv) {
  const lines = csv.split("\n").filter(line => line.trim().length > 0);
  const headers = lines[0].split(",").map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(",").map(v => v.trim());
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = isNaN(values[i]) ? values[i] : parseFloat(values[i]);
    });
    return obj;
  });
}

function displayResult(data, container) {
  if (Array.isArray(data)) {
    const table = document.createElement("table");
    table.classList.add("result-table");

    const headerRow = document.createElement("tr");
    Object.keys(data[0]).forEach((key) => {
      const th = document.createElement("th");
      th.textContent = key;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    data.forEach((row) => {
      const tr = document.createElement("tr");
      Object.values(row).forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

    container.innerHTML = "<h4>WQI Calculation Result</h4>";
    container.appendChild(table);
  } else {
    container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
}
