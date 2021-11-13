/* Global Variables */
// Input elements
const submitBtn = document.querySelector("#generate");
const zip = document.querySelector("#zip");
const feelingsInput = document.querySelector("#feelings");

// Output elements
const temperature = document.querySelector("#temp");
const date = document.querySelector("#date");
const feelingsArea = document.querySelector("#content");
const errorContainer = document.querySelector("#invalidZipcode");

// API credentials
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = "e8ab5a6e4726e99a00185eb1046000aa";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

// Functions
// Get the weather info from the API
const fetchWeather = async () => {
  const zipCode = zip.value;
  const completeUrl = `${url}${zipCode}&appid=${key}`;
  const weather = await fetch(completeUrl);
  if (!weather.ok) {
    throw "The API does not support the provided zip code!";
  } else {
    errorContainer.innerHTML = ''; // Clear the previous error message if any
  }
  const weatherData = await weather.json();
  return weatherData;
}

const handleUserInput = async () => {
  const feelings = feelingsInput.value;
  const temperature = await fetchWeather().then(value => value.main.temp).catch(err => errorContainer.innerHTML = "Error: " + err );
  const data = {
    feelings: feelings,
    temperature: temperature,
    date: newDate
  };
  storeData('store', data);
  updateEntries(await retrieveData());
};

// Retrieve data from the server side
const retrieveData = async () => {
  const retrievedData = await fetch("data");
  const jsonData = await retrievedData.json();
  return jsonData;
}

// Takes a JSON object and stores it in the app endpoint 
const storeData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

// Updates the latest entries using the received JSON 
function updateEntries(data) {
  feelingsInput.value = ''; // Clear the zip input
  temperature.innerHTML = `Temperature: ${(data.temperature - 273.15).toFixed(2)} C°`;
  date.innerHTML = `Date: ${data.date}`;
  feelingsArea.innerHTML = `Last feelings entry: ${data.feelings}`;
}

// Event listener to get the required data when the button is clicked
submitBtn.addEventListener("click", handleUserInput);