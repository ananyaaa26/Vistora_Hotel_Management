# Vistora Express

**Vistora Express** is a Node.js and Express-based web application that serves as a tourism/hospitality platform. It features static HTML pages for various services (like booking, events, spa and wellness), along with an API backend and middleware for handling errors and logging.

---

## 🌟 Features

- 🏨 Hotel listings and booking page
- 💆 Spa & Wellness services
- 🎉 Events information
- 📞 Contact Us form
- 💳 Payment interface
- 🔐 Middleware for logging and error handling
- 📁 JSON-based data storage for users

---

## 📁 Project Structure

```
Vistora_Express/
│
├── server.js                  # Main server file
│
├── api/
│   └── apiRoutes.js           # Defines backend API routes
│
├── middlewares/
│   ├── errorHandler.js        # Error handling logic
│   └── logger.js              # Request logging logic
│
├── models/
│   └── users.json             # Sample user data in JSON format
│
├── public/                    # Frontend files
│   ├── index.html             # Homepage
│   ├── AboutUs.html
│   ├── Booking.html
│   ├── contactus.html
│   ├── Events.html
│   ├── Hotels.html
│   ├── Payment.html
│   ├── SpaAndWellness.html
│   └── images/                # Image assets used in frontend
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node package manager)


## 📡 API Overview

The file `api/apiRoutes.js` contains basic RESTful API endpoints. You can extend it further as per the project requirements.

---

## 🛠 Built With

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [HTML/CSS/JS](https://developer.mozilla.org/)
- JSON for simple data storage

---

## 📌 Future Enhancements

- Connect to a real database like MongoDB
- User authentication system
- Convert HTML to EJS templates or integrate with a frontend framework (e.g., React)
- API input validation and security improvements


