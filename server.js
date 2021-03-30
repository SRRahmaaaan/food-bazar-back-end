const express = require("express")
const cors = require("cors")
require("dotenv").config()
const MongoClient = require("mongodb").MongoClient;

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const port = process.env.PORT || 5000
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gaotg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
    const foodCollection = client.db("fooddb").collection("foods");
    app.post("/newFood", (req, res) => {
        foodCollection.insertOne(req.body)
        .then(result => {
            res.send(result.insertedCount > 0);
        })
    })
    app.get("/allFoods", (req, res) => {
        foodCollection.find({})
        .toArray((error, documents) => {
            res.send(documents)
        })
    })






});


app.get("/", (req, res) => {
    res.send("Server Running")
})
app.listen(port)