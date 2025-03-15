const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");

/////////////////Start Day One//////////////////////////
const dayOneName = document.getElementById("dayOneName");
const dayOneDate = document.getElementById("dayOneDate");
const dayOneDateNum = document.getElementById("dayOneDateNum");
const dayOneCity = document.getElementById("dayOneCity");
const dayOneDeg = document.getElementById("dayOneDeg");
const DayOneDi = document.getElementById("DayOneDi");
const DayOneDes = document.getElementById("DayOneDes");
const DayOneRain = document.getElementById("DayOneRain");
const DayOneWind = document.getElementById("DayOneWind");
const dayOneAir = document.getElementById("dayOneAir");
////////////////////End Day One/////////////////////

/////////////////Start Day Two//////////////////////////
const DayTwoName = document.getElementById("DayTwoName");
const DayTwoDi = document.getElementById("DayTwoDi");
const dayTwoDateNumBIg = document.getElementById("dayTwoDateNumBIg");
const dayTwoDateNumSma = document.getElementById("dayTwoDateNumSma");
const DayTwoDes = document.getElementById("DayTwoDes");
/////////////////End Day Two//////////////////////////

/////////////////Start Day Three//////////////////////////
const DayThreeName = document.getElementById("DayThreeName");
const DayThreeDi = document.getElementById("DayThreeDi");
const dayThreeDateNumBIg = document.getElementById("dayThreeDateNumBIg");
const dayThreeDateNumSma = document.getElementById("dayThreeDateNumSma");
const DayThreeDes = document.getElementById("DayThreeDes");
/////////////////End Day Three//////////////////////////

navigator.geolocation.getCurrentPosition((position) => {
  let Latitude = position.coords.latitude;
  let Longitude = position.coords.longitude;
  getApi(`${Latitude} , ${Longitude} `);
  
});

searchInput.addEventListener("input", () => {
  getApi(searchInput.value);
});



let data = [];

async function getApi(City) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=19aa4dd93639411d872231122242312&q=${City}&days=3&aqi=no&alerts=no
`
  );
  if (response.ok) {
    data = await response.json();
    
    displayToday(data);
    displayTomorrow(data);
    displayAfterTomorrow(data);
  }
}

function displayToday(data) {
  //////////////Start header////////////////////
  let TodayDate = data.location.localtime;
  let DataName = new Date(TodayDate);
  let todayName = DataName.toLocaleString("en-us", { weekday: "long" });
  dayOneName.innerHTML = todayName;

  let todayMonth = DataName.toLocaleString("en-us", { month: "long" });
  let todayNum = DataName.getDate();
  dayOneDateNum.innerHTML = todayNum;
  dayOneDate.innerHTML = todayMonth;
  //////////////end header////////////////////

  //////////////Start body////////////////////
  dayOneCity.innerHTML = data.location.name;
  dayOneDeg.innerHTML = data.current.temp_c;
  DayOneDi.setAttribute("src", `https:${data.current.condition.icon}`);
  DayOneDes.innerHTML = data.current.condition.text;
  DayOneRain.innerHTML = data.current.humidity;
  DayOneWind.innerHTML = data.current.wind_kph;
  dayOneAir.innerHTML = data.current.wind_dir;
  //////////////end body////////////////////
}

function displayTomorrow(data) {
  /////////////Start header///////////////////////
  let tomorrowDate = data.forecast.forecastday[1];
  let tomorrowDateName = new Date(tomorrowDate.date);
  let tomorrowName = tomorrowDateName.toLocaleString("en-us", {
    weekday: "long",
  });
  DayTwoName.innerHTML = tomorrowName;
  /////////////End header///////////////////////

  /////////////Start Body///////////////////////
  DayTwoDi.setAttribute("src", `https:${tomorrowDate.day.condition.icon}`);

  dayTwoDateNumBIg.innerHTML = tomorrowDate.day.maxtemp_c;
  dayTwoDateNumSma.innerHTML = tomorrowDate.day.mintemp_c;
  DayTwoDes.innerHTML = tomorrowDate.day.condition.text;
  /////////////End Body///////////////////////
}

function displayAfterTomorrow(data) {
  let AfterTomorrowData = data.forecast.forecastday[2];
  let AfterTomorrowDataName = new Date(AfterTomorrowData.date);
  let AfterTomorrowName = AfterTomorrowDataName.toLocaleString("en-us", {
    weekday: "long",
  });
  DayThreeName.innerHTML = AfterTomorrowName;
  DayThreeDi.setAttribute(
    "src",
    `https:${AfterTomorrowData.day.condition.icon}`
  );
  dayThreeDateNumBIg.innerHTML = AfterTomorrowData.day.maxtemp_c;
  dayThreeDateNumSma.innerHTML = AfterTomorrowData.day.mintemp_c;
  DayThreeDes.innerHTML = AfterTomorrowData.day.condition.text;
}
