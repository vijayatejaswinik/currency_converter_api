const form = document.getElementById('converterForm');
const resultsDiv = document.getElementById('results');
const outputDiv = document.getElementById('output');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const from = document.getElementById('fromCurrency').value.trim();
  const to = document.getElementById('toCurrency').value.trim();
  const amount = document.getElementById('amount').value.trim();

  if (!from || !to || !amount) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  try {
    // IMPORTANT: Use backend URL (port 3000)
    const res = await fetch(`http://127.0.0.1:3000/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await res.json();

    outputDiv.innerHTML = ""; // clear old results

    if (data.conversions) {
      for (const [currency, details] of Object.entries(data.conversions)) {
        const div = document.createElement("div");
        div.classList.add("result-box");

        if (details.error) {
          div.classList.add("error");
          div.innerHTML = `❌ ${currency}: ${details.error}`;
        } else {
          div.classList.add("success");
          div.innerHTML = `✅ ${data.amount} ${data.from} = 
            <strong>${details.convertedAmount.toFixed(2)} ${currency}</strong><br>
            <small>Rate: ${details.rate.toFixed(4)} | Date: ${details.date || 'N/A'}</small>`;
        }

        outputDiv.appendChild(div);
      }
    } else {
      outputDiv.innerHTML = `<p class="error result-box">No conversion data found.</p>`;
    }

    resultsDiv.classList.remove("hidden");

  } catch (err) {
    console.error(err);
    alert("⚠️ Error fetching conversion. Check backend server.");
  }
});
