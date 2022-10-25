const email = document.getElementById("Email")
const senha = document.getElementById("Senha")
const form = document.getElementById("form")


const urlLogin = "https://localhost:7063/api/Pessoa"
const nm = document.getElementById("nomeUser")

let usuario = {
    id: 0,
    nome: '',
    email: '',
    senha: ''
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const mapear = (pessoas) =>{
        pessoas.map(pess =>{
            if(email.value == pess.email && senha.value == pess.senha){
                usuario = {
                    id: pess.id,
                    nome: pess.nome,
                    email: pess.email,
                    senha: pess.senha,  
                }
            }
        })
        if(email.value == usuario.email && senha.value == usuario.senha ){
            window.location.href = "../Pages/logado.html"    
            console.log("logado")
            //token que garante que o usuário esta logado
            let token = Math.random().toString(16).substring(2)
            localStorage.setItem('token', token)
            localStorage.setItem('userLago', JSON.stringify(usuario))
        
        }
        else {
            document.getElementById("Lemail").setAttribute("style", 'color: red')
            email.setAttribute("style", "border-color: red")
            document.getElementById("Lsenha").setAttribute("style", 'color: red')
            senha.setAttribute("style", "border-color: red")
            email.focus()
        }
    }
    fetch(urlLogin)
    .then(response => response.json())
    .then(data => mapear(data))  
})
