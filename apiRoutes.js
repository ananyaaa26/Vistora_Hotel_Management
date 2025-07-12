const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Login route
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
    if (err) return next(err);

    const users = JSON.parse(data);
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // Dummy dashboard data
      const bookings = [
        { id: "#1001", room: "Deluxe Suite", checkIn: "2024-12-01", checkOut: "2024-12-07", status: "Completed" },
        { id: "#1002", room: "Standard Room", checkIn: "2024-11-15", checkOut: "2024-11-20", status: "Completed" },
        { id: "#1003", room: "Presidential Suite", checkIn: "2024-12-10", checkOut: "2024-12-15", status: "Upcoming" }
      ];

      const rooms = [
        { name: "Standard Room", image: "/images/18.jpg", description: "Comfortable and cozy room.", detailsUrl: "/room-details" },
        { name: "Deluxe Suite", image: "/images/6.jpg", description: "A luxurious suite with ocean views.", detailsUrl: "/room-details" },
        { name: "Presidential Suite", image: "/images/5.jpg", description: "A spacious suite with premium amenities.", detailsUrl: "/room-details" }
      ];

      // Use the same footerSections as in the server.js
      const footerSections = [
        {
          title: "About Vistora",
          type: "text",
          content: "Experience luxury and comfort in the heart of the city at Vistora Hotels."
        },
        {
          title: "Quick Links",
          type: "links",
          links: [
            { url: "/", text: "Home" },
            { url: "/rooms", text: "Rooms & Suites" },
            { url: "/dining", text: "Dining" },
            { url: "/spa&wellness", text: "Spa & Wellness" }
          ]
        },
        {
          title: "Contact",
          type: "contact",
          items: [
            "Email: support@vistora.com",
            "Phone: +1 800 987 6543"
          ]
        },
        {
          title: "Follow Us",
          type: "social",
          icons: [
            { url: "#", class: "bi-facebook" },
            { url: "#", class: "bi-twitter" },
            { url: "#", class: "bi-instagram" }
          ]
        }
      ];

      return res.status(200).render('dashboard', {
        title: "User Dashboard - Vistora",
        logoPath: "/images/vistora.png",
        navLinks: [
          { url: "/", text: "HOME" },
          { url: "/rooms", text: "ROOMS/SUITS" },
          { url: "/dining", text: "DINING" },
          { url: "/spa&wellness", text: "SPA & WELLNESS" },
          { url: "/contact", text: "CONTACT US" },
          { url: "/about", text: "ABOUT US" }
        ],
        buttons: [
          { url: "/booking", text: "BOOK NOW", class: "me-2" },
          { url: "/login", text: "LOGIN", class: "" }
        ],
        user: {
          name: username,
          email: `${username}@example.com`,
          phone: "+1 800 123 4567"
        },
        bookings,
        rooms,
        footerSections,
        currentYear: new Date().getFullYear(),
        companyName: "Vistora",
        footerLinks: [
          { url: "#", text: "Privacy Policy" },
          { url: "#", text: "Terms of Use" }
        ]
      });

    } else {
      return res.status(302).redirect('/api/register');
    }
  });
});

// Register route - serve the register page
router.get('/register', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views', 'register.html'));
});

module.exports = router;