//Getting weather information around countries
$(document).ready(function () {
  $(document).ready(function () {
    myarrayCountry = ['london', 'California', 'Dubai', 'Australia']
    var country = ''

    $.each(myarrayCountry, function (index, item) {


      $.ajax({
        type: 'GET',
        DataType: 'json',
        url: `http://api.openweathermap.org/data/2.5/weather?q=${item}&appid=a19b37efc582adcf64e80e83a67494fc&units=metric`,
        async: false,
        success: searchCallback
      });

      function searchCallback(data) {

        country +=
          `
             <div class="carousel-item">
             <img src="atmosphere1.jpeg" class="d-block w-100" alt="${item}" width="1000" height="400">
             <div class="carousel-caption d-block">
               <h3>${item} Weather</h3>
               <p id="temp">Temp :${data.main.temp} deg <span id="temp_max" style="margin:30px">Max-Temp :${data.main.temp_max} deg</span></p>              
               <p id="temp-min">Min-Temp :${data.main.temp_min} deg <span  id="humidity" style="margin:30px">Humidity :${data.main.humidity} g.kg-1</span></p>
               <p id="pressure">Pressure :${data.main.pressure} N/m^2 <span  id="wind" style="margin:30px">Wind-Speed :${data.wind.speed} km/h</span></p>    
             </div>
             </div>
             `
      }
     

    });
    $('.country').append(country)
  })


  //Getting weather information in india
  myarrayindia = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata']
  var india = ''

  $.each(myarrayindia, function (index, item) {


    $.ajax({
      type: 'GET',
      DataType: 'json',
      url: `http://api.weatherapi.com/v1/current.json?key=782d4e563c8c48549c082006201610&q=${item}`,
      async: false,
      success: searchCallback
    });

    function searchCallback(data) {

      india +=
      
        `
        <div class="card  bg-dark p-2 text-center align-items-center m-4 " style="width: 230px; height: auto;">
        <div class="card-body">
        <h4 class="font-weight-bold text-white">${item}</h4>
        <hr>
        <img src="${data.current.condition.icon}" alt="icon"class="w-25">
        <p class="m-auto">${data.current.condition.text}</p> 
        <p>Temp:${data.current.temp_c} deg</h5></p>
        
        <p>Humidity:${data.current.humidity} g.kg-1</p>
        <p>Pressure:${data.current.pressure_mb} N/m^2</p>
        <p>Wind:${data.current.wind_kph} km/h</p>
       
        
        </div>
        </div>
        </div>
         `

    }

  

  })

  $('#india').append(india)
  ////Getting weather information in state
  myarray = ['Hyderabad', 'Nizamabad', 'Adilabad', 'Karimnagar']
  var state = ''

  $.each(myarray, function (index, item) {


    $.ajax({
      type: 'GET',
      DataType: 'json',
      url: `http://api.weatherapi.com/v1/current.json?key=782d4e563c8c48549c082006201610&q=${item}`,
      async: false,
      success: searchCallback
    });

    function searchCallback(data) {
var temp=data.current.temp_c;



      state +=


        `
        <div class="card  bg-dark p-2 text-center align-items-center m-4 " style="width: 230px; height: auto;">
        <div class="card-body">
        <h4 class="font-weight-bold text-white">${item}</h4>
        <hr>
        <img src="${data.current.condition.icon}" alt="icon"class="w-25">
        <p class="m-auto">${data.current.condition.text}</p> 
        <p>Temp:${data.current.temp_c} deg</h5></p>
        
        <p>Humidity:${data.current.humidity} g.kg-1</p>
        <p>Pressure:${data.current.pressure_mb} N/m^2</p>
        <p>Wind:${data.current.wind_kph} km/h</p>
       
        
        </div>
        </div>
        </div>
     `

    }
    

  });
  $('#state').append(state)
});

