data = new Date();;
var diaAtual = data.getDate();
var mesAtual = data.getMonth() + 1;
var anoAtual = data.getFullYear();

function runServices() {
    try {
        let user = firebase.auth().currentUser;
        if (verificaLogin()) {
            visibleLoginECad()
            mostraHeardSite()
            fotoUser(user.photoURL, user.displayName)
            console.log('OK Familia')
        }
    } catch (error) {
        console.log(error)
    }

}

function mostraCalendar() {
    let data = new Date();
    montaCalendario(data.getMonth() + 1, data.getFullYear());
}

function verificaLogin() {
    // firebase.auth().onAuthStateChanged(function(user))
    let user = firebase.auth().currentUser;
    if (user) {
        return true;
    } else {
        return false;
    }
}

var mesInput = document.getElementById('inputMesAtualFiltro')
var diaInput = document.getElementById('inputDiaAtualFiltro');
var diaBtn = document.getElementById('diabtnFiltro');
var mesBtn = document.getElementById('mesbtnFiltro');

function setValueFiltro() {
    mesInput.value = mesAtual;
    diaInput.value = diaAtual;
}
setValueFiltro()

function setFiltroEvents() {
    if (!diaBtn.style.background || !mesBtn.style.background) {
        diaBtn.style.background = 'rgb(238, 238, 238)';
    }
}
setFiltroEvents()

function filtroDeEventos() { // retornara qual o filtro aplicado - retornara um objet(tipo,dia,mes,ano)
    let type = 0;
    if (diaBtn.style.background == 'rgb(238, 238, 238)') {
        type = 1;
    } else if (mesBtn.style.background == 'rgb(238, 238, 238)') {
        type = 2;
    } else {
        type = 3
    }
    return { tipo: type, dia: Number(diaInput.value), mes: Number(mesInput.value), ano: Number(anoAtual) }
}

diaBtn.addEventListener('click', function () {
    if (!diaBtn.style.background) {
        diaBtn.style.background = 'rgb(238, 238, 238)';
        mesBtn.style.background = '';
    } else {
        diaBtn.style.background = '';
    }
    controleDeEventos(dadosEventos, '')
})

mesBtn.addEventListener('click', function () {
    if (!mesBtn.style.background) {
        mesBtn.style.background = 'rgb(238, 238, 238)';
        diaBtn.style.background = '';
    } else {
        mesBtn.style.background = '';
    }
    controleDeEventos(dadosEventos, '')
})



// datas
function formataValoresData(data) {
    dia = (data.getDate()).toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return [diaF, mesF, anoF];
}

function dataFormatadCasual(data) {
    let dataForm = formataValoresData(data);
    return dataForm[0] + "/" + dataForm[1] + "/" + dataForm[2];

}

function dataParaFormatoSQL(data) {
    let dataForm = formataValoresData(data);
    return dataForm[2] + "-" + dataForm[1] + "-" + dataForm[0];

}

function dataFormatadCasualDireto(data) {
    date = data.substr(8, 2) + '-' + data.substr(5, 2) + '-' + data.substr(0, 4)
    return date;
}


function converteFormatoPadraoAoSQL(data) {
    date = data.substr(6, 4) + '-' + data.substr(3, 2) + '-' + data.substr(0, 2)
    return date;
}

function somaMais1Data(data) {
    dia = (Number(data.substr(8, 2)) + 1);
    dia = String(dia).length == 1 ? '0' + dia : dia;
    date = data.substr(0, 4) + '-' + data.substr(5, 2) + '-' + dia;
    return date;

}

// CONTROLE DE DATAS NO SISTEMA 
function onBlurSaveDiaAtual() {
    if (diaInput.value >= 1 && diaInput.value <= numeroDias) {
        diaAtual = diaInput.value;
        controleDeEventos(dadosEventos, '')
    }

}

function onBlurSaveMesAtual() {
    if (mesInput.value >= 1 && mesInput.value <= 12) {
        mesAtual = mesInput.value;
        controleDeEventos(dadosEventos, '')
    }

}

