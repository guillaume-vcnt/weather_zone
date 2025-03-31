const baseUrl = "https://archive-api.open-meteo.com/v1/archive?";

async function fetchApi(localisation, startDate, endDate, paramFormat) {
  const latitude = localisation[0];
  const longitude = localisation[1];
  const formatedUrl = `${baseUrl}latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&${paramFormat}`;
  console.log(formatedUrl);
  const response = await fetch(formatedUrl);
  const data = await response.json();
  console.log(data);
}

function paramFormat(checkboxArray) {
  let format = "";
  for (let i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray[i] === "pluie") {
      format += "&daily=rain_sum";
    }
    if (checkboxArray[i] === "neige") {
      format += "&daily=snowfall_sum";
    }
    if (checkboxArray[i] === "vent") {
      format += "&daily=wind_speed_10m_max";
    }
    if (checkboxArray[i] === "temperature") {
      format += "&daily=temperature_2m_mean";
    }
  }
  return format;
}

async function ApiLoc(cityName) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const getLatitude = data.results[0].latitude;
  const getLongitude = data.results[0].longitude;
  return [getLatitude, getLongitude];
}

document.addEventListener("DOMContentLoaded", async () => {
  const cityInput = document.querySelector("#ville");
  const checkboxArray = [];

  const checkboxPluie = document.querySelector("#pluie");
  checkboxPluie.addEventListener("click", function () {
    if (checkboxPluie.checked) {
      checkboxArray.push(checkboxPluie.name);
    } else {
      const index = checkboxArray.indexOf(checkboxPluie.name);
      if (index > -1) {
        checkboxArray.splice(index, 1);
      }
    }
  });

  const checkboxNeige = document.querySelector("#neige");
  checkboxNeige.addEventListener("click", function () {
    if (checkboxNeige.checked) {
      checkboxArray.push(checkboxNeige.name);
    } else {
      const index = checkboxArray.indexOf(checkboxNeige.name);
      if (index > -1) {
        checkboxArray.splice(index, 1);
      }
    }
  });

  const checkboxVent = document.querySelector("#vent");
  checkboxVent.addEventListener("click", function () {
    if (checkboxVent.checked) {
      checkboxArray.push(checkboxVent.name);
    } else {
      const index = checkboxArray.indexOf(checkboxVent.name);
      if (index > -1) {
        checkboxArray.splice(index, 1);
      }
    }
  });

  const checkboxTemp = document.querySelector("#temperature");
  checkboxTemp.addEventListener("click", function () {
    if (checkboxTemp.checked) {
      checkboxArray.push(checkboxTemp.name);
    } else {
      const index = checkboxArray.indexOf(checkboxTemp.name);
      if (index > -1) {
        checkboxArray.splice(index, 1);
      }
    }
  });

  document.querySelector("#fetchData").addEventListener("click", async () => {
    const cityName = cityInput.value;
    const localisation = await ApiLoc(cityName);
    const format = paramFormat(checkboxArray);
    fetchApi(localisation, startDate, endDate, format);
  });
});
