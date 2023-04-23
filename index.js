import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
console.log(process.env.MONGO_URL);
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;
async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}
const client = await createConnection();
app.get("/", function (request, response) {     //api endpoint for viewing welcome to dashboard
    response.send("Welcome to dashboard");
});
app.post('/students',async function (request, response){    //api for posting Student data
    const data = request.body;
    console.log(data);
    const result = await client.db("dashboard").collection("students").insertOne(data);
    console.log(result);
    response.send(result);
});

app.get("/students", async function (request, response) {            //api endpoint for getting Student data
    console.log(request.query);
    const students = await client.db("dashboard").collection("students").find(request.query).toArray();
    response.send(students);
});
app.delete("/students/:id", async function (request, response) {            //api endpoint for deleting Student data
    const {id}=request.params;
    console.log(request.params, id);
    const result = await client.db("dashboard").collection("students").deleteOne({id:id});
    console.log(result);
    result.deletedCount>0?response.send({msg:"Deleted Successfully"}):response.send({msg:"Not Deleted"});
});

app.post('/mentors',async function (request, response){    //api for posting Mentor data
    const data = request.body;
    console.log(data);
    const result = await client.db("dashboard").collection("mentors").insertOne(data);
    console.log(result);
    response.send(result);
});

app.get("/mentors", async function (request, response) {            //api endpoint for getting Mentors data
    console.log(request.query);
    const mentors = await client.db("dashboard").collection("mentors").find(request.query).toArray();
    response.send(mentors);
});
app.delete("/mentors/:id", async function (request, response) {            //api endpoint for deleting Mentors data
    const {id}=request.params;
    console.log(request.params, id);
    const result = await client.db("dashboard").collection("mentors").deleteOne({id:id});
    console.log(result);
    result.deletedCount>0?response.send({msg:"Deleted Successfully"}):response.send({msg:"Not Deleted"});
});
app.post('/assign',async function (request, response){    //api for posting Student-Mentor assigns
    const data = request.body;
    console.log(data);
    const result = await client.db("dashboard").collection("assign").insertOne(data);
    console.log(result);
    response.send(result);
});

app.get("/assign", async function (request, response) {            //api endpoint for getting Student-Mentor assigns
    console.log(request.query);
    const assigns = await client.db("dashboard").collection("assign").find(request.query).toArray();
    response.send(assigns);
});
app.delete("/assign/:id", async function (request, response) {            //api endpoint for deleting Student-Mentor assigns
    const {id}=request.params;
    console.log(request.params, id);
    const result = await client.db("dashboard").collection("assign").deleteOne({id:id});
    console.log(result);
    result.deletedCount>0?response.send({msg:"Deleted Successfully"}):response.send({msg:"Not Deleted"});
});

app.listen(PORT, () => console.log(`App started in ${PORT}`));
