const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'altibbe_db',
  password: 'earth17@', // <-- IMPORTANT: Replace with your actual password
  port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoints
// Simple test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// API endpoint for user registration
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const result = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
      [email, passwordHash]
    );
    res.status(201).json({ id: result.rows[0].id, email });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already registered.' });
    }
    console.error('Registration Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint for user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const result = await pool.query(
      'SELECT password_hash FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to save product data and return its ID
app.post('/api/products', async (req, res) => {
  const { data } = req.body;
  const productName = data.productName || 'Unknown Product';

  try {
    const result = await pool.query(
      'INSERT INTO products (product_name, data) VALUES ($1, $2) RETURNING id',
      [productName, data]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to fetch all products for the dashboard
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, product_name, created_at FROM products ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Fetch Products Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to generate the PDF report
app.get('/api/report/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT data FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }
    const productData = result.rows[0].data;

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Report-${id}.pdf"`);
    doc.pipe(res);

    doc.fontSize(25).text('Product Transparency Report', {
      align: 'center'
    });
    doc.moveDown();

    for (const key in productData) {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
      doc.fontSize(16).text(`${formattedKey}:`, { continued: true });
      doc.fontSize(14).text(` ${productData[key]}`);
      doc.moveDown();
    }

    doc.end();
  } catch (err) {
    console.error('PDF Generation Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});