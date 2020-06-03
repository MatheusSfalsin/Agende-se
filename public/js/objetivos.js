function createObjetivo() {
  let user = firebase.auth().currentUser;
  let desc = document.getElementById("descObjetivo").value;
  let numDays = Number(document.getElementById("numDaysWeek").value);

  firebase
    .database()
    .ref()
    .child(`objetivos/${user.uid}`)
    .push(objetivo(user.uid, desc, 0, numDays, false));
}

function objetivo(
  idUser = "",
  desc,
  pontos = 0,
  pontosSemana = 1,
  concluido = false
) {
  return {
    idUser: idUser,
    descricao: desc,
    pontos: pontos,
    pontosSemana: pontosSemana,
    pontosSemanaAtual: 0,
    concluido: concluido,
    situacao: true,
  };
}

async function buscaObjetivos() {
  try {
    let user = firebase.auth().currentUser;
    firebase
      .database()
      .ref()
      .child(`objetivos/${user.uid}`)
      .on("value", function (snapshot) {
        listaObjetivos(snapshot);
      });
  } catch (error) {
    setTimeout(buscaObjetivos, 1000);
  }
}
buscaObjetivos();

function listaObjetivos(snapshot) {
  let list = document.getElementById("listObjs");

  list.innerHTML = "";

  snapshot.forEach((itema) => {
    data = {
      key: itema.key,
      desc: itema.val().descricao,
      pt: itema.val().pontos,
      ps: itema.val().pontosSemanaAtual,
      situacao: itema.val().situacao,
    };

    list.innerHTML += `<li>${data.desc} | ${data.pt} | ${data.ps} </li>`;
  });
}
