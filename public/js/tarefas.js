dadosTerefas = [];
function executaEstruturaTarefas(snapshot = "", permisao = false) {
  dadosTerefas = [];
  snapshot.forEach((item) => {
    dadosTerefas.push({
      key: item.key,
      descricao: item.val().descricao,
      situacao: item.val().situacao,
    });
  });

  if (permisao) {
    controleDeTarefas(dadosTerefas);
  }
}

function controleDeTarefas(item = dadosTerefas) {
  document.getElementById("listaDeTarefas").style.display = "block";
  let eventosList = document.getElementById("conteudoEventos");
  eventosList.innerHTML = "";

  item.forEach((item) => {
    if (item.situacao) {
      montaTarefas(item);
    }
  });
}

function montaTarefas(item) {
  let eventosList = document.getElementById("conteudoEventos");
  let confirm = `<div class='confirmRecordEvent fadeIn' id='confirmRecordEvent${item.key}' 
    onclick="confirmTarefa('${item.key}')">
    <i class="fas fa-check-circle" aria-hidden="true"></i></div>`;

  let edit = `<div class='editRecordEvent fadeIn' id='editRecordEvent${item.key}' data-toggle="modal"  data-target="#modalEvento"
    onclick="criarBodyModal(),editarRegistro('${item.key}','${item.descricao}','${item.data}','${item.hora}')"
        ><i class="fas fa-edit"></i></div>`;
  ``;

  let remove = `<div class='removeRecordEvent fadeIn' id='removeRecordEvent${item.key}' onclick="removedRecordTarefa('${item.key}')">
    <i class="fas fa-trash-alt"></i></div>`;

  eventosList.innerHTML += `
      <li class="list-group-item" onmouseenter='eventoMouseEnterUl(this,3)' onmouseleave='eventoMouseLeaveUl(this,3)'>
      ${confirm}
      ${edit}
      ${remove}
      <span>${item.descricao}</span>
    </li>`;
}

function removedRecordTarefa(id) {
  try {
    let user = firebase.auth().currentUser;
    let registro = firebase.database().ref(`listaDeTarefas/${user.uid}/${id}`);
    registro.remove();
  } catch (error) {
    console.log(error);
  }
}
