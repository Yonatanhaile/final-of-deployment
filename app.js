const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.First;
    const lastName = req.body.Last;
    const email = req.body.Email; 

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/e959d043df";

    const Option  = {
        method: "POST",
        auth: "yona1:195fde562e8f8426fd6099fc6052d1bf-us8"
        //195fde562e8f8426fd6099fc6052d1bf-us8
    }
    
    const request = https.request(url, Option, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failur.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
            
        })
    })

    request.write(jsonData);
    request.end();
    
})

app.post("/failure", function (req, res) { 
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
    
})

// API Key
// 013d01442d9d20ea247529f9d3d11265-us8

// Audience(List) Id 
// e959d043df