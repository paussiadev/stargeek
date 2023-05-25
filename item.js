const nometitulo = document.getElementById("nometitulo");
const descricao = document.getElementById("descricao");
const bota = document.getElementById("botao")
//cadastrar itens (imgs pela url) (item)//
botao.onclick= (evento)=> {
    evento.preventDefault();
    fenvio()
    .then(result=> {
        if (result){
            //Os dados cadastrados serão salvos e enviados (item)//
            let dados= JSON.parse (localStorage.getItem ("catalogo")) || [];
            dados.push(
                {
                    nome : nometitulo.value,
                    descricao : descricao.value,
                    foto : nomeArq
                }
                )
                localStorage.setItem("catalogo", JSON.stringify(dados));
                window.location.assign("catalogo.html");
            }
        else{
            alert("Ocorreu um erro no envio do arquivo");
        }
    })
}



//Envio das imagens (não apenas pela url, mas pelos arquivos do próprio pc do user) (item?)//
var nomeArq;
async function fenvio(){
    const url= 'http://localhost:3005/upload';
    const arquivo = document.getElementById("foto").files[0];
    const formData= new FormData();
    formData.append('arquivo', arquivo);
    console.log (JSON.stringify (formData));
    //função assíncrona//
    try{
        var resp= await fetch (url,{
            method:'POST',
            body: formData,
        }
        )
        if (resp.ok){
            let respText= await resp.text();
            nomeArq= respText;
            return true;
        }
        else{
            return false;
        }
    }
    catch (error){
        console.error(error);
        return false;
    }
}