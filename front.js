


const title = document.getElementById("title")
const author = document.getElementById("author")
const publisher = document.getElementById("publisher")
const pages = document.getElementById("pages")
const capa = document.getElementById("cover-url")
const sinopse = document.getElementById("synopsis")

async function cadastrarLivros() {
    const array = []
    array.push(title.value, author.value, publisher.value, pages.value, capa.value, sinopse.value)
    for (let i = 0; i < array.length; i++) {
        if (array[i] =="") {
          alert("vazio")
          return
        }else{
            httpRequestLivrosPost()
        }
    }
}

const httpRequestLivrosPost = async () => {
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
const buscarDados = async () => {
    const searchInput = document.getElementById("search-input")
    try {
        const httpGet = await fetch(`http://localhost:8080/dados:${searchInput.value}`)
        const dados = await httpGet.json()
        console.log(dados);
        const { autorLivro, capaLivro, editora, paginas, tituloLivro, sinopseLivro } = dados.dados
        mostrarDadosHtml(capaLivro,tituloLivro, autorLivro, editora, paginas, sinopseLivro   )
    } catch (error) {
        console.log(error);
    }
}

const mostrarDadosHtml = (imagem, titulo, autor, editor, qtdpaginas, Sinopse) => {
    const img = document.querySelector(".imgLivro")
    const h2 = document.querySelector(".titleLivro")
    console.log(h2);
    const autoMostrar = document.getElementById("autoMostrar")
    const editora = document.getElementById("editoraMostrar")
    const quantidadepaginas = document.getElementById("quantidadepaginas")
    const sinopseLivro = document.getElementById("sinopseLivro")
    img.src = imagem
    h2.innerHTML = `${titulo}`
    autoMostrar.innerHTML = `Autor: ${autor}`
    editora.innerHTML = `Editora: ${editor}`
    quantidadepaginas.innerHTML = `Quantidade de Páginas: ${qtdpaginas}`
    sinopseLivro.innerHTML = `Sinopse: ${Sinopse}`
}


const chatBotApiRecomendarLivros = async() => {
    const userinput = document.getElementById("user-input").value
    
    try {
        
    } catch (error) {
        
    }
}



livroButtom.addEventListener("click", () => {
    buscarDados()
})