//Getting information for searched city
$('#search').click(function () {
  $('#carouselElem').hide()
  $('#cards1').hide()
  $('#cards2').hide()
  city = $('#city').val()
  var data = '';
  $.ajax({
    type: 'GET',
    DataType: 'json',
    url: `http://api.weatherapi.com/v1/current.json?key=782d4e563c8c48549c082006201610&q=${city}`,
    success: function (res) {

      //this is only for checking temperature
      data += '<div class="card dummy" style="width: 18rem ;margin: 20px;">'
      dummy_temp = parseFloat(res.current.temp_c)

      if (dummy_temp < 22) {
        data += '<img src="sunrise.jpeg" class="card-img-top" alt="sunrise" ></img>'
      }
      else if (dummy_temp > 22 && dummy_temp <= 30) {
        data += '<img src="sunset.jpeg" class="card-img-top" alt="sunset"></img>'
      }
      else {
        data += '<img src="noon.jpeg" class="card-img-top" alt="noon"></img>'
      }

      data +=
        `
            <div class="card text-white bg-dark mb-3" style="max-width: 18rem;margin:20px">
            <div class="card-header searched" id="searched-city" style='text-transform:uppercase; font-weight:bold; font-size:30'>${city}</div>
            <div class="card-body text-center">
              <p id="searchtemp" class="amer">Temp :${res.current.temp_c} deg</p>
                         
              <img src="${res.current.condition.icon}" alt="icon"class="w-25">
              <p class="m-auto">${res.current.condition.text}</p> 
              
              
              <p>Humidity:${res.current.humidity} g.kg-1</p>
              <p>Pressure:${res.current.pressure_mb} N/m^2</p>
              <p>Wind:${res.current.wind_kph} km/h</p>
                                 
            </div>
          </div>
           
            `
      //accessing data from server for creating forcasted graph                
      $.ajax({
        type: 'GET',
        DataType: 'json',
        url: `http://api.weatherapi.com/v1/forecast.json?key=782d4e563c8c48549c082006201610&q=${city}&days=3`,
        success: function (res) {

          console.log(res.forecast.forecastday[2].date)
          console.log(res.forecast.forecastday[2].day.maxtemp_c)
          console.log(res.forecast.forecastday[2].day.mintemp_c)
          google.charts.load('current', { 'packages': ['bar'] });
          google.charts.setOnLoadCallback(drawChart);
          function drawChart() {
            var data = google.visualization.arrayToDataTable([
              ['Date', 'Temp_min', 'Temp_max'],
              [res.forecast.forecastday[0].date, res.forecast.forecastday[0].day.mintemp_c, res.forecast.forecastday[0].day.maxtemp_c],
              [res.forecast.forecastday[1].date, res.forecast.forecastday[1].day.mintemp_c, res.forecast.forecastday[1].day.maxtemp_c],
              [res.forecast.forecastday[2].date, res.forecast.forecastday[2].day.mintemp_c, res.forecast.forecastday[2].day.maxtemp_c],

            ]);

            var options = {
              chart: {
                title: 'Temperature Difference',
                subtitle: 'daily-temp_min,temp_max,',
              },
              bars: 'vertical' // Required for Material Bar Charts.
            };

            var chart = new google.charts.Bar(document.getElementById('barchart_material'));
            $('#barchart_material').empty()
            chart.draw(data, google.charts.Bar.convertOptions(options));
          }
        }


      })

      $('.current-location').empty()
      $('.current-temperature').empty()
      $('.found-city').empty()
      $('.found-city').append(data)
    }

  })

  //this is for conversuation of degree to fahrenheit and vice versa 
  $('.found-city').click(function () {
    var dummy = $('#searchtemp').text()
    if (dummy.includes('deg')) {
      var cel = parseFloat(dummy.substr(6, 8))
      var far = cel * 9 / 5 + 32;
      far = 'Temp :' + far + ' fahrenheit'

      $('#searchtemp').text(far)
    }
    else if (dummy.includes('fahrenheit')) {
      var far = parseFloat(dummy.substr(6, 8))
      var cel = (5 / 9) * (far - 32)
      cel = 'Temp :' + cel + ' deg'

      $('#searchtemp').text(cel)
    }
  })
})
//to find current location

