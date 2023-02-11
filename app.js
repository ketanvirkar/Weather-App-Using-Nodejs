const { response } = require("express");
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname +"/index.html");
});

app.post("/", function(req, res){
    const query = req.body.cityname;
    const apikey = "248cdb65f0eb168932c68f247c8bb76a";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+apikey;
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
const weatherData = JSON.parse(data);
const temp = weatherData.main.temp;
const des = weatherData.weather[0].description;
res.write("<h1>The temp in "+query+" is "+ temp +"</h1>");
res.write("<p>the weather description in "+query+" is "+ des +"</p>");
res.send()
    });
});
});


app.listen(3000, function(){
    console.log("Server is started on port 3000");
});