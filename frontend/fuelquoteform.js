const form = document.querySelector('form');


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