$('.location').click(function () {
  $('#carouselElem').hide()
  $('#cards1').hide()
  $('#cards2').hide()
  var current_city = ''
  var data = "";
  var atmdata = ''
  $.ajax({
    url: "https://geolocation-db.com/jsonp",
    jsonpCallback: "callback",
    dataType: "jsonp",
    success: function (location) {
      current_city = location.city
      data =
        `
                <div class="card text-white bg-dark mb-3" style="max-width: 18rem;margin:20px">
            <div class="card-header searched" id="searched-city" style=" font-weight:bold; font-size:30'>
            Location:${location.city}</div>
            <div class="card-body text-center">
              <p id="found-city">City::${location.city}</p>
                    <p id="postal">Pin-Code::${location.postal}</p>
                    <p id="state">State::${location.state}</p>
                    <p id="country">Country::${location.country_name}</p>
                    <p id="latitude">Latitude::${location.latitude}</p>
                    <p id="longitude">Longitude::${location.longitude}</p> 
                    <br>
                           
            </div>
          </div>
            `
      //getting weather info for current location

      $.ajax({
        type: 'GET',
        DataType: 'json',
        url: `http://api.weatherapi.com/v1/current.json?key=782d4e563c8c48549c082006201610&q=${current_city}`,
        success: function (res) {
          atmdata =
            `
                    <div class="card text-white bg-dark mb-3" style="max-width: 18rem;margin:20px">
                   
                    <div class="card-body text-center">
                     <h4 class="card-title text-info searched" id="searched-city">${current_city}</h4>
                     <img src="${res.current.condition.icon}" alt="icon"class="w-25">
                     <p class="m-auto">${res.current.condition.text}</p> 
                     <p>Temp:${res.current.temp_c} deg</h5></p>
                     
                     <p>Humidity:${res.current.humidity} g.kg-1</p>
                     <p>Pressure:${res.current.pressure_mb} N/m^2</p>
                     <p>Wind:${res.current.wind_kph} km/h</p>
             
                                         
                    </div>
                  </div>
               
                    `

          //Getting forcasted data for graph representation

          $.ajax({
            type: 'GET',
            DataType: 'json',
            url: `http://api.weatherapi.com/v1/forecast.json?key=782d4e563c8c48549c082006201610&q=${current_city}&days=3`,
            success: function (res) {

              console.log(res.forecast.forecastday[2].date)
              console.log(res.forecast.forecastday[2].day.maxtemp_c)
              console.log(res.forecast.forecastday[2].day.mintemp_c)
              google.charts.load('current', { 'packages': ['bar'] });
              google.charts.setOnLoadCallback(drawChart);
              function drawChart() {
                var data = google.visualization.arrayToDataTable([
                  ['Date', 'Temp_min', 'Temp_max'],
                  [res.forecast.forecastday[0].date, res.forecast.forecastday[0].day.mintemp_c, res.forecast.forecastday[0].day.maxtemp_c],
                  [res.forecast.forecastday[1].date, res.forecast.forecastday[1].day.mintemp_c, res.forecast.forecastday[1].day.maxtemp_c],
                  [res.forecast.forecastday[2].date, res.forecast.forecastday[2].day.mintemp_c, res.forecast.forecastday[2].day.maxtemp_c],

                ]);

                var options = {
                  chart: {
                    title: 'Temperature Difference',
                    subtitle: 'daily-temp_min,temp_max,',
                  },
                  bars: 'vertical' // Required for Material Bar Charts.
                };

                var chart = new google.charts.Bar(document.getElementById('barchart_material'));
                $('#barchart_material').empty()
                chart.draw(data, google.charts.Bar.convertOptions(options));
              }
            }


          })
          $('.current-location').empty()
          $('.current-temperature').empty()
          $('.found-city').empty()
          $('.current-location').append(data)
          $('.current-temperature').append(atmdata)

        }

      })

    }
  })
})










