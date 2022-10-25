const usua = document.getElementById("nomeUser")//Apresenta o nome do usuario ta tela
const tblbody = document.querySelector('#t-body')//Pega tabela
const formulario = document.querySelector("#Formulario")
const buttonUpdate = document.querySelector(".btn")
let nome = document.querySelector("#nome")
let datai = document.querySelector("#datai")
let dataf = document.querySelector("#dataf")


let usuariologado = JSON.parse (localStorage.getItem('userLago'))//converte os itens vindo do localstore em json

usua.innerText = `Bem vindo, ${usuariologado.nome}`

if(localStorage.getItem('token') == null){
    alert("Você precisa fazer login")
    window.location.href = "../inde.html"
}
function Sair(){
    localStorage.removeItem('token')
    window.location.href = "../inde.html"
}

const url = "https://localhost:7063/api/Tarefa"
let output = ""
const mapTaref = (tarefas)=>{
    tarefas.map( taf =>{
        if(usuariologado.id == taf.idPessoa){
            output +=` 
            <tr id="tr-Tarefa" data-cod="${taf.idPessoa}" >
                <td id="idpost">${taf.id}</td>
                <td id="postnome" >${taf.nome}</td>
                <td id="dataIni">${taf.dataInicio}</td>
                <td id="dataFim">${taf.dataFim}</td>
                <td class="tdButtons" data-id=${taf.id}>
                    <a id="ExcluirTarefa" class="card-link" href="#">Deletar</a>
                    <a id="EditarTarefa" class="card-link" href="#">Editar</a>
                </td>
            </tr>`
        }
    })
    tblbody.innerHTML = output
}
fetch(url)
.then(response => response.json())
.then(data => mapTaref(data))

//Post
formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome.value,
            dataInicio: datai.value,
            dataFim: dataf.value,
            idPessoa: usuariologado.id
        })
        
    })
    .then(res => res)
    .then(data =>{
        const atualizarTarefa = []
        atualizarTarefa.push(data)
        mapTaref(atualizarTarefa)
    })
    .then(()=>location.reload())
    .catch(error => console.error(error))
})
//Delete
tblbody.addEventListener("click", (e)=>{
    //Define em qual local foi clicado
    let DeletarTarefa = e.target.id == "ExcluirTarefa"
    let EditarTarefa = e.target.id == "EditarTarefa"
    //Capiturando o parente clicado
    let id = e.target.parentElement.dataset.id
    let ed = e.target.parentElement.parentElement.dataset.cod
    //Verificação de foi clicado
    if(DeletarTarefa){
       
      fetch(`${url}/Id?Id=${id}`,{
        method: 'DELETE',
      })
      .then(res => res)
      .then(()=> location.reload())
    }
   
    if(EditarTarefa){
      const parent = e.target.parentElement.parentElement
      
      let nomeed = parent.querySelector("#postnome")
      let dataI = parent.querySelector("#dataIni")
      let dataF = parent.querySelector("#dataFim")      
      nome.value = nomeed.textContent
      datai.value = dataI.textContent
      dataf.value = dataF.textContent
    }
    buttonUpdate.addEventListener("click", (e)=>{
        e.preventDefault()
        fetch(`${url}/id?Id=${ed}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: ed,
            nome: nome.value,
            dataInicio: datai.value,
            dataFim: dataf.value,
            idPessoa: usuariologado.id
          })
        })
        .then(res => res)
        .then(()=> location.reload())
      })
})
