var bodyModal = document.getElementById("bodyModal");
var btSave = document.getElementById("btcreateEventUser");
function criarBodyModal() {
  try {
    bodyModal.innerHTML = "";
    let data = new Date();
    let dtFormat = dataParaFormatoSQL(data);
    bodyModal.innerHTML = `
                  <input type='hidden' id='inputUpdateEvent' value=''>
                  <input type='hidden' id='inputUpdateEventData' value=''>
      
                  <div class="form-label-group">
                      <input type="text" id="UserNameModal" class="form-control modalInput" placeholder="Descrição da Tarefa" required autofocus>
                      <label for="desc">Descrição da Tarefa</label>
                  </div>
      
                  <div class="form-label-group typeEventRadio">
                      <input type="radio" name="typeEvent" value="1" checked id='DefinidaEventModal'
                      onclick='habilitaCamposDateModal()'>Definida 
      
                      <input type="radio" name="typeEvent" value="0" id='naoDefinidaEventModal'
                      onclick='desabilitaCamposDateModal()'>Não Definida
                      <hr>
                  </div>   
      
                  <label id="labelObj">Selecione um objetivo(se tiver)</label>
                  <div class="form-label-group">
                      <select class="form-control" id="objetivoSelect">
                          <option value="0">---</option>    
                          ${dataObjetivos.map(
                            (obj) =>
                              `<option value="${obj.key}">${obj.desc}</option>`
                          )}
                      </select>
                      <hr>
                  </div>   
      
                  <div class="form-label-group">
                      <input class="form-control modalInput" type="date" value='${dtFormat}' id="dataModal">
                      <label for="data">Data do Evento</label>
                  </div>
      
                  <div class="form-label-group">
                      <input class="form-control modalInput" type="time" value="12:00:00" id="horaModal">
                      <label for="hrEvento">Hora do Evento</label>
                  </div>
                  `;

    document.getElementById("titleModalHeard").innerText = "Criar Evento";
    btSave.onclick = "createEventAndTask()";
  } catch (error) {}
}

function apagaBodyModal() {
  bodyModal.innerHTML = "";
}

criarBodyModal();

function desabilitaCamposDateModal() {
  console.log("teste");
  document.getElementById("dataModal").disabled = true;
  document.getElementById("horaModal").disabled = true;
}
function habilitaCamposDateModal() {
  document.getElementById("dataModal").disabled = false;
  document.getElementById("horaModal").disabled = false;
}
