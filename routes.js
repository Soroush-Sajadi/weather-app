const express = require('express');
const fetch = require ('node-fetch')
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


    

app.post('/api', async (req, res) => {
    const lon = req.body.lon;
    const lat = req.body.lat;
    const currentWeather = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.KEY}`);
    const weatherInfo = await currentWeather.json();
    res.json(weatherInfo);
})



app.get('/api/:city', async(req, res) =>{
    const city = req.params.city
    const weatherApi = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.KEY}`)
    const weatherInfo = await weatherApi.json();
    res.json(weatherInfo);
})

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
        
  