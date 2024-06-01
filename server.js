
const express = require("express")
const { MongoClient } = require("mongodb");
require('dotenv').config()

const expressApi = express()

//get router
expressApi.get("/dados", (req, response) => {
    try {
        response.send({ status: "OK", msg: "the connection was successful" });
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error", status: 500 });
    }
});

const url = `mongodb+srv://admin:${process.env.DATABASE_PASS}@dados.7d94myt.mongodb.net/?retryWrites=true&w=majority&appName=dados`
const client = new MongoClient(url);

const dataBaseConnect = async () => {
    try {
        await client.connect()
        const dataBaseName = client.db('database')
        const collection = dataBaseName.collection("database") 
        // const dataBaseItensAdd = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }, {b: 124} ])
        collection.drop()
    } catch (error) {
        console.error("error connect database")
    }
}

dataBaseConnect()
const port = 8070
expressApi.listen(port, () => {
    console.log(`Server running on the port ${port}...`);
})