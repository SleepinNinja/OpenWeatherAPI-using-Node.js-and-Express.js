const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
config = require('./config');
const app = express();


app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function(req, res){
	/*
	const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=8e63e3f56b41626cd61d69036e34e9f0&units=metric'
	https.get(url, function(response){
		console.log(response.statusCode);

		// on function calls a callback function on data load
		response.on('data', function(data){
			const weatherData = JSON.parse(data);
			console.log(weatherData);
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageURL = 'https://openweathermap.org/img/wn/' + icon +'@2x.png';
			console.log(temp, description, icon);



			//we can have multiple res.write
			res.write('<p>The weather is currently ' + description + '</p>');
			res.write('<h1>The temperature in London is ' + temp + ' degree celcius.</h1>');
			res.write('<img src=' + imageURL + '>')
			
			//we can have only single res.send 
			res.send();
		});

	}); */
	res.sendFile(__dirname + '/index.html');
});


app.post('/', function(req, res){
	const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
	const appId = config.secretKey;
	const cityName = req.body.city;
	const units = 'metric'

	const url = `${endpoint}?q=${cityName}&appid=${appId}&units=${units}`;
	
	https.get(url, function(response){
		console.log(response.statusCode);

		response.on('data', function(data){
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imageURL = 'https://openweathermap.org/img/wn/' + icon +'@2x.png';

			res.write('<p>The weather is currently ' + description + '</p>');
			res.write('<h1>The temperature in ' + cityName +  ' is ' + temp + 'degree celcius.</h1>');
			res.write('<img src=' + imageURL + '>')

			res.send();

		});
	});
	
});

app.listen(3000, function(){
	console.log('Server is running on port: 3000');
});