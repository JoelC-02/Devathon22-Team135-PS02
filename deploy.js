const exp = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = exp();
app.use(bodyParser.urlencoded({extended:true}));
app.use(exp.static("public"));
app.get("/signin",(req,res)=>{
    res.sendFile(__dirname+"/signin.html");
})
app.get("/signup",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/welcome.html");
})
app.post("/",(req,res)=>{
    console.log(req.body);
})
app.listen(3000,()=>{
    console.log("Server has started on Port 3000");
})