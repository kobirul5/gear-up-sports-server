const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cors())

app.get("/", (req, res)=>{
    res.send("server is running")
})

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_KEY}@cluster0.dgvjh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const equipmentCollection = client.db("allEquipments").collection("Equipments")

    app.get("/allEquipment", async(req,res)=>{
      const result = await equipmentCollection.find().toArray()
      res.send(result)
    })

    app.post("/allEquipment", async(req,res)=>{
      const data = req.body;
      const result = await equipmentCollection.insertOne(data)
      res.send(result)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.listen(port, ()=>{
    console.log(`server is running on PORT: ${port}`)
})