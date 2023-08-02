async function buscaEndereco(cep){
    
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";

    try{
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCepConvertida = await consultaCep.json();
        console.log(consultaCepConvertida)
        if(consultaCepConvertida.erro){
            throw Error('CEP não existente');
        }

        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');
        var bairro = document.getElementById('bairro');

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        estado.value = consultaCepConvertida.uf;
        bairro.value = consultaCepConvertida.bairro;

        return consultaCepConvertida;

    }catch(erro){
        mensagemErro.innerHTML = `<p>CEP invalido. Tente novamente</p>`
        console.log(erro);
    }

}

/*
let ceps = ['13213265', '01001000'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));
*/

var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));
