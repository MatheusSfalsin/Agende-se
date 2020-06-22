var contagemGlobalDeEventos = [];
var diaAnterior = ["00"];
var contagem = [0];
var dadosEventos = [];
var dadosEventosAndamento = [];

function executaEstruturaEventos(snapshot = "") {
  dadosEventos = [];
  snapshot.forEach((itema) => {
    itema.forEach((item) => {
      dadosEventos.push({
        key: item.key,
        data: item.val().data,
        descricao: item.val().descricao,
        hora: item.val().hora,
        dataEhora: item.val().dataEhora,
        objetivo: item.val().objetivo,
        situacao: item.val().situacao,
      });
    });
  });
  let diaAnterior = "";
  controleDeEventos(dadosEventos, diaAnterior);
}

function controleDeEventos(item, diaAnterior = "") {
  document.getElementById("listaDeTarefas").style.display = "block";
  let eventosList = document.getElementById("conteudoEventos");
  eventosList.innerHTML = "";
  //func
  dadosEventosAndamento = [];

  MainContagemEventosMes(diaAnterior);
  arrayDeEventosEmAndamento();
  runInfoFiltroDay();

  let ftl = filtroDeEventos();

  let eventosFalsos = [];
  let eventoDia = [];
  let eventosDoDiaAtual = [];

  item.forEach((item) => {
    if (item.situacao && controleDeFiltroEventos(item.data) && ftl.tipo != 1) {
      montaEventos(item);
    } else if (!item.situacao && controleDeFiltroEventos(item.data)) {
      // sit = false
      eventosFalsos.push(item);
    } else if (
      item.situacao &&
      controleDeFiltroEventos(item.data) &&
      ftl.tipo == 1
    ) {
      eventoDia.push(item);
    }

    if (item.data == dataFormatadCasual(new Date())) {
      eventosDoDiaAtual.push(item);
    }
  });

  // eventos do dia
  if (ftl.tipo == 1) {
    eventoDia = orderPorhora(eventoDia);
    eventoDia.forEach((item) => {
      montaEventos(item);
    });
  }
  controleAlertas(eventosDoDiaAtual);
  controleDeEventosConcluidos(eventosFalsos);
  mostraCalendar();
}

function montaEventos(item) {
  let eventosList = document.getElementById("conteudoEventos");
  let confirm = `<div class='confirmRecordEvent fadeIn' id='confirmRecordEvent${item.key}' onclick="confirmRecord('${item.key}','${item.data}')">
  <i class="fas fa-check-circle" aria-hidden="true"></i></div>`;

  let edit = `<div class='editRecordEvent fadeIn' id='editRecordEvent${item.key}' data-toggle="modal"  data-target="#modalEvento"
  onclick="criarBodyModal(),editarRegistro('${item.key}','${item.descricao}','${item.data}','${item.hora}')"
      ><i class="fas fa-edit"></i></div>`;
  ``;

  let remove = `<div class='removeRecordEvent fadeIn' id='removeRecordEvent${item.key}' onclick="removedRecord('${item.key}','${item.data}')">
  <i class="fas fa-trash-alt"></i></div>`;

  const objetivoStyle = colorObj(item);

  eventosList.innerHTML += `
    <li class="list-group-item" onmouseenter='eventoMouseEnterUl(this,3)' onmouseleave='eventoMouseLeaveUl(this,3)' 
      style="${objetivoStyle}"
    >
    ${confirm}
    ${edit}
    ${remove}
    <span class="spanTarefa">${item.data}</span> 
    <span class="spanTarefa" style='font-weight: bold;'>${item.hora} Hrs</span> 
    <span>${item.descricao}</span>
  </li>`;
}

