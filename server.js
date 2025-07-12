// require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views')); // Add this line to set views directory

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://www.youtube.com",
          "https://cdn.jsdelivr.net",
          "https://fonts.googleapis.com"
        ],
        styleSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
          "https://fonts.googleapis.com"
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        frameSrc: [
          "'self'",
          "https://www.youtube.com",
          "https://www.youtube-nocookie.com"
        ],
        objectSrc: ["'none'"],
      },
    },
  })
);

// Custom Middlewares
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
app.use(logger);

// Define common data for templates
const commonData = {
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
  footerSections: [
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
  ],
  currentYear: new Date().getFullYear(),
  companyName: "Vistora",
  footerLinks: [
    { url: "#", text: "Privacy Policy" },
    { url: "#", text: "Terms of Use" }
  ]
};

// HTML Page Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: "Vistora",
    ...commonData,
    videoUrl: "https://www.youtube.com/embed/H1CIBqDeWQ0?rel=0&controls=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=H1CIBqDeWQ0",
    heroTitle: "WHERE HERITAGE MEETS LUXURY",
    heroSubtitle: "Step into a world of elegance, where every moment tells a story and every detail is a masterpiece.\nDiscover the art of living at our opulent palaces, serene retreats with gormet food.",
    firstRowImages: [
      {
        src: "/images/12.jpg",
        alt: "Image 1",
        description: "Relax in our deluxe suite with breathtaking views and unparalleled comfort."
      },
      {
        src: "/images/13.jpg",
        alt: "Image 2",
        description: "Step into an elegant and luxurious hotel lobby designed to welcome you."
      }
    ],
    featuresTitle: "Why Choose Us?",
    features: [
      {
        icon: "bi-house-door",
        title: "Luxurious Rooms",
        description: "Stay in the lap of luxury with world-class amenities and breathtaking views."
      },
      {
        icon: "bi-cup-straw",
        title: "Gourmet Dining",
        description: "Experience culinary excellence with diverse cuisines and exceptional service."
      },
      {
        icon: "bi-tree",
        title: "Spa & Wellness",
        description: "Rejuvenate your mind and body with our holistic wellness and spa therapies."
      }
    ],
    secondRowImages: [
      {
        src: "/images/21.jpg",
        alt: "Image 3",
        description: "Indulge in gourmet dining featuring cuisines from around the world."
      },
      {
        src: "/images/17.jpg",
        alt: "Image 4",
        description: "Rejuvenate your senses with serene spa and wellness treatments."
      },
      {
        src: "/images/15.jpg",
        alt: "Image 5",
        description: "Dive into our outdoor pool and unwind in the lush surroundings."
      }
    ]
  });
});

// Login page route - Add this
app.get('/login', (req, res) => {
  res.render('login', {
    title: "Login - Vistora",
    ...commonData,
    carouselImages: [
      { src: "/images/12.jpg", alt: "Luxury Room" },
      { src: "/images/13.jpg", alt: "Hotel Lobby" },
      { src: "/images/21.jpg", alt: "Dining Experience" }
    ]
  });
});

app.get('/booking', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'Booking.html'));
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us - Vistora' });
});
app.get('/contact', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'contactus.html'));
});
app.get('/events', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'Events.html'));
});
app.get('/rooms', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'Hotels.html'));
});
app.get('/payment', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'Payment.html'));
});
app.get('/spa&wellness', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'SpaAndWellness.html'));
});

// API Routes
const apiRoutes = require('./api/apiRoutes');
app.use('/api', apiRoutes);



// 404 Handler (after all other routes)
app.use((req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

// Error Handling Middleware (last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});