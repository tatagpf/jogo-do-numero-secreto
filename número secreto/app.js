//let titulo=document.querySelector('h1');
//titulo.innerHTML='jogo do número secreto';

//let paragrafo=document.querySelector('p');
//paragrafo.innerHTML='escolha um número de 1 a 10';
let listaDeNumerosSorteados =[];
let numeroLimite = 10
let tentativas = 1;
let numeroASecreto = gerarNumeroAleatorio();


function exibirTextoNaTela(tag, Texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = Texto;
    responsiveVoice.speak(Texto, 'Brazilian Portuguese female',{rate:1.2});
}
function exibirMensagemInicial(){
    exibirTextoNaTela('h1','jogo do número secreto');
    exibirTextoNaTela('p', 'escolha um número de 1 e 10');
}
exibirMensagemInicial();
function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute== numeroASecreto){
        exibirTextoNaTela('h1','acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroASecreto){
            exibirTextoNaTela ('p','o numero secreto é menor');
        }else{
            exibirTextoNaTela ('p','o numero secreto é maior');
        }
        tentativas++
        limparCampo ();
    }   
}

function gerarNumeroAleatorio(){
    let numeroEscohido = parseInt(Math.random()*numeroLimite+1);  //return parseInt(Math.random()*10+1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(numeroEscohido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscohido);
        return(numeroEscohido);
    }
}
function limparCampo(){
     chute = document.querySelector('input');
     chute.value = ' ';
}
function reiniciarJogo(){
    numeroASecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}