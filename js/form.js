var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

    var pacienteDados = obtemPaciente(form);

    var pacienteTr = montaTr(pacienteDados);

    var erros = validaPaciente(pacienteDados);

    if(erros.length > 0){
        exibeErros(erros);
        return;
    }


    var tabela = document.querySelector("#tabela-pacientes");

    tabela.appendChild(pacienteTr);

    form.reset();
    var mensagemErro = document.querySelector("#mensagem-erro");
    mensagemErro.innerHTML = "";

});

function exibeErros(erros){
    var ul = document.querySelector("#mensagem-erro");

    ul.innerHTML = "";

    erros.forEach(function(erro){
    
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);

    });
}


function obtemPaciente(form){
    
    var pacienteDados = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    
    return pacienteDados;
};

function montaTr(pacienteDados){

    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    var nomeTd = montaTd(pacienteDados.nome,"info-nome");
    var pesoTd = montaTd(pacienteDados.peso,"info-peso");
    var alturaTd = montaTd(pacienteDados.altura,"info-altura");
    var gorduraTd = montaTd(pacienteDados.gordura,"info-gordura");
    var imcTd = montaTd(pacienteDados.imc,"info-imc");

    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);


    return pacienteTr;

};

function montaTd(dado,classe){

    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(pacienteDados){

    var erros = [];

    if(pacienteDados.nome.length == 0){
        erros.push("Nome inválido!");
    }
    if(!validaPeso(pacienteDados.peso) || pacienteDados.peso.length == 0){
        erros.push("O peso é inválido!");
    }
    if(!validaAltura(pacienteDados.altura) || pacienteDados.altura.length == 0){
        erros.push("A altura é inválida!");
    }
    if(pacienteDados.gordura.length == 0){
        erros.push("Gordura inválida!")
    }

    return erros;
}

