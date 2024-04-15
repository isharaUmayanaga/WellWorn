const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');

const port = 3001;
const host = 'localhost'


app.use(cors());  //resourse share karanna denawa back end to frontend
app.use(express.json());   //data json file walata convert karanwa


const uri = 'mongodb+srv://wellwornsl:wellwornsl123@wellwornsl.ytwnfha.mongodb.net/?retryWrites=true&w=majority';


const connect = async()=>{
    try{

        await mongoose.connect(uri);
        console.log("Connection Success..!!")

    }
    catch(error){
        console.log("Connection Error",error)
    }
    
};

connect();


const server = app.listen(port,host,() => {
    console.log(`node  server is listning to ${server.address().port}`)
});


app.use('/api',router);