const express = require('express')
const authRoutes = require('./routes/authRoutes')
const app = express()
var bodyParser = require("body-parser");
const { default: mongoose } = require('mongoose');

let port = process.env.PORT || 3000;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// Serve static files from the "public" folder
app.use(express.static(__dirname + '/public'))


mongoose.connect("mongodb+srv://root:root@cluster0.fgvjzwn.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("Connected to MongoD"))
.catch((error)=> console.log(error))


app.use('/auth',authRoutes)


app.listen(port , ()=>{
    console.log(`Hello Server On Port ${port}`);
})

