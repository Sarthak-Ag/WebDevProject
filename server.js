const express = require('express');
const bodyParser = require('body-parser');
const bcrypt=require('bcrypt');
const { Pool } = require('pg');

const app = express();
const port = 3000;
const path=require('path');

// Parse URL-encoded bodies for form data
app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies for API requests
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));

// PostgreSQL database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: 'Adi',
  port: 5432,
});

// Login route


// Serve signup.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Serve login.html
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Serve index.html
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Signup route (insert here)
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if the username already exists in the database
  pool.query('SELECT * FROM users WHERE username = $1', [username], async(error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Error signing up. Please try again.');
    } else {
      if (result.rows.length > 0) {
        // User already exists, send error message
        res.status(400).send('User already exists. Please login or choose a different username.<a href="/login.html">Login</a> by clicking the text login.');
      } else {
        const hashedpassword=await bcrypt.hash(password,13); 
        // Insert the new user into the database
        pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedpassword], (error, result) => {
          if (error) {
            console.error('Error executing query', error);
            res.status(500).send('Error signing up. Please try again.');
          } else {
            // User signed up successfully
            res.send('<script>alert("Registered successfully. You will now be redirected to the login page."); window.location.href = "/login.html";</script>');
          }
        });
      }
    }
  });
});

app.get('/login.html',(req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists in the database
  pool.query('SELECT * FROM users WHERE username = $1', [username], async (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Error logging in. Please try again.');
    } else {
      if (result.rows.length > 0) {
        const hashedPassword = result.rows[0].password;
        // Compare the hashed password with the input password
        const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
        if (isPasswordMatch) {
          // Passwords match, user authenticated successfully
          res.redirect('/index2.html'); // Redirect to index.html page
        } else {
          // Incorrect password
          res.send('<script>alert("Incorrect password. Please try again."); window.location.href = "/login.html";</script>');
        }
      } 
      else {
        // Invalid username or password
        // Instead of sending status 401, inform the user with an alert dialog box
        res.send('<script>alert("Wrong credentials entered. Re-enter details or sign-up."); window.location.href = "/login.html";</script>');
        //res.redirect('/login.html');
      }
    }
  });
});

const pool2 = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: 'Adi',
  port: 5432,
});

// Route to insert data into the second database
app.post('/joinus', (req, res) => {
  const { name,age,email,address,foi,ay } = req.body;

  // Execute INSERT query to insert data into the second database
  pool2.query('INSERT INTO volunteer (name, age, email, address, foi, ay) VALUES ($1, $2, $3, $4, $5, $6)', [name, age, email,address,foi,ay], (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Error inserting data into other database.');
    } else {
      res.send('<script>alert("Details uploaded successfully. Our team will contact you soon."); window.location.href = "/joinus.html";</script>');
    }
  });
});

app.get('/signup.html',(req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.get('/index2.html',(req, res) => {
  res.sendFile(__dirname + '/index2.html');
});
app.get('/map.html',(req, res) => {
  res.sendFile(__dirname + '/map.html');
});
app.get('/joinus.html',(req, res) => {
  res.sendFile(__dirname + '/joinus.html');
});
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});