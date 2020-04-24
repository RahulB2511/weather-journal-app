/* Global Variables */
// Personal API Key for OpenWeatherMap API
//w3Sschool and Stack Overflow helped with the code and underestanding
const apiKey = '48c20a7828f892dc0b943b5f17a33a06';
const apiURL = 'http://api.openweathermap.org/data/2.5/weather?q=London,gb&appid=6d101e81f2140d2f516e6072bda48dec&units=imperial'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//Help From "Updating UI Elements"
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
/* Function called by event listener */
function performAction(e) {
    const feelText = document.getElementById('feelings').value;

    // Friends helped with getting API data
    getApiData(apiURL, document.getElementById('zip').value, apiKey)
    .then(function (APItemperature) {

        postData('/add', { temperature: APItemperature, date: newDate, userResponse: feelText });

    })
    .then(function (){
        updateUI();
        })
}


/* Function to GET Web API Data*/
const getApiData = async (apiURL, zip, apiKey) => {
    const response = await fetch(apiURL + zip + ',us&appid=' + apiKey);
    try {
        const webData = await response.json();
        APItemperature = webData.main.temp;
        return APItemperature
    } catch (error) {
        console.log("error", error);
    }
}








/* Function to GET Project Data */
//Help From "Async GET"
const retrieveData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json()
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };






//Help from "Async GET"
/* Function to POST data */
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};


//Update the index page
//Help From "Updating UI Elements"
//THis is all the way in the bottom
const updateUI = async () => {
    const request = await fetch('/all')

    try{
        const recRec = await request.json();
        console.log(recRec);
        document.getElementById('date').innerHTML = 'Date: ' + recRec.date;
        document.getElementById('temp').innerHTML = 'Temperature: ' + Math.round((recRec.temperature*1.8) - 459.7) + '&#8457;';
        document.getElementById('content').innerHTML = 'Thoughts: ' + recRec.userResponse;
    
    }catch(error){
        console.log("error",error)
    }
}