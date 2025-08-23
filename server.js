// server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Currency Converter API is running 🚀');
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
        const response = await axios.get('https://api.exchangerate.host/convert', {
          params: {
            from: fromCurrency,
            to: target,
            amount: amt,
            access_key: process.env.EXCHANGERATE_API_KEY
          },
          timeout: 10000
        });

        const data = response.data;

        if (!data || data.success === false || data.result === undefined) {
          conversions[target] = { error: (data && data.error && data.error.type) || 'Conversion failed' };
        } else {
          conversions[target] = {
            convertedAmount: data.result,
            rate: data.info ? data.info.rate : (amt === 0 ? 0 : Number(data.result) / amt),
            date: data.date || null,
          };
        }
      } catch (e) {
        conversions[target] = { error: 'Network error to exchangerate.host' };
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
