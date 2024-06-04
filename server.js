const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const bodyParser = require("body-parser");
const expressApi = express();
expressApi.use(bodyParser.json());
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyCL432ibOPgBawbZW_4P4K4yWCR6wKxufI");


expressApi.post("/cadastro", (req, resposta) => {
    try {
        resposta.send({ status: "OK", msg: "livro cadastrado" });
        const reqOk = req.body;
        console.log(reqOk);
        dataBaseConnect(reqOk);
    } catch (error) {
        resposta.status(500).send({ error: "Internal Server Error", status: 500 });
    }
});

const url = `mongodb+srv://admin:${process.env.DATABASE_PASS}@dados.7d94myt.mongodb.net/?retryWrites=true&w=majority&appName=dados`;
const client = new MongoClient(url);
const dataBaseConnect = async (dados) => {
    try {
        await client.connect();
        const dataBaseName = client.db("database");
        const collection = dataBaseName.collection("database");
        collection.insertOne(dados);
    } catch (error) {
        console.error("error connect database");
    } finally {
        setTimeout(() => {
            client.close();
        }, 10000);
    }
};

expressApi.get("/dados:dadoshttp", (req, response) => {
    try {
        const dadosHttpGet = req.params.dadoshttp.slice(1, Infinity);
        const dados = buscarLivro(dadosHttpGet);
        dados.then((data) => {
            response.send({
                status: "OK",
                msg: "dados consultados com sucesso.",
                dados: data,
            });
        });
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error", status: 500 });
    }
});

expressApi.delete("/deletar:delete", (req, response) => {
    try {
        response.send({ status: "OK", msg: "dados deletados com sucesso." });
        const dadosHtpp = req.params.delete.slice(1, Infinity);
        deletarLivro(dadosHtpp)
        console.log(dadosHtpp);
    } catch (error) {
        response.status(404).send({ error: "error 404" });
    }
});

async function deletarLivro(livro) {
    try {
        await client.connect();
        const dataBaseName = client.db("database");
        const collection = dataBaseName.collection("database");
        const searchName = await collection.deleteOne({ tituloLivro: livro });
        console.log(searchName);
    } catch (error) {
        console.error("eror em deletar livro.");
    } finally {
        client.close();
    }
}

async function buscarLivro(dados) {
    try {
        await client.connect();
        const dataBaseName = client.db("database");
        const collection = dataBaseName.collection("database");
        const searchName = await collection.findOne({ tituloLivro: dados });
        console.log(searchName);
        return searchName;
    } catch (error) {
        console.error("error em buscar livro.");
    } finally {
        client.close();
    }
}

expressApi.post("/resposta", (req, response) => {
    try {
        const httpResponse = req.body.mensagem
        const dadosIa = recomendarLivros(httpResponse)
        dadosIa.then(data => {
            response.send({ status: "OK", responseData: data })
        })
    } catch (error) {
        console.error("Error http 404")
        response.status(400).send({error: "http bad request 400"})
    }
})


const recomendarLivros = async (gosto) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Oi Estou à procura de novas leituras e gostaria de recomendações 
      personalizadas. 
      Eu gosto muito de gêneros como, ${gosto}, apenas me mande os livros sem me perguntar mais nada por favor`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text
  } catch (error) {
    gosto = "Nao foi possivel buscar seus livros."
  }
};




const port = 8080;
expressApi.listen(port, () => {
    console.log(`Server running on the port ${port}...`);
});