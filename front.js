
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
        if (array[i] == "") {
            alert("vazio")
            return
        } else {
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



const addlivro = document.querySelector(".addlivros")
addlivro.addEventListener("click", () => {
    cadastrarLivros()
})


const livroButtom = document.getElementById("search-button")
const searchInput = document.getElementById("search-input")
let livro
const buscarDados = async () => {
    try {
        const httpGet = await fetch(`http://localhost:8080/dados:${searchInput.value}`)
        const dados = await httpGet.json()
        console.log(dados);
        const { autorLivro, capaLivro, editora, paginas, tituloLivro, sinopseLivro } = dados.dados
        mostrarDadosHtml(capaLivro, tituloLivro, autorLivro, editora, paginas, sinopseLivro)
        livro = searchInput.value
    } catch (error) {
        console.log(error);
    }
}

function avisoDeleteProduto() {
    Swal.fire({
        title: "Produto deletado",
        text: "O livro foi deletado com sucesso.",
        icon: "success"
    });
}

const deletarButtom = document.querySelector(".deletarButtom")
const deletarLivro = async () => {
    try {
        const data = await fetch(`http://localhost:8080/deletar:${livro}`, {
            method: "DELETE"
        })
        const response = await data.json()
        avisoDeleteProduto();
        mostrarDadosHtml("", "", "", "", "", "")
    } catch (error) {
        console.log(error);
    }
}

deletarButtom.addEventListener("click", () => {
    deletarLivro()
})

const mostrarDadosHtml = (imagem, titulo, autor, editor, qtdpaginas, Sinopse) => {
    const img = document.querySelector(".imgLivro")
    const h2 = document.querySelector(".titleLivro")
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

const httpPostIa = async (callback) => {
    const userInput = document.getElementById("user-input")
    const mensagemParaIa = {
        mensagem: userInput.value
    }
    try {
        const httpPostMensageIa = await fetch("http://localhost:8080/resposta", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mensagemParaIa)
        })
        const dados = await httpPostMensageIa.json()
        callback(dados)
    } catch (error) {
        console.log(error);
    }
}

const sendButton = document.querySelector(".send-button")

const createElementsDiv = () => {
    const chatBox = document.getElementById("chat-box")
    return chatBox
}

const exibirTextoIaResposta = () => {
    const text = document.createElement("p");
    text.id = "message bot-message";
    text.className = "message bot-message";
    httpPostIa((data) => {
        const { responseData } = data;
        const regex = /[#*]/g;
        const retornarNovaString = responseData.replace(regex, "");
        createElementsDiv().appendChild(text)
        text.innerHTML = retornarNovaString;
    })
}
sendButton.addEventListener("click", () => {
    exibirTextoIaResposta();
})

const dialog = document.querySelector("dialog")
const abrirDialog = () => {
    dialog.showModal()
}

const btnRecomendarLivro = document.getElementById("btnRecomendarLivro")
btnRecomendarLivro.addEventListener("click", () => {
    abrirDialog()
})

const btnCloser = document.querySelector(".btn-closer")
btnCloser.addEventListener("click", () => {
    dialog.close()
})


livroButtom.addEventListener("click", () => {
    buscarDados()
})

const darkMode = (corFundo, corLetra) => {
    const htmlElementos = document.querySelectorAll("*")
    htmlElementos.forEach(elementoHtml => {
        elementoHtml.style.backgroundColor = corFundo
        elementoHtml.style.color = corLetra
    })
}

const toggleLabel = document.getElementById("dark-mode-toggle")
const aplicarDarkMode = () => {
    if (toggleLabel.checked) {
        localStorage.setItem("cores", darkMode("rgba(0, 0, 0, 0.5)", 'white'))
    }else{
        localStorage.setItem("cores", darkMode("", ''))
    }
} 

const salvarDarkModeLocal = () => {
    const recuperarDarkMode = localStorage.getItem("cores")
    console.log(recuperarDarkMode);
    if (recuperarDarkMode) {
        darkMode("rgba(0, 0, 0, 0.5)", 'white')
    }else{
        darkMode("#759eff", 'white')
    }
}
salvarDarkModeLocal()
toggleLabel.addEventListener("click", () => [
    aplicarDarkMode()
])
