var dataObjetivos = [];

function createObjetivo() {
  let user = firebase.auth().currentUser;
  let desc = document.getElementById("descObjetivo").value;
  let numDays = Number(document.getElementById("numDaysWeek").value);
  let color = document.getElementById("selectColorObject").value;

  colorRGB = convertHexToRGBA(color, 100);
  colorRGBa = convertHexToRGBA(color, 20);

  firebase
    .database()
    .ref()
    .child(`objetivos/${user.uid}`)
    .push(objetivo(user.uid, desc, 0, numDays, false, colorRGB, colorRGBa));
}

function objetivo(
  idUser = "",
  desc,
  pontos = 0,
  pontosSemana = 1,
  concluido = false,
  colorRGB,
  colorRGBa = rgba(231, 74, 59, 0.2)
) {
  return {
    idUser: idUser,
    descricao: desc,
    pontos: pontos,
    pontosSemana: pontosSemana,
    pontosSemanaAtual: 0,
    concluido: concluido,
    colorRGB,
    colorRGBa,
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

  dataObjetivos = [];

  snapshot.forEach((itema) => {
    data = {
      key: itema.key,
      desc: itema.val().descricao,
      pt: itema.val().pontos,
      ps: itema.val().pontosSemanaAtual,
      colorRGB: itema.val().colorRGB,
      colorRGBa: itema.val().colorRGBa,
      situacao: itema.val().situacao,
    };

    dataObjetivos.push(data);

    list.innerHTML += `<li style="padding: 8px;margin: 4px; border: 1px solid ${data.colorRGB}">
    ${data.desc} | ${data.pt} | ${data.ps} </li>`;
  });
}

function setDateProxObj() {
  let data = document.getElementById("dataModal");

  dt = new Date(somaMais1Data(O));
}

const convertHexToRGBA = (hex, opacity) => {
  const tempHex = hex.replace("#", "");
  const r = parseInt(tempHex.substring(0, 2), 16);
  const g = parseInt(tempHex.substring(2, 4), 16);
  const b = parseInt(tempHex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};
