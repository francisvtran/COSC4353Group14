const form = document.querySelector('form');

// Populate fields from the backend
document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the backend
  fetch('http://localhost:3000/exampleFormData')
    .then(response => response.json())
    .then(data => {
      // Set form field values using the retrieved data
      document.querySelector('#full-name').value = data.fullName;
      document.querySelector('#address1').value = data.address1;
      document.querySelector('#address2').value = data.address2;
      document.querySelector('#city').value = data.city;
      document.querySelector('#state').value = data.state;
      document.querySelector('#zipcode').value = data.zipcode;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});


form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Prepare data to send to the backend
  const data = {
    fullName: document.querySelector('#full-name').value,
    address1: document.querySelector('#address1').value,
    address2: document.querySelector('#address2').value,
    city: document.querySelector('#city').value,
    state: document.querySelector('#state').value,
    zipcode: document.querySelector('#zipcode').value,
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

