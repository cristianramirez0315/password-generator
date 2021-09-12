// SELECT THE INPUTS FROM YOUR HTML
const lengthEl = document.getElementById('length');
const lowercaseEl = document.getElementById('lowercase');
const uppercaseEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById("generate");
const passwordText = document.getElementById("password");

// FUNCTIONS THAT WILL GENERATE THE RANDOM CHARACTERS
const randomFunctions = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// WHEN YOU CLICK ON GENERATE BUTTON, 
// 1. GET MY INPUTS
// 2. MAKE SURE USER HAS A PASSWORD OF THE RIGHT LENGTH AND HAS SELECTED AT LEAST ONE CRITERIA
// 2. PASS IN THE INPUTS TO GENERATE FUNCTION AND PLACE RESULT IN THE PASSWORD TEXTAREA
generate.addEventListener('click', () => {
  // "+ makes a string type into a number"
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  if (length > 128) {
    alert("Password can not be longer than 128 characters!");
    return;
  } else if (length < 8) {
    alert("Password has to be at least 8 characters long!");
    return;
  } else if (hasLower + hasUpper + hasNumber + hasSymbol === 0) {
    alert("A criteria must be picked for your password!")
    return;
  } else {
    passwordText.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
  }
});


// FUNCTION WHERE PASSWORD IS GENERATED
function generatePassword(lower, upper, number, symbol, length) {
  let password = '';

  // checkedBoxesArray is an array of objects displaying the keys and values of the ones that are "true" or checked
  const checkedBoxesArray = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);


  // guarantee that you got every type
  checkedBoxesArray.forEach(type => {
    const funcName = Object.keys(type)[0];
    password += randomFunctions[funcName]();
  });

  // fill in the rest of the password till you get to length
  for (i = checkedBoxesArray.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * checkedBoxesArray.length);
    const randomType = checkedBoxesArray[randomIndex];
    const randomTypeKey = Object.keys(randomType)[0];
    password += randomFunctions[randomTypeKey]();
  }

  // randomizes password even more to get rid of patterns
  const finalPassword = shuffle(password);

  // return final password
  return finalPassword;
}

// FUNCTIONS TO RANDOMIZE PASSWORD ONE LAST TIME AND GET RID OF PATTERNS
function getRandomInt(n) {
  return Math.floor(Math.random() * n);
}
function shuffle(s) {
  var arr = s.split('');           // Convert String to array
  var n = arr.length;              // Length of the array

  for (var i = 0; i < n - 1; ++i) {
    var j = getRandomInt(n);       // Get random of [0, n-1]

    var temp = arr[i];             // Swap arr[i] and arr[j]
    arr[i] = arr[j];
    arr[j] = temp;
  }

  s = arr.join('');                // Convert Array to string
  return s;                        // Return shuffled string
}