function controleDeEventosConcluidos(itens) {
  let eventosList = document.getElementById("conteudoEventos");
  if (itens.length) {
    eventosList.innerHTML += `<div class="meu-hr">
      <hr>
      <span id="infoDayFiltro">Concluídas</span>
      <hr>
    </div>`;

    itens.forEach((item) => {
      let remove = `<div class='removeRecordEvent fadeIn' id='removeRecordEvent${item.key}' onclick="removedRecord('${item.key}','${item.data}')">
        <i class="fas fa-trash-alt"></i></div>`;

      const objetivoStyle = colorObj(item);

      eventosList.innerHTML += `
      <li class="list-group-item" style='text-decoration: line-through;${objetivoStyle}' onmouseenter='eventoMouseEnterUl(this,1)' onmouseleave='eventoMouseLeaveUl(this,1)'>
      ${remove}
      <span class="spanTarefa">${item.data}</span> 
      <span class="spanTarefa" style='font-weight: bold;'>${item.hora} Hrs</span> 
      <span>${item.descricao}</span>
    </li>`;
    });
  }
}

function colorObj(item) {
  let objetivoStyle = "";

  try {
    if (item.objetivo) {
      let objetivo = dataObjetivos.filter((data) => {
        return data.key === item.objetivo;
      })[0];
      objetivoStyle = `border-left: 3px solid ${objetivo.colorRGB}; background: ${objetivo.colorRGBa};`;
    }
  } catch (error) {}

  return objetivoStyle;
}

function arrayDeEventosEmAndamento() {
  dadosEventos.forEach((item) => {
    if (
      item.situacao &&
      item.data.substr(3, 2) == mesAtual &&
      item.data.substr(6)
    ) {
      dadosEventosAndamento.push(item);
    }
  });
}

function controleDeFiltroEventos(data) {
  let ftl = filtroDeEventos();
  var dtFiltro = new Date(`${ftl.ano}-${ftl.mes}-${ftl.dia}`);
  dtFiltro = dataFormatadCasual(dtFiltro);

  if (ftl.tipo == 1) {
    return data == dtFiltro ? true : false;
  } else if (ftl.tipo == 2) {
    return data.substr(3) == dtFiltro.substr(3) ? true : false;
  } else {
    return true;
  }
}

function eventoMouseEnterUl(this_, num) {
  for (let index = 0; index < num; index++) {
    this_.children[index].style.display = "inline";
  }
}

function eventoMouseLeaveUl(this_, num) {
  for (let index = 0; index < num; index++) {
    this_.children[index].style.display = "none";
  }
}

function MainContagemEventosMes(diaAnterior) {
  contagemGlobalDeEventos = [];
  dadosEventos.forEach((item) => {
    if (
      item.situacao &&
      item.data.substr(3, 2) == mesAtual &&
      item.data.substr(6) == anoAtual
    ) {
      var dia = item.data;
      var [verifica, cont, diaAnt] = contarEventosNoDia(
        diaAnterior,
        dia,
        contagem[0]
      );
      contagem[0] = cont;
      diaAnterior = diaAnt;
      // console.log(diaAnterior)
      if (verifica) {
        diaAnterior = dia;
      }

      if (Number(diaAnterior.substr(3, 2) == mesAtual)) {
        contagemGlobalDeEventos[Number(diaAnterior.substr(0, 2))] = contagem[0];
      }
    }
  });
}

function contarEventosNoDia(diaAnterior, dia, contagem) {
  if (diaAnterior == dia) {
    contagem++;
    return [false, contagem, diaAnterior];
  } else if (diaAnterior == "00") {
    return [true, contagem, diaAnterior];
  } else {
    contagem = 1;
    return [true, contagem, diaAnterior];
  }

  return;
}

function preencheArrayDeEventos() {
  ontagemGlobalDeEventos = [];
  for (let index = 0; index < 32; index++) {
    contagemGlobalDeEventos.push(0);
  }
}

preencheArrayDeEventos();

function orderPorhora(array) {
  let a = array.slice();
  a.sort(function (a, b) {
    if (a.hora > b.hora) {
      return 1;
    }
    if (a.hora < b.hora) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  return a;
}
