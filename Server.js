const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient=require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId; 
var db;
var s;
var elec;
MongoClient.connect('mongodb://localhost:27017/Inventory',(err,database)=>{
    if(err)return console.log(err)
    db=database.db('Inventory')
     elec = db.collection('electronic')
    app.listen(5000,() => {
        console.log('Listening at port number 5000')
    })
   // {useUnifiedTopology:true}
});
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'));

app.get('/',(req,res)=>{
  db.collection('electronic').find().toArray((err,result)=>{
      if(err){return (console.log(err))}
      
  res.render('index.ejs',{data:result});
  })
}) 

app.post('/AddData',(req,res)=>{
    db.collection('electronic').save(req.body,(err,result)=>{
        if(err) {return console.log(err);}
        res.redirect('/')
    })
})
app.post('/update', (req, res) => {
    var o_id = new ObjectId(req.body._id); 
    console.log("UPDATE:");
    console.log(o_id);
    elec.findOneAndUpdate( 
        { _id: o_id },
        {
            $set: {
                P_name: req.body.P_name,
                P_price: req.body.P_price
            }
        })
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
  })

app.get('/delete/:id', (req, res) => {
    var o_id = new ObjectId(req.params.id); 
    elec.deleteOne(
      { _id: o_id }
    )
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
  })