const express = require('express')
const cors = require('cors');
const mysql = require('mysql');

// connect to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "nodejs"
});

connection.connect(function(error){
  if(error) throw error
    else console.log('Connection established sucessfully')
});

const app = express();

app.use(cors());
app.use(express.json());


// Handle post request for client post page submit
app.post('/ClientPostPageSubmit', (req, res) => {
  // Handle validations
  const fullName = req.body.fullName;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const city = req.body.city;
  const state = req.body.state;
  const zipcode = req.body.zipcode;

  // Make sure full name is within 50 characters and exists
  if (!fullName || fullName.length > 50){
    return res.status(400).send("Invalid request (Full name)")
  }

  // Make sure address exists and is within than 100 characters
  if (!address1 || address1.length > 100){
    return res.status(400).send("Invalid request (Address 1)")
  }

  // If address exist, check to see if its within than 100 characters
  if (address2){
    if (address2.length > 100){
      return res.status(400).send("Invalid request (Address 2)")
    }
  }

  // Make sure city exists and is within than 100 characters
  if (!city || city.length > 100){
    return res.status(400).send("Invalid request (City)")
  }

  // Make sure state exists
  if (!state){
    return res.status(400).send("Invalid request (State)")
  }

  // Make sure zipcode exists and is within 5-9 charcters
  if (!zipcode || zipcode.length < 5 || zipcode.length > 9){
    return res.status(400).send("Invalid request (Zipcode)")
  }

  // Passed all validations checks, now insert the data into the database
  const sqlQuery = "INSERT INTO Client (fullName, address1, address2, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?);";
  const values = [fullName, address1, address2, city, state, zipcode];

  connection.query(sqlQuery, values, (error, result) => {
    if (error) {
      console.error("Error inserting data:", error);
      return res.status(500).send("Error while saving data");
    }

    console.log("New client row inserted, ID:", result.insertId);
    return res.status(200).send("Clean form submitted and data saved!");
  });

  // Passed all validations checks
  return res.status(500).send("Couldn't insert data into database");
});

// Get request for grabbing prepopulated form values for the form field
app.get('/exampleFormData', (req, res) => {
  const sqlQuery = "SELECT * FROM Client LIMIT 1;";

  let data;
  // Make a query to the database retrieving 1 row to use as the prepopulated values
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).send("Server error");
    }

    if (results.length === 0) {
      return res.status(404).send("No data found");
    }

    // Extract the data from the first index of the results
    data = results[0];
  });
  // Hardcoded form values
  // const data = {
  //   fullName: "John Doe",
  //   address1: "9605 St Margarets Rd",
  //   address2: "9605 St Margarets Rd",
  //   city: "Ashland",
  //   state: "OH",
  //   zipcode: '44805',
  // };
  res.status(200).send(data);
})

const port = 3000;
app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`)
});

module.exports = app;
