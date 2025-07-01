const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine
app.set('view engine', 'ejs');

// In-memory DB
let vehicles = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { vehicles });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  const { vehicleName, price, image, desc, brand } = req.body;
  vehicles.push({ id: Date.now(), vehicleName, price, image, desc, brand });
  res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
  vehicles = vehicles.filter(v => v.id != req.params.id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
