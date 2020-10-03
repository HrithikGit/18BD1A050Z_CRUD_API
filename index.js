require("dotenv").config


const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const url = "mongodb://localhost/HospitalDb"
const app= express()
const middleware = require("./middleware")
app.use(express.json())
mongoose.connect(url,{useNewUrlParser:true})

const con = mongoose.connection
con.on("open",function(){
    console.log("Hello World")
})



class HandlerGenerator {
    login (req, res) {
      let username = req.body.username;
      let password = req.body.password;
      // For the given username fetch user from DB
      let mockedUsername = 'admin';
      let mockedPassword = 'password';
  
      if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
          let token = jwt.sign({username: username},
            "helloworld",
            { expiresIn: '24h' // expires in 24 hours
            }
          );
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
          res.send(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        res.send(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }
    index (req, res) {
      res.json({
        success: true,
        message: 'Index page'
      });
    }
}

let handler = new HandlerGenerator();
app.use("/login",handler.login);
const hosRouter = require("./routes/hospitals")
app.use("/hospitals",middleware.checkToken,hosRouter)
const ventRouter = require("./routes/ventilators")
app.use("/ventilators",middleware.checkToken,ventRouter)

app.listen(9000);