const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Currency Converter API is running ');
});

app.get('/convert', async (req, res) => {
  try {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      return res.status(400).json({ error: 'Please provide from, to, and amount query parameters.' });
    }

    const amt = Number(amount);
    if (!Number.isFinite(amt)) {
      return res.status(400).json({ error: 'Amount must be a number.' });
    }

    const targets = to.split(',').map(t => t.trim().toUpperCase());
    const fromCurrency = from.toUpperCase();

    const conversions = {};

    for (const target of targets) {
      try {
        // ✅ Using Frankfurter API (no access key)
        const response = await axios.get(`https://api.frankfurter.app/latest`, {
          params: {
            amount: amt,
            from: fromCurrency,
            to: target
          },
          timeout: 10000
        });

        const data = response.data;

        if (data && data.rates && data.rates[target]) {
          conversions[target] = {
            convertedAmount: data.rates[target],
            rate: data.rates[target] / amt,
            date: data.date || null,
          };
        } else {
          conversions[target] = { error: 'Conversion failed' };
        }
      } catch (e) {
        conversions[target] = { error: 'Network error to Frankfurter API' };
      }
    }

    return res.json({
      from: fromCurrency,
      to: targets,
      amount: amt,
      conversions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while converting currency.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
