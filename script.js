
//Declare  the api 
const api = `https://api.weatherapi.com/v1/forecast.json?key=13001c2bc9a841669a8154010220603&q=`
const city = document.querySelector("#locationIn");
const apiKey = `&days=1&aqi=no&alerts=no`;
//Create variables for weather img
var img = document.createElement("img");
let div = document.querySelector(".weather-img");
div.appendChild(img)
const times = document.querySelectorAll("time").innerHTML;


//Load the the leaflet map 
const map = L.map('map').setView([0 , 0], 10);
const marker = L.marker([0 , 0]).addTo(map);


//Add tileLayer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWlzc3NoYW55YTIxIiwiYSI6ImNsMGgweTU4czAxdGkzaXA1b3dhdzU3NmMifQ.RSEheUqFs5WpOaDss_0BhA'
}).addTo(map);



//Function that sets the weather 
function getApi() {
  let fullApi = api + city.value + apiKey;


  fetch(fullApi)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const {
        temp_c,
        precip_mm,
        humidity,
        wind_kph
      } = data.current;
      const {
        icon
      } = data.current.condition;
      //SET DOM ELEMENTS 
      data.location.name = document.querySelector("#locationIn").value;
      document.querySelector(".city").textContent = data.location.name;
      img.src = icon;
      marker.setLatLng([data.location.lat , data.location.lon]);
      map.setView([data.location.lat , data.location.lon], 10);
      document.querySelector(".temp").textContent = Math.floor(temp_c);
      document.querySelector(".summary-text").textContent = data.current.condition.text;
      document.querySelector(".hu-value").textContent = humidity + "%";
      document.querySelector(".pressure").textContent = Math.floor(precip_mm) + "mm";
      document.querySelector(".wind").textContent = wind_kph + "kph";
       console.log(data)
    })
  document.querySelector(".loader").style.display = "none"
  document.querySelector(".weather-info__content").style.display = "flex"
 
}


getApi();

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {

    document.querySelector(".weather-info__content").style.display = "none";
    document.querySelector(".loader").style.display = "block";
    document.querySelector(".learn-more").classList.add("hov");
    document.querySelector(".learn-more").focus();
    setTimeout(() => {
      document.querySelector(".learn-more").classList.remove("hov");
      getApi();
    }, 1000);
  }
});

document.querySelector(".learn-more").addEventListener("click", () => {
  document.querySelector(".weather-info__content").style.display = "none";
  document.querySelector(".loader").style.display = "block";
  document.querySelector(".learn-more").classList.add("hov");
  setTimeout(() => {
    getApi();
  }, 1000);
});












