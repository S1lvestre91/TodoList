const formCad = document.getElementById("formC")
const nome = document.getElementById("Nome")
const email = document.getElementById("Email");
const senha = document.getElementById("Senha");
const csenha = document.getElementById("CSenha");

//consumindo Api
const url = "https://localhost:7063/api/Pessoa"

formCad.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(senha.value == csenha.value){

        const req = {
            method: "POST",
            body: JSON.stringify({
                nome: nome.value,
                email: email.value,
                senha: senha.value,
            }),
            headers:{
                "Content-Type": "application/json"
            }        
        }
        fetch(url, req)
        .then(response => response)
        document.querySelector(".desoculta").classList.add("active")

    }
    //substitui por uma mensagem
    if(senha.value != csenha.value){
        let msg = "Os campos Senha e Confirmar Senha precisa ser iguais"
        alert(msg)
    }
    alert("Usuário Cadastrado com sucesso!")
    location.href = "../index.html"
})



