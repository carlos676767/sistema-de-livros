
const express = require("express")
const { MongoClient } = require("mongodb");
require('dotenv').config()
const bodyParser = require('body-parser')
const expressApi = express()
expressApi.use(bodyParser.json())

expressApi.post("/cadastro", (req, resposta) => {
    try {
        resposta.send({ status: "OK", msg: "livro cadastrado" });
        const reqOk = req.body
        console.log(reqOk);
        dataBaseConnect(reqOk)
    } catch (error) {
        resposta.status(500).send({ error: "Internal Server Error", status: 500 });
    }
})


const url = `mongodb+srv://admin:${process.env.DATABASE_PASS}@dados.7d94myt.mongodb.net/?retryWrites=true&w=majority&appName=dados`
const client = new MongoClient(url);
const dataBaseConnect = async (dados) => {
    try {
        await client.connect()
        const dataBaseName = client.db('database')
        const collection = dataBaseName.collection("database")
        collection.insertOne(dados)
    } catch (error) {
        console.error("error connect database")
    } finally {
        setTimeout(() => {
            client.close()
        }, 10000);
    }
}



expressApi.get("/dados:dadoshttp", (req, response) => {
    try {
        const dadosHttpGet = req.params.dadoshttp.slice(1, Infinity)
        const dados = buscarLivro(dadosHttpGet)
        dados.then((data) => {
            response.send({ status: "OK", msg: "dados consultados com sucesso.", dados: data });
        })
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error", status: 500 });
    }
});


async function buscarLivro(dados) {
    try {
        await client.connect()
        const dataBaseName = client.db('database')
        const collection = dataBaseName.collection("database")
        const searchName = await collection.findOne({ tituloLivro: dados })
        console.log(searchName);
        return searchName
    } catch (error) {
        console.error("error connect database")
    } finally {
        client.close()
    }
}

const port = 8080
expressApi.listen(port, () => {
    console.log(`Server running on the port ${port}...`);
})