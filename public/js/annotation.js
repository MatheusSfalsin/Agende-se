var dadosAnnotation = []
var ifr = document.getElementById('frameAnnotation');
var calendar = document.getElementById('tableCalendar');
var lists = document.getElementById('listaDeTarefas');

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
  dt = new Date(somaMais1Data(dataParaFormatoSQL(new Date())))
  dtformat = dataFormatadCasual(dt);

  let horaAtual = converteHora();

  firebase.database().ref().child(`anotacoes/${user.uid}`)
    .push({
      title: title,
      value: text,
      dataEhora: dtformat + " " + horaAtual
    });

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
    <li class="liNotes" onclick="showValueAnnotation(this)" data-toggle="modal" data-target="#modalEvento">
            <input type="hidden" value="${count}">
            <div class="removeNote"><i class="fas fa-trash-alt"></i></div>
            <div class="editNote"><i class="far fa-edit"></i></div>
            ${item.title}
    </li>`
    count++;
  })
}


function showValueAnnotation(element) {
  console.log(element)
  let elem = (dadosAnnotation[element.children[0].value])


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


