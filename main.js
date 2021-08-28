//Bring everything from the dom...
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showEror(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show input success message
function showSuccess(input){
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//To check if the email valid or not
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 if(re.test(input.value.trim())){
showSuccess(input);
 }else{
   showEror(input, 'Email is not valid');
 }
}

//checK password match
function checkPasswordMatch(input1, input2){
  if(input1.value !== input2.value) {
    showEror(input2, 'Passwords do not match')
  }
}

//check input length
function checkTheLength(input, min, max){
if(input.value.length < min){
  showEror(input, `${getFieldName(input)} must be at least ${min} character` );
}else if(input.value.length> max){
showEror(input, `${getFieldName(input)} must be at less than ${max} charachter`);
}else{
  showSuccess(input);
}
}

//Get fieldName
function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check required fields
function checkRequired(inputArr){
  inputArr.forEach(function(input){
    if (input.value.trim()===''){
showEror(input, `${getFieldName(input)} is required`);
    }else{
      showSuccess(input);
    }
  })  
}

//event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2])
  checkTheLength(username, 3, 15);
  checkTheLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});