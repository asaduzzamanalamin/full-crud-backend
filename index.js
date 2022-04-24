const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());




const uri = "mongodb+srv://alamin:xafPwFnfBE98Pg12@cluster0.uf8hw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
   try{
      await client.connect();
      const notesCollection = client.db("notesTaker").collection("notes");
      console.log('connected to db');

      // get api to read all note
      // localhost:4000/notes
      app.get('/notes' , async(req ,res)=>{
        const query = {};
        const cursor = notesCollection.find(query); 
        const result = await cursor.toArray();
         res.send(result);
      })


      // create note taker
      // localhost:4000/note
      app.post('/note', async(req , res)=>{
         const data = req.body;
         const result = await notesCollection.insertOne(data);
         res.send(result);
         console.log(data);
      })


      // update note
      // localhost:4000/note/6264a18b6a86d62397825c80
      app.put('/note/:id', async(req , res)=>{
         const id = req.params.id;
         const data = req.body;
         // console.log(data);
         const filter = {_id:ObjectId(id)};
         

         const updateDoc = {
            $set: {
             ...data
              
            },
          };
          const result = await notesCollection.updateOne(filter, updateDoc);
         // console.log('from put method',id);
         res.send(result)

      })


      // delete note
      // localhost:4000/note/6264a18b6a86d62397825c80
      app.delete('/note/:id', async(req , res)=>{
         const id = req.params.id;
         const filter = {_id:ObjectId(id)};
         const result = await notesCollection.deleteOne(filter);
         res.send(result);


      })

   }
   finally{

   }
}
run().catch(console.dir);



app.get('/', (req , res)=>{
   res.send('hellow world')
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
 })

//  xafPwFnfBE98Pg12
// alamin