let dataRequested, formattedLocUrl, timer, climdexIndices;
let yearsArray = [];
let yearArr = [];
let data = {};
let citiesData = {};
let selectedCityData = {};
let indiceChoice = "raw";

const indicesInfos = {
  raw: "Daily raw data",
  tmm: "Yearly average temperature",
  txge30: "Count of days with temperature above 30°",
  txgt50p: "Percentage of days above yearly average temperature",
  etr: "Yearly temperature range",
  txx: "Yearly maximum tempertaure",
  r10mm: "Count of days with precipitations above 10mm",
};

const startDateContainer = document.querySelector("#start-date");
const endDateContainer = document.querySelector("#end-date");
const cityInput = document.getElementById("ville");
const cityInputContainer = document.querySelector(".input-dropdown-container");
const indicesContainer = document.querySelector(".radio-container");
const textContainer = document.querySelector(".text-container");
const textInfos = document.querySelector(".text-infos");
const mainDiv = document.querySelector(".main-div");
const rainDiv = document.querySelector(".pluie");
const snowDiv = document.querySelector(".neige");
const windDiv = document.querySelector(".vent");
const tempDiv = document.querySelector(".temperature");
const rawDiv = document.querySelector("#raw");
const tmmDiv = document.querySelector("#tmm");
const txge30Div = document.querySelector("#txge30");
const txgt50pDiv = document.querySelector("#txgt50p");
const txxDiv = document.querySelector("#txx");
const etrDiv = document.querySelector("#etr");
const r10mmDiv = document.querySelector("#r10mm");

// assign the id of the radio checked on dataRequested
function dataSelector() {
  dataRequested = document.querySelector(
    'input[name="input-radio"]:checked'
  ).id;
}

// format and return formatted url for checked boxes
function formatParamsUrl(dataSelected) {
  let formattedParamsUrl = "";
  switch (dataSelected) {
    case "pluie":
      formattedParamsUrl += "&daily=precipitation_sum";
      break;
    case "neige":
      formattedParamsUrl += "&daily=snowfall_sum";
      break;
    case "vent":
      formattedParamsUrl += "&daily=wind_speed_10m_max";
      break;
    case "temperature":
      formattedParamsUrl += "&daily=temperature_2m_mean"; // for apparent temperature use '&daily=apparent_temperature_mean'
      break;
  }
  return formattedParamsUrl;
}

// get date values from input
// format and return whole date url
function formatDateUrl() {
  yearsArray = [];
  const startDateValue = startDateContainer.value;
  const endDateValue = endDateContainer.value;
  const firstYear = startDateValue.split("-")[0];
  const lastYear = endDateValue.split("-")[0];
  yearsArray.push(firstYear, lastYear);
  const formattedDateUrl = `start_date=${startDateValue}&end_date=${endDateValue}`;
  return formattedDateUrl;
}

// remove generated buttons before generating new ones
const dropDownCleaner = () =>
  cityInputContainer.removeChild(document.querySelector(".dropdown-city-menu"));

// assign lat/long value to latitude/longitude variables, format loc url
function getClickedbutton(event) {
  const buttonIndex = parseInt(event.target.className.split("-")[1]);
  selectedCityData.latitude = citiesData.results[buttonIndex].latitude;
  selectedCityData.longitude = citiesData.results[buttonIndex].longitude;
  selectedCityData.name = citiesData.results[buttonIndex].name;
  selectedCityData.country = citiesData.results[buttonIndex].country;
  selectedCityData.region = citiesData.results[buttonIndex].admin1;
  formattedLocUrl = `latitude=${selectedCityData.latitude}&longitude=${selectedCityData.longitude}`;
  // return [name, country, region, latitude, longitude];
}

function validDate(container) {
  const validFormat = /^\d{4}-\d{2}-\d{2}$/;
  if (validFormat.test(container.value)) {
    return true;
  }
  return false;
}
