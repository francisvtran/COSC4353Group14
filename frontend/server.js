const express = require('express')
const cors = require('cors');
const mysql = require('mysql');


// connect to the database
const connection = mysql.createConnection({
  host: "localhost",
  database: "nodejs",
  user: "root",
  password: "root123"
});

connection.connect(function(error){
  if(error) throw error
    else console.log('Connection established sucessfully')
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/exampleFormData', (req, res) => {
  const sqlQuery = "SELECT * FROM Client LIMIT 1;";

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
    const data = results[0];

    // Send the data as the response
    res.status(200).json(data);
  });
});


app.get('/getMostRecentEntry', (req, res) => {
const sqlQuery = 'SELECT * FROM Client ORDER BY entry_id DESC LIMIT 1';
  connection.query(sqlQuery, function(error, results) {
    if (error) {
      console.error('Error fetching most recent entry:', error);
      return;
    }

    if (results.length === 0) {
      console.log('No entries found');
      return;
    }

    const mostRecentEntry = results[0];
    console.log(mostRecentEntry)
    res.status(200).send(mostRecentEntry);
})
});

app.post('/getFuelQuoteHistory', (req, res) => {
  const targetDeliveryAddress = req.body.address1;
  console.log(targetDeliveryAddress);
  const sqlQuery = 'SELECT * FROM fuelquoteform WHERE deliveryAddress = ?';

  connection.query(sqlQuery, [targetDeliveryAddress], function(error, results) {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Server error');
      return;
    }
    console.log("results:", results);

    res.send(results);
  })
  });

app.get('/fuelQuoteFormData', (req, res) => {
  const sqlQuery = "SELECT * FROM fuelquoteform LIMIT 1;";

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
    const data = results[0];
    console.log(results[0]);

    // Send the data as the response
    res.status(200).json(data);
  });
});


//registration endpoint
app.post('/newUserRegister', (req, res) => { 
  console.log("success");
  const sqlQuery = "INSERT INTO loginuser (user_name, user_pass, user_email) VALUES (?, ?, ?);";
  const values = [req.body.username, req.body.password, req.body.email];

  connection.query(sqlQuery, values, (error, result) => {
    if (error) {
      console.error("Error inserting data:", error);
      return res.status(500).send("Error while saving data");
    }

    console.log(result);

    console.log("New client row inserted, ID:", result.insertId);
    return res.status(200).json({ message: "Clean form submitted and data saved!" }); 
  });
  });

  //login endpoint
app.post('/loginUser', (req, res) => { 
  const email = req.body.email;
  const password = req.body.password;
  const sqlQuery = 'SELECT * FROM loginuser WHERE user_email = ? AND user_pass = ?';

  connection.query(sqlQuery, [email, password], function(error, results) {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Server error');
      return;
    }
    console.log("results:", results);

    if (results.length === 0) {
      console.log("failed");
      return res.status(200).send("failed");
    }
    else{
    return res.status(200).send("success");
    }
  })
  });


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

  const sqlQuery = "INSERT INTO Client (fullName, address1, address2, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?);";
  const values = [fullName, address1, address2, city, state, zipcode];

  const sqlQuery2 = "INSERT INTO fuelquoteform (deliveryAddress);";

  connection.query(sqlQuery, values, (error, result) => {
    if (error) {
      console.error("Error inserting data:", error);
      return res.status(500).send("Error while saving data");
    }

    console.log(result);

    console.log("New client row inserted, ID:", result.insertId);
    return res.status(200).send("Clean form submitted and data saved!");
  });
});

app.post('/fuelQuoteFormPageSubmit', (req, res) => {
  console.log("fuelquoteform", req.body);

  const gallonsReq = req.body.gallonsRequested;
  const deliveryAddress = req.body.deliveryAddress;
  const deliveryDate = req.body.deliveryDate;
  const suggPPG = req.body.suggestedPPG;
  const totalDue = req.body.totalDue;

  const sqlQuery = "INSERT INTO fuelquoteform (gallonsReq, deliveryAddress, deliveryDate, suggPPG, totalDue) VALUES (?, ?, ?, ?, ?);";
  const values = [gallonsReq, deliveryAddress, deliveryDate, suggPPG, totalDue];

  connection.query(sqlQuery, values, (error, result) => {
    if (error) {
      console.error("Error inserting data:", error);
      return res.status(500).send("Error while saving data");
    }

    console.log(result);

    console.log("New fuelquoteform row inserted, ID:", result.insertId);
    return res.status(200).send("Clean form submitted and data saved!");
  });
});

app.post('/registrationPageSubmit', (req, res) => {
  const  user_email = req.body.gallonsRequested;
  const user_name = req.body.deliveryAddress;
  const user_pass = req.body.deliveryDate;

  const sqlQuery = "INSERT INTO fuelquoteform (user_email, deliveryAddress, deliveryDate) VALUES (?, ?, ?);";
  const values = [user_email, user_name, user_pass];

  connection.query(sqlQuery, values, (error, result) => {
    if (error) {
      console.error("Error inserting data:", error);
      return res.status(500).send("Error while saving data");
    }

    console.log(result);

    console.log("New fuelquoteform row inserted, ID:", result.insertId);
    return res.status(200).send("Clean form submitted and data saved!");
  });
});

const port = 3000;
app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`)
});

module.exports = app;
