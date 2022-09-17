import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

import Model from './models/model.js';
const studentinfoModel = new Model('studentinfotable');
const clubeventModel = new Model('clubeventtable');

app.get("/signin",(req,res)=>{
    res.sendFile(__dirname+"/signin.html");
})

app.get("/signup",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.get("/home",(req,res)=>{
    res.sendFile(__dirname+"/home.html");
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/welcome.html");
})

app.get("/events",async(req,res)=>{
    try {
        const data = await clubeventModel.select('Name,Event,Details,Regdate');
        res.send(data.rows);
    } catch(err) {
        res.send("No upcoming club events");
    }
})

app.post("/signup",async(req,res)=>{
    // console.log(req.body);
    const cdata = req.body;
    const columns = 'Name, Email, Password';
    const values = `'${cdata.First_Name + " " + cdata.Last_Name}','${cdata.email}','${cdata.password}'`;
    console.log(values);
    try {
        const data = await studentinfoModel.selectWhere(columns, cdata.email);
        res.redirect('/signin');
    }catch(err) {
        try {
            const data = await studentinfoModel.insertWithReturn(columns, values);
            res.redirect('/home');
            // res.status(200).json({ studentinfotable: data.rows });
        } catch (err) {
            res.redirect('/signup');
        }
    }
})

app.post("/signin",async(req,res)=>{
    // console.log(req.body);
    const cdata = req.body;
    const columns = 'Email, Password';
    try {
        const data = await studentinfoModel.selectWherePass(columns, cdata.email, cdata.password);
        res.redirect('/home');
        // res.status(200).json({ studentinfotable: data.rows });
    } catch (err) {
        console.log("error");
        res.redirect('/signup');
    }
})

app.listen(3000,()=>{
    console.log("Server has started on Port 3000");
})