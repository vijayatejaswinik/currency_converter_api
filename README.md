# 💱 Currency Converter Web App & API 🚀

A **full-stack Currency Converter** built with **Node.js + Express + Vanilla JavaScript**, supporting real-time currency conversions using the **Frankfurter API** (no API key required). Includes both a **REST API** and a **responsive frontend**.

---

## 🌐 Live Demo

🔗 **Try it here:** [Currency Converter Live Demo](https://vijayatejaswinik.github.io/currency_converter_api/)

---

## 📌 Features

* **Frontend:**

  * Responsive web app using HTML, CSS, and JavaScript
  * Select base and target currencies with live results display

* **Backend / API:**

  * Convert from one currency to another
  * Support for multiple target currencies in a single request
  * Real-time exchange rates from **Frankfurter API**
  * No API key required

---

## ⚡️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/vijayatejaswinik/currency_converter_api.git
cd currency_converter_api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the server

```bash
node server.js
```

The server will start at:

```
http://localhost:3000
```

### 4. Open the frontend

Open `public/index.html` in your browser to use the web interface.

---

## 🔄 API Endpoints

### Base Route

```
GET /
```

Returns a health check message:

```text
Currency Converter API is running
```

### Currency Conversion

```
GET /convert?from=USD&to=INR&amount=100
```

Example Response:

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

Example Response:

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

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend / API:** Node.js, Express.js, Axios
* **Currency Data Provider:** [Frankfurter API](https://www.frankfurter.app/)

---

## 👩‍💻 Author

**Kammari Vijaya Tejaswini**

---
