btcreateEventUser = document.getElementById('btcreateEventUser');
inputUpdateEvent = document.getElementById('inputUpdateEvent');
inputUpdateEventData = document.getElementById('inputUpdateEventData');

//objeto evento
function evento(idUser = '', desc, data, hora, dataEhora) {
    return {
        idUser: idUser,
        descricao: desc,
        data: data,
        hora: hora,
        dataEhora: `${dataEhora} ${hora}`,
        situacao: true,
    }
}
//objeto tarefa
function tarefa(idUser = '', desc) {
    return {
        idUser: idUser,
        descricao: desc,
        situacao: true,
    }
}

function closeModalFunc() {
    document.getElementById('titleModalHeard').innerText = 'Criar Evento'
    inputUpdateEvent.value = '';
    inputUpdateEventData.value = '';
}

btcreateEventUser.addEventListener('click', function () {
    if (inputUpdateEvent.value == '') {
        createEvent();
    } else {
        editRecord()
    }

})

function createEvent() {
    let user = firebase.auth().currentUser;
    let desc = document.getElementById('UserNameModal')
    let data = document.getElementById('dataModal')
    let hora = document.getElementById('horaModal')

    if (document.getElementById('DefinidaEventModal').checked) {
        createEventDataBase(user.uid, desc.value, data.value, hora.value)
    } else {
        createListEvent(user.uid, desc.value)
    }
    desc.value = ''
}

function createListEvent(idUser, desc) {
    firebase.database().ref().child(`listaDeTarefas/${idUser}`).push(tarefa(idUser, desc));
}

function createEventDataBase(idUser, desc, data, hora) {
    dt = new Date(somaMais1Data(data))
    dtformat = dataFormatadCasual(dt);
    // console.log('aqui: '+ somaMais1Data(data))
    firebase.database().ref().child(`eventos/${idUser}/${data}`)
        .push(evento(idUser, desc, dtformat, hora, converteFormatoPadraoAoSQL(dtformat)));
}

async function buscaTerefas() {
    try {
        let user = firebase.auth().currentUser;
        firebase.database().ref().child(`listaDeTarefas/${user.uid}`).orderByChild('hora')
            .on('value', function (snapshot) {
                if (verificaLogin()) {
                    executaEstruturaTarefas(snapshot,true);
                    colorEventsDef(true)
                }
            })
    } catch (error) {
        setTimeout(buscaTerefas, 1000)
    }
}
buscaTerefas()

async function buscaEventos() {
    try {
        let user = firebase.auth().currentUser;
        firebase.database().ref().child(`eventos/${user.uid}`).orderByChild('hora')
            .on('value', function (snapshot) {
                if (verificaLogin()) {
                    executaEstruturaEventos(snapshot);
                    colorEventsDefConfirm(true)
                    runServices()
                }
            })
    } catch (error) {
        setTimeout(buscaEventos, 1000)
    }

}
buscaEventos()


function editarRegistro(id, descricao, data, hora) {
    inputUpdateEvent.value = id;
    inputUpdateEventData.value = data
    document.getElementById('UserNameModal').value = descricao
    // console.log(converteFormatoPadraoAoSQL(data))
    document.getElementById('dataModal').value = converteFormatoPadraoAoSQL(data)
    document.getElementById('horaModal').value = hora
    titleModalHeard
    document.getElementById('titleModalHeard').innerText = 'Atualizar Evento'
}

// function cancelaEdit() {
//     calcelAtt.style.display = 'none';
//     nameInput.value = ''
//     ageInput.value = ''
//     addButton.onclick = cria
//     addButton.innerText = 'Adicionar'
// }

function editRecord() {
    console.log('passssou')
    let user = firebase.auth().currentUser;
    let desc = document.getElementById('UserNameModal')
    let data = document.getElementById('dataModal')
    let hora = document.getElementById('horaModal')
    dt = new Date(somaMais1Data(data.value))
    dtformat = dataFormatadCasual(dt);
    dtSql = dataParaFormatoSQL(dt)
    console.log(`eventos/${user.uid}/${dtSql}/` + inputUpdateEvent.value)

    let registro = firebase.database().ref(`eventos/${user.uid}/${dtSql}/` + inputUpdateEvent.value)
    registro.update(evento(user.uid, desc.value, dtformat, hora.value))

    if (inputUpdateEventData.value != dtformat) {
        removedRecord(inputUpdateEvent.value, inputUpdateEventData.value)
    }


    inputUpdateEvent.value = '';
    inputUpdateEventData.value = '';
    desc.value = ''
    document.getElementById('titleModalHeard').innerText = 'Criar Evento'
}

function removedRecord(id, data) {
    try {
        let dtft = converteFormatoPadraoAoSQL(data)
        let user = firebase.auth().currentUser;
        console.log(`eventos/${user.uid}/${dtft}/` + id)
        let registro = firebase.database().ref(`eventos/${user.uid}/${dtft}/` + id)
        registro.remove();
    } catch (error) {
        console.log(error)
    }


}

function confirmRecord(id, data) {
    try {
        let dtft = converteFormatoPadraoAoSQL(data)
        let user = firebase.auth().currentUser;
        console.log(`eventos/${user.uid}/${dtft}/` + id)
        let registro = firebase.database().ref(`eventos/${user.uid}/${dtft}/` + id + '/situacao')
        registro.set(false);
    } catch (error) {
        console.log(error)
    }


}

function confirmTarefa(id) {
    try {
        let user = firebase.auth().currentUser;
        console.log(`listaDeTarefas/${user.uid}/${id}id/situacao`)
        let registro = firebase.database().ref(`listaDeTarefas/${user.uid}/${id}/situacao`)
        registro.set(false);
    } catch (error) {
        console.log(error)
    }
}

