/* Empty JS object to act as endpoint for all routes */
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));

const port = 3000;

// TODO-Spin up the server
const server = app.listen(port, listening);

function listening() {
    console.log('Server is running on localhost: ');
    console.log(port);
}

app.get('/all', function (req, res) {
  res.send(projectData);
})

//const data = [];

app.post('/addWeather', addWeather );

function addWeather (req, res){

   let newEntry = {
      temperature: req.body.temperature,
      date: req.body.date,
      city: req.body.city,
      countryCode: req.body.countryCode,
      temperature: Math.round(req.body.temperature),
      feelings: req.body.feelings
   }
   projectData = newEntry;
   return projectData
}
