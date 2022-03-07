
  var api = `https://api.weatherapi.com/v1/current.json?key=13001c2bc9a841669a8154010220603&q=`
  var city = document.querySelector("#locationIn");
  var apiKey = `&aqi=no`;

  var img = document.createElement("img");
  let div = document.querySelector(".weather-img");
  div.appendChild(img)



function getApi () {
  let fullApi =  api + city.value +  apiKey;
 

    fetch (fullApi)
 .then((response) => {
     return response.json();
 })
 .then((data) =>{
     const {temp_c, pressure_mb , humidity , wind_kph} = data.current;
     const {icon}  = data.current.condition;
     //SET DOM ELEMENTS 
    
    
     data.location.name = document.querySelector("#locationIn").value;
    document.querySelector(".city").textContent = data.location.name;
    img.src = icon ;
    document.querySelector(".temp").textContent = Math.floor(temp_c);
    
    document.querySelector(".summary-text").textContent = data.current.condition.text;
    document.querySelector(".hu-value").textContent = humidity + "%";
    document.querySelector(".pressure").textContent = pressure_mb + "mb";
    document.querySelector(".wind").textContent = wind_kph + "kph";
   
 })
}

getApi()

document.addEventListener("keyup" , (e) => {
    if (e.keyCode === 13) {
      getApi();
    }
})










