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

app.get("/signin",(req,res)=>{
    res.sendFile(__dirname+"/signin.html");
})

app.get("/signup",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/welcome.html");
})

app.post("/",async(req,res)=>{
    // console.log(req.body);
    const cdata = req.body;
    const columns = 'Name, Email, Password';
    const values = `'${cdata.First_Name + " " + cdata.Last_Name}','${cdata.email}','${cdata.password}'`;
    console.log(values);
    try {
        const data = await studentinfoModel.insertWithReturn(columns, values);
        res.status(200).json({ studentinfotable: data.rows });
    } catch (err) {
        res.status(200).json({ studentinfotable: err.stack });
    }
})

app.listen(3000,()=>{
    console.log("Server has started on Port 3000");
})