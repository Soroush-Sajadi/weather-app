const err = document.querySelector('.not-found');
const result = document.querySelector('.weather-info');

if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(async position => {
        const lon =  position.coords.longitude;
        const lat =  position.coords.latitude;
        const data = { lon, lat }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch('http://localhost:3000/api', options)
        const weatherInfo = await response.json();
        result.innerHTML += ` 
        <h2>${weatherInfo.name}</h2>
        <p>Temp: ${weatherInfo.main.temp} C</p>
        <p>Feels Like: ${weatherInfo.main.feels_like} C</p>
        <p>Min Temp: ${weatherInfo.main.temp_min} C</p>
        <p>Max Temp: ${weatherInfo.main.temp_max} C</p>
        <p>Humidity: ${weatherInfo.main.humidity} %</p>
    `;
     });
    } else {
        err.innerHTML = '';
        result.innerHTML = '';
        err.innerHTML = '<h3>We can not find your location</h3>'
}
function myFunction() {
  const city = document.getElementById("input").value ;
  fetch(`http://localhost:3000/api/${city}`)
  .then(res => res.json())
  .then(res => appendData(res))
}
function appendData(data) {
    if (data.message !== undefined) {
        err.innerHTML = '';
        result.innerHTML = '';
        err.innerHTML += '<h3>We can not find the city</h3>'
    } else {
        err.innerHTML = '';
        result.innerHTML = '';
        result.innerHTML += `
        <h2>${data.name}-${data.sys.country}</h2>
        <p>Temp: ${data.main.temp} C</p>
        <p>Feels Like: ${data.main.feels_like} C</p>
        <p>Min Temp: ${data.main.temp_min} C</p>
        <p>Max Temp: ${data.main.temp_max} C</p>
        <p>Humidity: ${data.main.humidity} %</p>
        `;
    }
}
