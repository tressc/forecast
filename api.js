var celcius = false;
var hasData = false;
var days = {};

const getWeather = () => {
  return $.ajax({
    method: "GET",
    url: "http://api.aerisapi.com/forecasts/11101?client_id=AE3UktOIEeUuntM8cHsTj&client_secret=N0wewjRza1ncYbCGcqVxOP8SJmzgw5V2vn98iRAo",
  });
};

const handleWeather = (data) => {
  hasData = true;
  $(".spinner").removeClass("show");
  for (let i = 0; i < 7; i++) {
    days[i] = data.response[0].periods[i];
  }
  console.log(days);
  printWeather();
};

const printWeather = () => {
  for (let i = 0; i < 7; i++) {
    const $icon = $(`<img src="./icons/${days[i].icon}">`);

    const $date = $("<span>");
    $date.text(`${days[i].dateTimeISO.slice(0, 10)}`);

    const $low = $("<span>");
    $low.addClass(`${i}-low`);
    $low.text(`Low: ${days[i].minTempF}\xB0`);

    const $high = $("<span>");
    $high.addClass(`${i}-high`);
    $high.text(`High: ${days[i].maxTempF}\xB0`);

    const $temps = $("<div>");
    $temps.addClass("temps");

    const $data = $("<div>");
    $data.addClass("data");

    $temps.append($low);
    $temps.append($high);

    $data.append($date);
    $data.append($icon);
    $data.append($temps);

    $(`.${i}`).append($data);
  }
};

const printCelcius = () => {
  for (let i = 0; i < 7; i++) {
    $(`.${i}-low`).text(`Low: ${days[i].minTempC}\xB0`);
    $(`.${i}-high`).text(`High: ${days[i].maxTempC}\xB0`);
  }
};

const printFahrenheit = () => {
  for (let i = 0; i < 7; i++) {
    $(`.${i}-low`).text(`Low: ${days[i].minTempF}\xB0`);
    $(`.${i}-high`).text(`High: ${days[i].maxTempF}\xB0`);
  }
};

const bindEvents = () => {
  $(".get-weather").on("click", (e => {
    if (hasData) {
      $(".data").remove();
    }
    const delay = () => {
      getWeather().then(data => handleWeather(data));
    };
    window.setTimeout(delay, 1000);
    $(".spinner").addClass("show");
  }));

  $(".toggle-system").on("click", (e => {
    if (!hasData) return;

    if (celcius) {
      printFahrenheit();
      $(".toggle-system").html("show celcius");
      celcius = false;
    } else {
      printCelcius();
      $(".toggle-system").html("show fahrenheit");
      celcius = true;
    }
  }));
};



document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
});
