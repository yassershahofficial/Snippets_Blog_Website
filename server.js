const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');
const app = express();
dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080;

//log request 
app.use(morgan('tiny'));

//MongoDB connection
connectDB();

//parse request
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")
app.set("views",path.resolve(__dirname,"views"))

//load router.js any path of "/"
app.use('/',require('./server/routes/router.js'));

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})