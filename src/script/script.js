// used to get latitude and longitude of city
// format and return localisation url
async function fetchCityLoc(cityName) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
  const response = await fetch(url);
  citiesData = await response.json();
  createButtonList(citiesData);
}

// main api fetch
// get data depending on user inputs
async function fetchApi(localisationUrl, dateUrl, paramsUrl) {
  const baseUrl = "https://archive-api.open-meteo.com/v1/archive?";
  const formatedUrl = `${baseUrl}${localisationUrl}&${dateUrl}&${paramsUrl}`;
  const response = await fetch(formatedUrl);
  data = await response.json();
  climdexIndices = calculateIndices();
  generateGraph(climdexIndices, "raw");
  indicesContainer.style.display = "flex";
  textContainer.style.display = "flex";
  mainDiv.style.margin = "0 auto";
}

// add global click listener
// if clicked on checkbox, call formatParamsArrayWithCheckboxes in order to add checkbox name to paramsArray
// if clicked on button, fetch
// if clicked on city item, call getClickedButton in order to get localisation of clicked city
// if clicked on left indice, generate corresponding graph
// if clicked on data type, hide unavailable indices
document.body.addEventListener("click", (event) => {
  //   rainDiv.parentElement.style["background-color"] = "var(--radio-color3";
  if (
    event.target.parentElement === document.querySelector(".pluie") ||
    event.target.parentElement === document.querySelector(".neige") ||
    event.target.parentElement === document.querySelector(".vent") ||
    event.target.parentElement === document.querySelector(".temperature")
  ) {
    document.querySelector('input[name="input-radio"]:checked') != null
      ? dataSelector()
      : null;
    displayDataInfos();
  }
  if (event.target.id === "fetch-button") {
    if (validDate(startDateContainer) && validDate(endDateContainer)) {
      fetchApi(
        formattedLocUrl,
        formatDateUrl(),
        formatParamsUrl(dataRequested)
      );
    }
  }

  if (event.target.parentElement.className === "dropdown-city-menu") {
    getClickedbutton(event);
    displayDataInfos();
    dropDownCleaner();
  }
  if (event.target.parentElement.className === "radio-button") {
    graphSelector();
    displayDataInfos();
  }
  if (event.target.parentElement === rainDiv) {
    tmmDiv.parentElement.style.opacity = 0.2;
    txge30Div.parentElement.style.opacity = 0.2;
    txgt50pDiv.parentElement.style.opacity = 0.2;
    txxDiv.parentElement.style.opacity = 0.2;
    etrDiv.parentElement.style.opacity = 0.2;
    r10mmDiv.parentElement.style.opacity = 1;
  }
  if (
    event.target.parentElement === snowDiv ||
    event.target.parentElement === windDiv
  ) {
    tmmDiv.parentElement.style.opacity = 0.2;
    txge30Div.parentElement.style.opacity = 0.2;
    txgt50pDiv.parentElement.style.opacity = 0.2;
    txxDiv.parentElement.style.opacity = 0.2;
    etrDiv.parentElement.style.opacity = 0.2;
    r10mmDiv.parentElement.style.opacity = 0.2;
  }
  if (event.target.parentElement === tempDiv) {
    tmmDiv.parentElement.style.opacity = 1;
    txge30Div.parentElement.style.opacity = 1;
    txgt50pDiv.parentElement.style.opacity = 1;
    txxDiv.parentElement.style.opacity = 1;
    etrDiv.parentElement.style.opacity = 1;
    r10mmDiv.parentElement.style.opacity = 0.2;
  }
});

// add a listener on city field input
// after 1sec without typing, triggers fetchCityLoc function that fetches geocoding api with city name
cityInput.addEventListener("keyup", function (e) {
  clearTimeout(timer);
  timer = setTimeout(function () {
    if (cityInput.value.length > 0) {
      fetchCityLoc(cityInput.value);
    }
  }, 1000);
});

startDateContainer.addEventListener("change", () => {
  if (!validDate(startDateContainer)) {
    startDateContainer.style.color = "red";
    startDateContainer.style.border = "1px solid red";
  }
  if (!startDateContainer.value) {
    // console.log("coucou")
    startDateContainer.style.color = "white";
    startDateContainer.style.border = "1px solid white";
  }
});
endDateContainer.addEventListener("change", () => {
  if (!validDate(endDateContainer)) {
    endDateContainer.style.color = "red";
    endDateContainer.style.border = "1px solid red";
  }
  if (!endDateContainer.value) {
    endDateContainer.style.color = "white";
    endDateContainer.style.border = "1px solid white";
  }
});
