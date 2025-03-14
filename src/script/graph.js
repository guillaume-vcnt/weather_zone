const divContainer = document.querySelector(".graph-input");
const graphContainer = document.querySelector(".graph");

// check if chart exists, then delete if so
// check 2nd argument
// generate chart depending on it
let chart, type, xaxis, yaxis;
function generateGraph(indices, radioChecked) {
  graphContainer.style.display = "flex";
  if (chart) {
    chart.destroy();
  }

  switch (radioChecked) {
    case "raw":
      type = "line";
      xaxis = data.daily.time;
      if (dataRequested === "pluie") {
        yaxis = data.daily.precipitation_sum;
      }
      if (dataRequested === "temperature") {
        yaxis = data.daily.temperature_2m_mean;
      }
      if (dataRequested === "vent") {
        yaxis = data.daily.wind_speed_10m_max;
      }
      if (dataRequested === "neige") {
        yaxis = data.daily.snowfall_sum;
      }
      createLegend();
      animateGraph();
      break;
    case "tmm":
      type = "line";
      xaxis = indices.years;
      yaxis = indices.TMm;
      indiceGraph();
      break;
    case "txge30":
      type = "line";
      xaxis = indices.years;
      yaxis = indices.TXge30;
      indiceGraph();
      break;
    case "txgt50p":
      type = "line";
      xaxis = indices.years;
      yaxis = indices.TXgt50p;
      indiceGraph();
      break;
    case "etr":
      type = "line";
      xaxis = indices.years;
      yaxis = indices.ETR;
      indiceGraph();
      break;
    case "txx":
      type = "line";
      xaxis = indices.years;
      yaxis = indices.TXx;
      indiceGraph();
      break;
    case "r10mm":
      type = "line";
      xaxis = indices.years;
      yaxis = indices.R10mm;
      indiceGraph();
      break;
  }
}

function animateGraph() {
  const years = [];
  for (let i = 0; i < yaxis.length; i++) {
    years.push(i);
  }

  let data = yaxis;
  data = years.map((year, index) => ({ x: year, y: data[index] }));

  const totalDuration = 6000;
  const delayBetweenPoints = totalDuration / data.length;

  const previousY = (ctx) => {
    if (ctx.index === 0) {
      return ctx.chart.scales.y.getPixelForValue(10);
    } else {
      return ctx.chart
        .getDatasetMeta(ctx.datasetIndex)
        .data[ctx.index - 1].getProps(["y"], true).y;
    }
  };

  const animation = {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };

  const config = {
    type: "line",
    data: {
      labels: yearArr,
      datasets: [
        {
          borderColor: "white",
          borderWidth: 1,
          radius: 0,
          data: data,
        },
      ],
    },
    options: {
      animation,
      interaction: {
        intersect: false,
      },
      plugins: {
        legend: false,
      },
      scales: {
        x: {
          type: "linear",
          title: {
            display: true,
            text: "Jours",
          },
        },
        y: {
          title: {
            display: true,
            text: "Valeurs",
          },
        },
      },
    },
  };

  // Initialiser le graphique
  const ctx = divContainer.getContext("2d");
  chart = new Chart(ctx, config);
}

function indiceGraph() {
  chart = new Chart(divContainer, {
    type: type,
    data: {
      labels: xaxis,
      datasets: [
        {
          label: "smthg",
          data: yaxis,
          borderColor: "white ",
          backgroundColor: "white",
        },
      ],
    },
  });
}

function createLegend() {
  yearArr = data.daily.time.map((x) => parseInt(x.split("-")[0]));
}
