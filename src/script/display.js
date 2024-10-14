// create button list for city selection, set class to each button
// display city, country, region, localisation
function createButtonList(data) {
  if (document.querySelector(".dropdown-city-menu") != null) {
    dropDownCleaner();
  }
  const dropdownDiv = document.createElement("div");
  dropdownDiv.setAttribute("class", "dropdown-city-menu");
  for (let i = 0; i < 5; i++) {
    const cityLine = document.createElement("button");
    cityLine.innerHTML = `${data.results[i].name}, ${data.results[i].country}<br>${data.results[i].admin1}, (${data.results[i].latitude}, ${data.results[i].longitude})`;
    cityLine.setAttribute("class", `citybutton-${i}`);
    dropdownDiv.appendChild(cityLine);
  }
  cityInputContainer.appendChild(dropdownDiv);
}

// check indices status
// call generate graph with adapted arguments
function graphSelector() {
  if (document.getElementById("raw").checked) {
    generateGraph(climdexIndices, "raw");
    indiceChoice = "raw";
  }
  if (document.getElementById("txge30").checked) {
    generateGraph(climdexIndices, "txge30");
    indiceChoice = "txge30";
  }
  if (document.getElementById("txgt50p").checked) {
    generateGraph(climdexIndices, "txgt50p");
    indiceChoice = "txgt50p";
  }
  if (document.getElementById("tmm").checked) {
    generateGraph(climdexIndices, "tmm");
    indiceChoice = "tmm";
  }
  if (document.getElementById("txx").checked) {
    generateGraph(climdexIndices, "txx");
    indicesChoice = "txx";
  }
  if (document.getElementById("etr").checked) {
    generateGraph(climdexIndices, "etr");
    indiceChoice = "etr";
  }
  if (document.getElementById("r10mm").checked) {
    generateGraph(climdexIndices, "r10mm");
    indiceChoice = "r10mm";
  }
}

// check type of data requested
// format message for message box on the right
function displayDataInfos() {
  let displayDataRequested;
  switch (dataRequested) {
    case "pluie":
      displayDataRequested = "Precipitation";
      break;
    case "neige":
      displayDataRequested = "Snowfall";
      break;
    case "vent":
      displayDataRequested = "Wind";
      break;
    case "temperature":
      displayDataRequested = "Temperature";
      break;
  }
  textInfos.innerHTML = `
  Selected city: ${selectedCityData.name}<br>
  Country: ${selectedCityData.country}<br>
  Region: ${selectedCityData.region}<br>
  Coordinates: ${selectedCityData.latitude} / ${selectedCityData.longitude}<br><br>
  Requested data: ${displayDataRequested}<br><br>
  Data visualized: ${indicesInfos[indiceChoice]}
  `;
}
