const registeredUsers = [];
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

const newUser = {
    username: 'juliecruz',
    email: 'juliecruzb26@gmail.com',
    password: 'Bailey2000'
  };

form.addEventListener('submit', e => {
    registeredUsers.push(newUser);
    e.preventDefault();
    //enterData();
    validateInputs();
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
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else if (emailValue != 'juliecruzb26@gmail.com'){
        setError(email, 'Invalid email')
    } else{
        setSuccess(email)
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if(passwordValue != 'Bailey2000'){
        setError(password, 'Incorrect Password')
    } else{
        setSuccess(password)
    }

    if (document.querySelectorAll('.success').length === 2) {
        form.submit();
    }
    };