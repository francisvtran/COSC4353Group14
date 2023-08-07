const registeredUsers = [];
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

  form.addEventListener('submit', e => {
    e.preventDefault();
    //enterData();
    const validated = validateInputs();
    if(validated) {
        const data = {
            email: email.value,
            password: password.value
        }

        console.log(data);

        fetch('http://localhost:3000/loginUser', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.message === "failed") {
                    window.location.href = "login.html";
                }
                else {
                    window.location.href = "fuelquoteform.html";
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(emailValue === '') {
        setError(email, 'Email is required');
        return false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        return false;
    } else{
        setSuccess(email)
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
        return false;
    } else{
        setSuccess(password)
    }

    return true;
    };
    