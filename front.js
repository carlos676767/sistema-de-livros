
const title = document.getElementById("title")
const author = document.getElementById("author")
const publisher = document.getElementById("publisher")
const pages = document.getElementById("pages")
const capa = document.getElementById("cover-url")
const sinopse = document.getElementById("synopsis")

async function cadastrarLivros() {
    const dadosEnviar = {
        tituloLivro: title.value,
        autorLivro: author.value,
        editora: publisher.value,
        paginas: pages.value,
        capaLivro: capa.value,
        sinopseLivro: sinopse.value
    }

    try {
        const httpRequest = await fetch("http://localhost:8080/cadastro", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosEnviar)
        })
        const dados = await httpRequest.json()
        console.log(dados);
    } catch (error) {
        console.log(error);
    }
}

const addlivro = document.querySelector(".addlivro")
addlivro.addEventListener("click", () => {
    cadastrarLivros()
})


const livroButtom = document.getElementById("search-button")


const buscarDados = async (callback) => {
    const searchInput = document.getElementById("search-input")
    try {
        const dados = await fetch(`http://localhost:8080/dados?q=${searchInput.value}`)
        const data = await dados.json()
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

livroButtom.addEventListener("click", () => {
    buscarDados()
})
