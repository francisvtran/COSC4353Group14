const express = require('express')
const cors = require('cors');
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

  // Passed all validations checks
  return res.status(200).send("Clean form submitted!");
});

// Get request for grabbing prepopulated form values for the form field
app.get('/exampleFormData', (req, res) => {
  // Hardcoded form values
  const data = {
    fullName: "John Doe",
    address1: "9605 St Margarets Rd",
    address2: "9605 St Margarets Rd",
    city: "Ashland",
    state: "OH",
    zipcode: '44805',
  };

  res.status(200).send(data);
})

const port = 3000;
app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`)
});

module.exports = app;
