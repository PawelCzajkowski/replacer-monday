const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.set("port", process.env.PORT || 3001);
app.use(express.json());

const secretKey = '';

// Endpoint for generating and returning a JWT token
// app.post('/login', (req, res) => {
//   // In a real-world scenario, you would typically validate the user's credentials here
//   const { username, password } = req.body;

//   // Check if the username and password are correct
//   if (username === 'john' && password === 'password') {
//     // Generate a JWT token
//     const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

//     // Return the token to the client
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid username or password' });
//   }
// });

// Protected endpoint that requires a valid JWT token
app.get('/verify', authenticateToken, (req, res) => {
  let subscription = req.token.dat.subscription;
  let renewalDate = new Date(subscription.renewal_date);
  let today = new Date();
  
  if (!subscription.is_trial && renewalDate < today) {
    return res.status(402).json({message: 'Subscriptin expired', code: 402});
  }
  res.json({ message: 'You are authorized to access this protected resource.' });
});

// Middleware for authenticating JWT token
function authenticateToken(req, res, next) {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify and decode the token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Add the decoded user information to the request object
    req.token = decoded;
    next();
  });
}

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
  });