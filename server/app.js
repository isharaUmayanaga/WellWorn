const express = require('express');
const app = express();
const cors = require('cors');
const contraller = require('./contraller');

app.use(cors());  //resourse share karanna denawa back end to frontend

app.use(
    express.urlencoded({
        extended:true,
    })
);       //use karanne data type eka aulk natuwa ganna

app.use(express.json());   //data json file walata convert karanwa


app.get('/users',(req,res)=>{
    contraller.getUsers((req,rees,next)=>{
        res.send();
    })
})

app.post('/createuser',(req,res)=>{
    contraller.addUser(req.body,(callack)=>{
        res.send(callack);
    })
})

app.put('/updateuser',(req,res)=>{
    contraller.updateUser(req.body,(callack)=>{
        res.send(callack);
    })
})

app.delete('/deleteuser',(req,res)=>{
    contraller.deleteUser(req.body,(callack)=>{
        res.send(callack);
    })
})

module.exports = app;

