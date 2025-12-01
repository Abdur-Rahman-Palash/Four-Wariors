const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Anti-cache middleware: force no-cache for HTML files and strict cache for assets
app.use((req, res, next) => {
  if (req.path.endsWith('.html') || req.path === '/') {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
  next();
});

// Serve static files from root directory
app.use(express.static(path.join(__dirname), {
  maxAge: req => req.path.endsWith('.html') ? 0 : '1d'
}));

// Serve SPA routes
app.get('/', (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
  res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/services', (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
  res.sendFile(path.join(__dirname, 'services.html'));
});

app.get('/portfolio', (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
  res.sendFile(path.join(__dirname, 'portfolio.html'));
});

app.get('/testimonials', (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
  res.sendFile(path.join(__dirname, 'testimonials.html'));
});

app.get('/admin', (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0');
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
