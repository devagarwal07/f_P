const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // You can choose any available port

// Use middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, images)
app.use(express.static('public')); // Assuming your form is in a folder named 'public'

// Handle form submission
app.post('/submit', (req, res) => {
  const name = req.body.Uname;
  const email = req.body.Uemail;
  const project = req.body.project;

  // Perform any backend processing here (e.g., saving to a database)

  // Respond with a simple message for demonstration purposes
  res.send(`Received form data:\nName: ${name}\nEmail: ${email}\nProject: ${project}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
