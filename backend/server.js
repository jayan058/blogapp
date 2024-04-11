const express=require('express')
const app=new express();
const { ObjectId } = require('mongodb');
const router=express.Router();
const cors=require('cors')
const bodyparser=require('body-parser')
const {MongoClient}=require("mongodb");
const uri="mongodb://127.0.0.1";
const client=new MongoClient(uri);
app.use(bodyparser.json())
app.use(cors())


app.listen(5000,()=>{
    console.log("Server is Up And Ready!!!");
})

app.post("/blogdisplay",async (req,res)=>{
 console.log(req.body.userdetails);
  await client.connect();
  const db = client.db('blog');
  const collection = db.collection('userblog');
  const a = await collection.find({ "_id":  new ObjectId(req.body.userdetails)}).toArray();
  const c = await collection.find({ "blogdetails.author": a[0].blogdetails.author }).toArray();  
    var  d=await collection.find({"blogdetails.category":{$in:a[0].blogdetails.category}}).toArray();
    console.log([a,c,d]);
  res.send([a,c,d])
  
})
app.post("/newblogdisplay",async (req,res)=>{
  console.log("Hello");
  await client.connect();
  const db = client.db('blog');
  const collection = db.collection('userblog');
  const a = await collection.find({ "_id":  new ObjectId(req.body.elementid)}).toArray();
  const c = await collection.find({ "blogdetails.author": a[0].blogdetails.author }).toArray();  
    var  d=await collection.find({"blogdetails.category":{$in:a[0].blogdetails.category}}).toArray();
    console.log([a,c,d]);
 
    if (req.body.comment !== undefined) {
      f = await collection.updateOne(
        { "_id": new ObjectId(req.body.elementid) },
        { $push: { 'blogdetails.comments': req.body.comment } }
      );
    } else {
      f = null;
    }
    console.log(f);
  const e = await collection.find({ "_id":  new ObjectId(req.body.elementid)}).toArray();
  console.log(e);
  res.send([a,c,d,e])
  

 })


app.post("/",async (req,res)=>{
    res.send("Data Recieved")
  req.body.blogdetails.date=new Date(Date.now()),
  await client.connect();
  const db = client.db('blog');
  const collection = db.collection('userblog');
  await collection.insertOne(req.body);
})

app.get("/bloghomepage",async (req,res)=>{
  console.log("Hello");
  await client.connect();
  const db = client.db('blog');
  const collection = db.collection('userblog');
  var a=await collection.find().toArray();
  res.send(a)



})

app.get("/searchblogs",async (req,res)=>{
  console.log("Hello");
  await client.connect();
  const db = client.db('blog');
  const collection = db.collection('userblog');
  var a=await collection.find().toArray();
  res.send(a)



})






  
     


