//Receive value from fuel quote form page
var b = localStorage.getItem("fuelVal");
alert("" + b);
var resetValue =0;
localStorage.setItem("fuelVal", resetValue);   


const form = document.querySelector('form');

// Populate fields from the backend
document.addEventListener('DOMContentLoaded', () => {
  const data = {
    address1 : localStorage.getItem('address')
  }
  // Fetch data from the backend
  fetch('http://localhost:3000/getFuelQuoteHistory', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('tbody');
        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.gallonsReq}</td>
            <td>${item.deliveryAddress}</td>
            <td>${item.deliveryDate}</td>
            <td>${item.suggPPG}</td>
            <td>${item.totalDue}</td>`
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

