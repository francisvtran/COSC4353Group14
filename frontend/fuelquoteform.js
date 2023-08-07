const form = document.querySelector('form');
//const TexasLocation = 0.2;
//const OutOfState = 0.4;
//const History = 0.1;
//const noHistory = 0.0;
const CompanyProfit = 0.10;
const gallons = document.getElementById('gallonsReq');
const history = true;

/*
form.addEventListener('submit', e => {
  GetPrice();
});
*/



// Populate fields from the backend
document.addEventListener('DOMContentLoaded', () => {
  let userData;
  // Fetch data from the backend
  fetch('http://localhost:3000/getMostRecentEntry')
    .then(response => response.json())
    .then(data => {
      userData = data;
      // Set form field values using the retrieved data
      document.getElementById('deliveryAddress').value = data.address1;
    })
    .catch(error => {
      console.error('Error:', error);
    });
    const getQuoteButton = document.getElementById('getQuote');

  getQuoteButton.addEventListener('click', () => {
  const gallonsInput = document.getElementById('gallonsReq');
  const totalDueInput = document.getElementById('totalDue');

  console.log(gallonsInput.value);
  console.log(totalDueInput.value);

  // Ensure the value is parsed as a number
  const gallonsRequested = parseFloat(gallonsInput.value);

  // Check if the input is a valid number
  if (isNaN(gallonsRequested) || gallonsRequested <= 0) {
    totalDueInput.value = 'Invalid input';
    return;
  }

  const totalValue = GetPrice(gallonsInput.value, userData);
  totalDueInput.value = totalAmount; // Display total with two decimal places
});

});


document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the backend
  fetch('http://localhost:3000/getMostRecentEntry')
    .then(response => response.json())
    .then(data => {
      // get state value
      const state = data.state;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


const GetPrice = (gallonsInput, userData) => {
  let StatePercent;
  let GallonsRequested;
  let priceHistory;
  if(userData.state == 'TX'){
    StatePercent = 0.2;
  }
  else{
    StatePercent = 0.4;
  }

  if (gallonsInput > 1000) {
    GallonsRequested = .2;
  }
  else{
    GallonsRequested = .3;
  }

  if(history){
    priceHistory = .1
  }
  else{
    priceHistory = 0.0
  }

  const margin = 1.50 * (StatePercent - priceHistory + GallonsRequested + CompanyProfit)
  const suggestedPrice = 1.50 + margin;
  totalAmount = gallonsInput * suggestedPrice;

  document.getElementById('suggPPG').value = suggestedPrice; 
  return totalAmount;
};


form.addEventListener('submit', (event) => {
  localStorage.setItem('address', document.querySelector('#deliveryAddress').value)

  console.log("submitting")

  event.preventDefault();

  // Prepare data to send to the backend
  const data = {
    gallonsRequested: document.querySelector('#gallonsReq').value,
    deliveryAddress: document.querySelector('#deliveryAddress').value,
    deliveryDate: document.querySelector('#deliveryDate').value,
    suggestedPPG: document.querySelector('#suggPPG').value,
    totalDue: document.querySelector('#totalDue').value,
  };

  // Make a post request to the backend
  fetch('http://localhost:3000/fuelQuoteFormPageSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.text())
    .then(text => {
      console.log(text);
    })
    .catch(error => {
      console.error('Error:', error);
    });
    window.location.href = "fuelquotehistory.html";
});

