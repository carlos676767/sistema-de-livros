


async function cadastrarLivros() {
    try {
        const httpRequest = await fetch("http://localhost:8070/cadastro", {
            method: 'POST'
        })
        const dados = await httpRequest.json()
    } catch (error) {
        console.log(error);
    }
}

const addlivro = document.querySelector(".addlivro")


addlivro.addEventListener("click", () => {
    cadastrarLivros()
})