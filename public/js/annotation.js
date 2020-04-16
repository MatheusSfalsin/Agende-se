var dadosAnnotation = []
var ifr = document.getElementById('frameAnnotation');
var calendar = document.getElementById('tableCalendar');
var lists = document.getElementById('listaDeTarefas');

var keyEdit = "";

function returnHome() {
  ifr.style.display = 'none'
  calendar.style.display = 'inherit'
  lists.style.display = 'inherit'
}

function showIframeAnnotation() {
  ifr.style.display = 'grid'
  calendar.style.display = 'none'
  lists.style.display = 'none'
}

function createAnnotationDatabase(title = '', text = '') {
  let user = firebase.auth().currentUser;
  console.log(keyEdit)
  if (keyEdit === '') {
    dt = new Date(somaMais1Data(dataParaFormatoSQL(new Date())))
    dtformat = dataFormatadCasual(dt);

    let horaAtual = converteHora();
    if (title !== '') {
      firebase.database().ref().child(`anotacoes/${user.uid}`)
        .push({
          title: title,
          value: text,
          dataEhora: dtformat + " " + horaAtual
        });
    } else {
      alert('Coloque um titulo para sua anotação.')
    }

  } else {

    let registro = firebase.database().ref(`anotacoes/${user.uid}/${keyEdit}`)
    registro.update({
      title: document.getElementById('inputNotes').value
    })

  }

  prepareteEditRemove();

}


function createAnnotation() {
  const title = document.getElementById('inputNotes')

  createAnnotationDatabase(title.value)

  title.value = ''
}

function getAnnotation() {
  try {
    let user = firebase.auth().currentUser;
    firebase.database().ref().child(`anotacoes/${user.uid}`)
      .on('value', function (snapshot) {
        if (verificaLogin()) {
          formataDadosNota(snapshot)
        }
      })
  } catch (error) {
    setTimeout(getAnnotation, 1000)
  }
}

getAnnotation()

function formataDadosNota(snapshot) {
  let list = document.getElementById('idNotas')
  list.innerHTML = ''
  dadosAnnotation = [];

  snapshot.forEach((item) => {
    dadosAnnotation.push(
      {
        key: item.key,
        title: item.val().title,
        value: item.val().value,
        dataEhora: item.val().dataEhora,
      })
  })
  dadosAnnotation = orderPorhoraAnnotation(dadosAnnotation)

  let count = 0
  dadosAnnotation.forEach((item) => {
    list.innerHTML += `
    <li class = 'liNotes'>
            <input type="hidden" id='idAnnotationData${count}' value="${count}">
            <div style="width: 80%; position: absolute; height: 65px;" onclick="showValueAnnotation('idAnnotationData${count}')"  data-toggle="modal" data-target="#modalEvento"></div>
            <div class="removeNote" onclick="removeAnnotation('${item.key}')"><i class="fas fa-trash-alt"></i></div>
            <div class="editNote" onclick="prepareteEditShow('${item.title}','${item.key}')"><i class="far fa-edit"></i></div>
            ${item.title}
    </li>`
    count++;
  })
}

function removeAnnotation(keyNote) {
  try {
    let user = firebase.auth().currentUser;
    let registro = firebase.database().ref(`anotacoes/${user.uid}/${keyNote}`)
    registro.remove();
  } catch (error) {
    console.log(error)
  }
}

function prepareteEditShow(text = '', key = '') {
  inputNotes = document.getElementById('inputNotes')
  addBtn = document.getElementById('createNotes')
  cancelBt = document.getElementById('cancelEditNote')
  cancelBt.style.display = 'inline'
  addBtn.innerText = 'Atualizar'
  inputNotes.value = text
  keyEdit = key;


}

function prepareteEditRemove() {
  inputNotes = document.getElementById('inputNotes')
  addBtn = document.getElementById('createNotes')
  cancelBt = document.getElementById('cancelEditNote')

  cancelBt.style.display = 'none'
  addBtn.innerText = 'Adicionar'
  inputNotes.value = ''
  keyEdit = "";

}


function showValueAnnotation(element) {
  let dataNumber = document.getElementById(element).value
  let elem = (dadosAnnotation[dataNumber])


  document.getElementById('titleModalHeard').innerText = elem.title
  btSave.onclick = `saveTextAnnotation('${elem.key}')`
  btcreateEventUser.setAttribute("onclick", `saveTextAnnotation('${elem.key}');`);

  bodyModal.innerHTML = `
    <textarea class='textAreaAnnotation' id='idTextAreaAnnotation' rows='10' placeholder="Anote aqui">${elem.value ? elem.value : ''}</textarea>
  `
}

function saveTextAnnotation(keyNote) {
  let user = firebase.auth().currentUser;
  let value = document.getElementById('idTextAreaAnnotation')


  let registro = firebase.database().ref(`anotacoes/${user.uid}/${keyNote}`)
  registro.update({ value: value.value })
}


function orderPorhoraAnnotation(array) {
  let a = array.slice()
  a.sort(function (a, b) {
    if (a.dataEhora > b.dataEhora) {
      return 1;
    }
    if (a.dataEhora < b.dataEhora) {
      return -1;
    }
    // a must be equal to b
    return 0;
  })
  return a

}


