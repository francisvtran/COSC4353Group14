const form = document.querySelector('form');
//const TexasLocation = 0.2;
//const OutOfState = 0.4;
//const History = 0.1;
//const noHistory = 0.0;
const CompanyProfit = 0.10;
const gallons = document.getElementById('gallonsReq');
const history = true;

form.addEventListener('submit', e => {
  GetPrice();
});

// Populate fields from the backend
document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the backend
  fetch('http://localhost:3000/getMostRecentEntry')
    .then(response => response.json())
    .then(data => {
      // Set form field values using the retrieved data
      document.getElementById('deliveryAddress').value = data.address1;
    })
    .catch(error => {
      console.error('Error:', error);
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


const GetPrice = () => {
  if(state == 'TX'){
    const StatePercent = 0.2;
  }
  else{
    const StatePercent = 0.4;
  }

  if (gallons > 1000) {
    const GallonsRequested = .2;
  }
  else{
    const GallonsRequested = .3;
  }

  if(history){
    const priceHistory = .1
  }
  else{
    const priceHistory = 0.0
  }

  const margin = 1.50 * (StatePercent - priceHistory + GallonsRequested + CompanyProfit)
  const suggestedPrice = 1.50 + margin;
  totalAmount = GallonsRequested * suggestedPrice;

};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Prepare data to send to the backend
  const data = {
    fullName: document.querySelector('#gallons-requested').value,
    address1: document.querySelector('#delivery-address').value,
    address2: document.querySelector('#delivery-date').value,
    city: document.querySelector('#suggested-ppg').value,
    state: document.querySelector('#amount-due').value,
  };

  // Make a post request to the backend
  fetch('http://localhost:3000/ClientPostPageSubmit', {
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
});

