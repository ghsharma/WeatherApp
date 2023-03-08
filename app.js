const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
 

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){

    const query = req.body.cityName;
    const apikey = "f6126dfd653e482535dbdf522bb50ecd";
    const unit = "metric";


    const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&unit=" + unit + "");
    
    https.get(url,function(response){
        console.log(response.statusCode);
        
        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp - 273
            const weatherDescription = weatherData.weather[0].description 
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "10d@2x.png"




            res.write("<p>The weather is currently :" + weatherDescription + "<p>");

            res.write(" <h1> the temprature in " + query + " is : " + (temp.toFixed(2)) + " degree celcius <h1> ");

            res.write("<img src=" + imageURL + ">");

            res.send()
        })
    })

})




 

app.listen(3000,function(){
    console.log("on over port 3000")
})