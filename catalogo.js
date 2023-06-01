const cards = document.querySelector(".cards");
const botaoeditar= document.querySelector(".btneditar");

var verficaemail;
logarUsuario();

//link entre catalogo e item//
carregarCatalogo();
function carregarCatalogo(){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    let divcard = document.createElement("div");
    if(dados == null){
        divcard.innerHTML = "<p>NENHUM ITEM CADASTRADO</p>";

        cards.appendChild(divcard);
        return null;
    }

    //criação de um card no html dentro do código do js//
    dados.forEach((elemento, indice) => {
        if (elemento.email == verficaemail){
        let divcard = document.createElement("div");
        divcard.setAttribute("cards", "indice")
        divcard.innerHTML = `
        <div class="cardimagem"><img src="img/${elemento.foto}"></div>
        <div class="cardnome">${elemento.nome}
        <p>${elemento.descricao}</p>
        </div>
        <div class="cardinfo">
        <div class="editar"><i class="bi bi-pencil-fill" onclick="editar(${indice})"></i></div>
        <div class="excluir"><i class="bi bi-trash3-fill" onclick="excluir(${indice})"></i></div>
        </div>
        `;
        cards.appendChild(divcard);}
    });
}


//confirmação do usuário para exclusão de itens (catalogo)//
function excluir(indice){
    if (confirm("Tem certeza que deseja excluir?")) {
        let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados.splice(indice,1);
    localStorage.setItem("catalogo", JSON.stringify(dados));
    window.location.reload();
    }
}


function editar (indice) {
    var url= "item.html?peditar=true&indice="+
    encodeURIComponent(indice);
    window.location.href= url;
}

function logarUsuario() {
    let email = sessionStorage.getItem("email");
    if(email != null) {
        verficaemail = email;
    } else {
        window.location.assign("login.html");
    }
}
        