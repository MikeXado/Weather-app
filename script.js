const api = `https://api.weatherapi.com/v1/forecast.json?key=13001c2bc9a841669a8154010220603&q=`
const city = document.querySelector("#locationIn");
const apiKey = `&days=1&aqi=no&alerts=no`;

var img = document.createElement("img");
let div = document.querySelector(".weather-img");
div.appendChild(img)

const times = document.querySelectorAll("time").innerHTML;


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
      document.querySelector(".temp").textContent = Math.floor(temp_c);
      document.querySelector(".summary-text").textContent = data.current.condition.text;
      document.querySelector(".hu-value").textContent = humidity + "%";
      document.querySelector(".pressure").textContent = Math.floor(precip_mm) + "mm";
      document.querySelector(".wind").textContent = wind_kph + "kph";


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


//Table
$(window).on("load resize ", function () {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({
    'padding-right': scrollWidth
  });
}).resize();











