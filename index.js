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

app.listen(PORT, () => console.log(`App started in ${PORT}`));
