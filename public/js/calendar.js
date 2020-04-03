var data = new Date();
//Valores padrões
var meses30 = [4, 6, 9, 11]
var meses31 = [1, 3, 5, 7, 8, 10, 12]
var numeroDias = 30;
var diaDaSemana = data.getDay();


function defineNumeroDeDias(mes, ano) {
    if (meses30.indexOf(mes) != -1) {
        numeroDias = 30;
    } else if (meses31.indexOf(mes) != -1) {
        numeroDias = 31;
    } else {
        let numDias = ano % 2 == 0 ? 29 : 28;
        numeroDias = numDias;
    }
    // console.log(numeroDias)
}

var table = '';
function montaCalendario(mes, ano) {
    defineNumeroDeDias(mes, ano)
    let dataTemporaria = new Date(`${mes}/01/${ano}`);
    // dataTemporaria.setDate(1)
    // dataTemporaria.setMonth(mes)
    // dataTemporaria.setFullYear(ano)
    let numSemana = 7
    // console.log(dataTemporaria.getDate()+' aqui:' + dataTemporaria.getDay())

    table = '';
    table += `<table class='tableElementos'><thead> <tr class='topoTabela'>
                    <th class='topoTabelaTitle' >Domingo</th>
                    <th class='topoTabelaTitle' >Segunda</th>
                    <th class='topoTabelaTitle' >Terça</th>
                    <th class='topoTabelaTitle' >Quarta</th>
                    <th class='topoTabelaTitle' >Quinta</th>
                    <th class='topoTabelaTitle' >Sexta</th>
                    <th class='topoTabelaTitle' >Sabado</th>
                </tr>
            </thead>
            <tbody class='corpoTarefa'>`

    for (let index = 1; index < numeroDias + 1; index++) {
        dataTemporaria.setDate(index);
        // console.log(dataTemporaria.getDay())
        dataTemporaria.setDate(index);
        // console.log('Index:'+dataTemporaria.getDate() + '= '+ dataTemporaria.getDay())
        numEventsDiv = contagemGlobalDeEventos[index]
        // console.log(contagemGlobalDeEventos[index] + `${index}`)^
        let divNumElements =` <div class='infoEventDay' data-toggle="modal" data-target="#modalEvento" onclick='viewDayEvents(this)'>
         <div class="infoDay">${numEventsDiv}</div>`
        if(numEventsDiv == 0 || !numEventsDiv){
            divNumElements =''
        }
        if (dataTemporaria.getDay() == 0 || index == 1) {
            // console.log(dataTemporaria.getDate())
            if (index != 1) {
                table += `</td>`
            } else {

            }
            table += `<tr class="corpoTabela">`

            if (dataTemporaria.getDate() == 1) {
                // console.log(dataTemporaria.getDate() + ' = ' +dataTemporaria.getDay())
                for (let index = 0; index < dataTemporaria.getDay(); index++) {
                    table += `<td class="corpoTabela"></td>`
                }
                table += `<td class="corpoTabela">${divNumElements}</div>${dataTemporaria.getDate()}</td>`;
            } else {
                table += `<td class="corpoTabela">${divNumElements} </div>${dataTemporaria.getDate()}</td>`
            }

        } else {
            table += `<td class="corpoTabela">${divNumElements}</div>${dataTemporaria.getDate()}</td>`
        }

    }
    table += `</tbody></table>`;
    // <tr class="corpoTabela">
    //     <td class="corpoTabela">teste</td>
    document.getElementById('tableCalendar').innerHTML = table;
    document.getElementById('tableCalendar').style.display = 'inherit';
}