var dimunuirData = document.getElementById('dimunuirData')
var aumentarData = document.getElementById('aumentarData')

aumentarData.addEventListener('click', function () {
    if (diaBtn.style.background == 'rgb(238, 238, 238)') {
        aumentaDia()
    } else {
        aumentaMes()
    }
    controleDeEventos(dadosEventos, '')
})
dimunuirData.addEventListener('click', function () {
    if (diaBtn.style.background == 'rgb(238, 238, 238)') {
        diminuiDia()
    } else {
        diminuiMes()
    }
    controleDeEventos(dadosEventos, '')
})

function aumentaMes() {
    if (mesAtual == 12) {
        mesAtual = 1;
        anoAtual = Number(anoAtual) + 1;
    } else {
        mesAtual = Number(mesAtual) + 1;
    }

    // montaCalendario(mesAtual, anoAtual)
    setValueFiltro()
}

function diminuiMes() {
    // alert(mesAtual)
    if (mesAtual > 1) {
        mesAtual = Number(mesAtual) - 1;
    } else {
        mesAtual = 12;
        anoAtual = Number(anoAtual) - 1;
    }

    // montaCalendario(mesAtual, anoAtual)
    setValueFiltro()
}

function aumentaDia() {
    // alert(mesAtual)
    console.log('diaAtual: ' + diaAtual)
    console.log('numeroDias: ' + numeroDias)
    if (numeroDias > diaAtual) {
        diaAtual = Number(diaAtual) + 1;
    } else {
        aumentaMes()
        defineNumeroDeDias(mesAtual, anoAtual)
        diaAtual = 1;
    }
    console.log(diaAtual > 1 && numeroDias > diaAtual)
    setValueFiltro()
}

function diminuiDia() {
    // alert(mesAtual)
    console.log('diaAtual: ' + diaAtual)
    console.log('numeroDias: ' + numeroDias)
    if (diaAtual > 1 && numeroDias >= diaAtual) {
        diaAtual = Number(diaAtual) - 1;
    } else {
        diminuiMes()
        defineNumeroDeDias(mesAtual, anoAtual)
        diaAtual = numeroDias;
    }
    console.log(diaAtual > 1 && numeroDias > diaAtual)
    setValueFiltro()
}

var audio = new Audio('https://firebasestorage.googleapis.com/v0/b/agende-se-116d9.appspot.com/o/notificationEvent.mp3?alt=media&token=e23679ef-8cac-4bd3-a614-87a0d83e6ecd');
// window.addEventListener('click',function(){ audio.play()})

// var time = (new Date('2020-03-11 00:02'));
// // Executa a função quando no tempo marcado:
// setInterval(function() {
//   // Compara com o valor atual:
//   if (time.getDate() == 11 &&  <= (new Date().getHours)) {
//     audio.play()
//   }
// }, 1000);

// var time = (new Date('2020-03-11 21:01')).getTime();
// // Executa a função quando no tempo marcado:
// setTimeout(function () {
//     audio.play();
// }, time - Date.now());

// function playAudioNotification() {
//     audio.play();
// }

var elementoSelect = undefined

function controleAlertas(eventosDia) {
    eventosDia = orderPorhora(eventosDia)
    clearTimeout(elementoSelect);
    elementoSelect = undefined
    eventosDia.forEach(element => {
        let time = (new Date(element.dataEhora)).getTime();
        if (!elementoSelect && (time - Date.now()) >= 0) {
            elementoSelect = element;
        }
    });

    try {
        var time = (new Date(elementoSelect.dataEhora)).getTime();
        elementoSelect = setTimeout(function () {
            
            for (let index = 1; index < 6; index++) {
                setTimeout(function(){
                    audio.play();
                    audio.muted = false;
                },index*2000)

                if(index == 3){
                    controleAlertas(eventosDia)
                }
            }
            
            
        }, time - Date.now());

        
    } catch (error) {
    }
   


}