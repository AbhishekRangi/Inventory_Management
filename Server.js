const express = require('express')
const app = express()
const bodyParser = require('monogdb').MongoClient

var db;
var s;

MongoClient.connect('mongodb://locolhost:27017/Inventory',(err,database)=>{
    if(err)return console.log(err)
    db=database.db('Inventor')
    app.listen(5000,() => {
        console.log('Listening at port number 5000')
    })
});
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'))
