
const express = require("express")
const { MongoClient } = require("mongodb");
require('dotenv').config()
const  bodyParser = require('body-parser')
const expressApi = express()
expressApi.use(bodyParser.json())

expressApi.get("/dados", (req, response) => {
    try {
        response.send({ status: "OK", msg: "the connection was successful" });
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error", status: 500 });
    }
});

expressApi.post("/cadastro", (req, resposta) =>{
    try {
        resposta.send({ status: "OK", msg: "livro cadastrado" });
        const reqOk = req.body
        console.log(reqOk);
    } catch (error) {
        resposta.status(500).send({ error: "Internal Server Error", status: 500 });
    }
})

const url = `mongodb+srv://admin:${process.env.DATABASE_PASS}@dados.7d94myt.mongodb.net/?retryWrites=true&w=majority&appName=dados`
const client = new MongoClient(url);

const dataBaseConnect = async () => {
    try {
        await client.connect()
        const dataBaseName = client.db('database')
        const collection = dataBaseName.collection("database")
        // const newDdaos = collection.insertMany([{ idade: 12 }])
    } catch (error) {
        console.error("error connect database")
    }
}

// dataBaseConnect()
const port = 8080
expressApi.listen(port, () => {
    console.log(`Server running on the port ${port}...`);
})