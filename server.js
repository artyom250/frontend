const express = require('express');
const fs = require('fs');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define route to render index.ejs template
app.get('/', function (req, res) {
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    let users = JSON.parse(data);
    if (req.query.query) {
      const query = req.query.query.toLowerCase();
      users = users.filter(user => user.name.toLowerCase().includes(query));
    }
    res.render('index', { users: users });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000 🚀');
});