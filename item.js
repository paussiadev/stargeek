const nometitulo = document.getElementById("nometitulo");
const descricao = document.getElementById("descricao");
const foto = document.getElementById("foto");
const botao = document.getElementById("botao");

var url = new URL(window.location.href);
var peditar = url.searchParams.get("peditar");
var pindice = url.searchParams.get("indice");

var verficaemail ;
logarUsuario();

if (peditar == "true") {
    editar(pindice);
}

//cadastrar itens (imgs pela url) (item)//
botao.onclick = (evento) => {

    if ((peditar != "true") || (peditar == null)) {
        evento.preventDefault();
        fenvio().then(result => {
            if (result) {
                //Os dados cadastrados serão salvos e enviados (item)//
                let dados = JSON.parse(localStorage.getItem("catalogo")) || [];
                dados.push(
                    {
                        nome: nometitulo.value,
                        descricao: descricao.value,
                        foto: nomeArq,
                        email: verficaemail
                    }
                )
                localStorage.setItem("catalogo", JSON.stringify(dados));
                window.location.assign("catalogo.html");

            }
            else {
                alert("Ocorreu um erro no envio do arquivo");
            }
        });
    } else {
        editarenvio(evento);
        window.location.assign("catalogo.html");

    }
}

function editar(indice) {
    nometitulo.value = "";
    descricao.value = "";
    foto.files[0] = null;
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    nometitulo.value = dados[indice].nome;
    descricao.value = dados[indice].descricao;
    fotoa = dados[indice].foto;
}

var fotoa;
function editarenvio(evento) {
    evento.preventDefault();
    if ((fotoa != foto.value)
        && (foto.value != "")) {
        fenvio()
            .then(result => {
                if (result) {
                    salvarEdicao(nomeArq);
                }
            });
    } 
    else {
        salvarEdicao(fotoa);
    }
}

function salvarEdicao(pfoto) {
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados[pindice].nome = nometitulo.value;
    dados[pindice].descricao = descricao.value;
    dados[pindice].foto = pfoto;
    dados[pindice].email = emaillogado;
    localStorage.setItem("catalogo", JSON.stringify(dados));
}

//Envio das imagens (não apenas pela url, mas pelos arquivos do próprio pc do user) (item?)//
var nomeArq;
async function fenvio() {
    const url = 'http://localhost:3005/upload';
    const arquivo = document.getElementById("foto").files[0];
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    console.log(JSON.stringify(formData.values[0]));
    console.log(JSON.stringify(formData.values[1]));
    //função assíncrona//
    try {
        var resp = await fetch(url, {
            method: 'POST',
            body: formData,
        }
        )
        console.log(resp);
        if (resp.ok) {
            let respText = await resp.text();
            nomeArq = respText;
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

function logarUsuario() {
    let email = sessionStorage.getItem("email");
    if(email != null) {
        verficaemail = email;
    } else {
        window.location.assign("login.html");
    }
}
        