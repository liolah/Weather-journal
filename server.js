// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
// Body-parser configuration as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Initializing the callback functions to retrieve and send data to the project data endpoint
const storeData = (req, res) => {
  projectData = req.body;
}

const retrieveData = (req, res) => {
  res.send(projectData);
}

// Initializing the routes
// Post route to store the data in the endpoint
app.post('/store', storeData);

// Get route to retrieve the data from the endpoint
app.get('/data', retrieveData);

// Setting up the server
// Setting the port number
const port = 4747;
app.listen(port, () => {
  console.log(`The server is started and running on port ${port}`)
});