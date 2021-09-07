const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
        console.log("error", error);
      }
  }

//postData('/addMovie', {answer: 42});
/*const retrieveData = async (url='') =>{
  const request = await fetch(url);
  try {
  // Transform into JSON
  const allData = await request.json;
  return allData
  }catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}*/

let date = new Date();
const year = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let today = `${date.getDate()} ${year[date.getMonth()]} ${date.getFullYear()}`;
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';

document.getElementById('generate').addEventListener('click', performAction);
const apiKey = '&APPID=c746fa8721d8f6fdf53c49e0eed641eb';

function performAction(e){

  let zip = document.getElementById('zip').value;
  let country = document.getElementById("country-code").value;
  let feelings = document.getElementById("feelings").value;
  let fullUrl = baseURL+zip+","+country+"&units=metric"+apiKey;

  getWeather(fullUrl)
  .then((data) => {
    // console.log(data);
    postData('/addWeather', {
      date: today,
      city: data.name,
      countryCode: country,
      temperature: Math.round(data.main.temp),
      feelings: feelings,
    });
  })
  .then(
    updateUI(".entry-results")
  )
  }


const getWeather = async (url)=>{

  const res = await fetch(url)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    alert("ZIP or country-code is invalid")
    // appropriately handle the error
  }
}

const updateUI = async (DOMelement) => {
  const response = await fetch('/all');

  try {
    const allData = await response.json();
    // console.log(allData);

    document.querySelector(DOMelement).classList.remove('display-none');
    document.getElementById('date').innerHTML = `Today is the <strong>${allData.date}</strong>.`;
    document.getElementById('temp').innerHTML = `In <strong>${allData.city}, ${allData.countryCode.toUpperCase()}</strong>, it is <strong>${allData.temperature}&deg;C</strong>`;

    // Check if 'Feelings' entry is empty and handle it accordingly.
    allData.feelings === '' ?
    document.getElementById('content').innerHTML = `and you feel <strong>empty</strong>.` :
    document.getElementById('content').innerHTML = `and you feel <strong>${allData.feelings}</strong>.`;
  } catch(error) {
    // Appropriately handle the error
    console.log('Error', error);
  }
}
