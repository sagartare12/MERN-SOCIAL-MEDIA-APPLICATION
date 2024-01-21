const cors = require("cors")
const mongoose = require("mongoose");
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'})
const app=require('./app')

//middlewares
app.use( cors());

//database connection
const DB_URL = process.env.MONGODB_URL.replace('<password>',process.env.MONGODB_PASSWORD);

mongoose.connect(DB_URL).then(()=>console.log("Database connection successfully"))

const db = mongoose.connection;

db.on("errror",()=>{
    console.log("Error while connecting to database")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on port : ${PORT}`)
})

process.on('unhandledRejection',(err)=>{
    console.log(err.name,err.message);
    console.log('Unhandle rejection , server getting down');
})