var celcius = false;

const getWeather = () => {
  return $.ajax({
    method: "GET",
    url: "http://api.aerisapi.com/forecasts/11101?client_id=AE3UktOIEeUuntM8cHsTj&client_secret=N0wewjRza1ncYbCGcqVxOP8SJmzgw5V2vn98iRAo",
  });
};

const handleWeather = (data) => {
  $(".spinner").removeClass("show");
  const days = {};
  for (let i = 0; i < 7; i++) {
    days[i] = data.response[0].periods[i];
  }
  console.log(days);
  printWeather(days);
};

const printWeather = (days) => {
  for (let i = 0; i < 7; i++) {
    return;
  }
};

const bindEvents = () => {
  $(".get-weather").on("click", (e => {
    getWeather().then(data => handleWeather(data));
    // window.setTimeout(handleWeather, 3000);
    $(".spinner").addClass("show");
  }));

  $(".toggle-system").on("click", (e => {
    if (celcius) {
      $(".toggle-system").html("show celcius");
      celcius = false;
    } else {
      $(".toggle-system").html("show fahrenheit");
      celcius = true;
    }
  }));
};



document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
});
