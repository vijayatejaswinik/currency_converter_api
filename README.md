
# 💱 Currency Converter API 🚀

A simple **Node.js + Express** API for currency conversion, powered by [ExchangeRate.host](https://exchangerate.host).

---

## 📌 Features
- Convert from one currency to another
- Support for multiple target currencies in a single request
- Uses live exchange rates from ExchangeRate.host
- Easy setup with `.env` file to keep API keys secure

---

## ⚡️ Setup Instructions

### 1. Clone this repository
```bash
git clone https://github.com/your-username/currency-converter-api.git
cd currency-converter-api
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

In the root folder, create a `.env` file:

```
EXCHANGERATE_API_KEY=your_api_key_here
PORT=3000
```

### 4. Run the server

```bash
node server.js
```

The server will start on:

```
http://localhost:3000
```

---

## 🔄 API Endpoints

### Base Route

```
GET /
```

Returns a health message:

```text
Currency Converter API is running 🚀
```

### Currency Conversion

```
GET /convert?from=USD&to=INR&amount=100
```

#### Example Response

```json
{
  "from": "USD",
  "to": ["INR"],
  "amount": 100,
  "conversions": {
    "INR": {
      "convertedAmount": 8312,
      "rate": 83.12,
      "date": "2025-08-18"
    }
  }
}
```

### Multiple Target Currencies

```
GET /convert?from=USD&to=INR,EUR,GBP&amount=100
```

#### Example Response

```json
{
  "from": "USD",
  "to": ["INR", "EUR", "GBP"],
  "amount": 100,
  "conversions": {
    "INR": { "convertedAmount": 8312, "rate": 83.12, "date": "2025-08-18" },
    "EUR": { "convertedAmount": 91.4, "rate": 0.914, "date": "2025-08-18" },
    "GBP": { "convertedAmount": 77.2, "rate": 0.772, "date": "2025-08-18" }
  }
}
```

---

## 🛡️ Security

* **Never commit your `.env` file** (already ignored via `.gitignore`).
* Store your API key in `.env` and access it via `process.env.EXCHANGERATE_API_KEY`.

---

## 🛠️ Tech Stack

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [Axios](https://axios-http.com/)
* [dotenv](https://www.npmjs.com/package/dotenv)

---

## 👩‍💻 Author

**Kammari Vijaya Tejaswini**

---

## 📜 License

This project is licensed under the MIT License.

```

