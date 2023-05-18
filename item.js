const msg = document.querySelector(".mensagem");
const formulario = document.getElementById("formulario");
const descricao = document.getElementById("descricao");
const escolhafoto = document.getElementById("escolahfoto");
const nome = document.getElementById("nometitulo");

formulario.onsubmit = (evt)=>{
    let dados = JSON.parse(localStorage.getItem("bd"));
    let logado;
    dados.forEach((elemento) => {
        if(elemento.emailcliente == escolhafoto.value && elemento.senhacliente == escolhafoto.value){
            msg.innerHTML = "Aguarde redirecionando..."
            setTimeout(()=>{
                window.location.assign("catalogo.html");
            }, 2000);
            evt.preventDefault();
            logado = "ok";
            return true;
        }
        if (logado!="ok") {
            msg.innerHTML = "Informação inválida"
            evt.preventDefault()
            return null;
        }
    });
}