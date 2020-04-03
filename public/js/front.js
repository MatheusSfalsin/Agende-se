// FOTO PERFIL

// 
var nav = document.getElementById('navbarResponsive')
var card = document.getElementById('chipUser')
var btn = document.getElementById('btnCreateEventMain')
var titlesite = document.getElementById('titlesite')
function mostraHeardSite() {
    nav.style.visibility = 'visible';
    card.style.display = 'block';
    btn.style.display = 'grid';
    titlesite.style.display = 'none';


}

window.onresize = function(){
    if(window.innerWidth < 860){
        document.getElementById('tableCalendar').style.display = 'none';
    }else{
        document.getElementById('tableCalendar').style.display = 'inherit';
    }
}

function menuResponsiveOption(){
    let windowWidth = window.innerWidth;
    let list = document.getElementById('listaDeTarefas')
    if(list.style.top == '90px' || list.style.top == '110px' || !list.style.top){
        list.style.top = '270px'
    }else if(windowWidth < 550){
        list.style.top = '110px'
    }else{
        list.style.top = '90px'
    }
    
}

function viewDayEvents(this_){
    let pai = this_.parentNode
    let diaMes = pai.innerText.substr(2)
    bodyModal.innerHTML = '';

    dadosEventosAndamento.forEach(dado =>{
        if(Number(dado.data.substr(0,2)) == diaMes && Number(dado.data.substr(3,2)) == Number(mesAtual) && Number(dado.data.substr(6)) == Number(anoAtual) ){
            bodyModal.innerHTML += 
            `<li class="listEventsModal" style='animation: none;'>
                <span class="spanTarefa">${dado.data}</span> 
                <span class="spanTarefa">${dado.hora} Hrs</span> 
                <span>${dado.descricao}</span>
            </li>`;
        }
    })
}

function runInfoFiltroDay(){
    let ft = document.getElementById('infoDayFiltro')

    let tipoFtl = filtroDeEventos()
    var dtFiltro = new Date(`${tipoFtl.ano}-${tipoFtl.mes}-${tipoFtl.dia}`)
    dtFiltro = dataFormatadCasual(dtFiltro)
    
    let info = '';
    
    if (tipoFtl.tipo == 1) {
        info = dtFiltro;
    } else if (tipoFtl.tipo == 2) {
        info = dtFiltro.substr(3);
    } else {
        info = `Todos Eventos`
    }

    ft.innerText = info
}
runInfoFiltroDay()

function colorEventsDefConfirm(permisao = false){
    leftDef = document.getElementById('leftDef')
    rightDef = document.getElementById('rightDef')
    if(leftDef.style.background == '' || permisao){
        leftDef.style.background = '#1d6cff'
        leftDef.style.borderBottom = '12px solid #1d6cff'
        rightDef.style.background = ''
        rightDef.style.borderBottom = ''
        controleDeEventos(dadosEventos, '')
    }
}
    
function colorEventsDef(permisao = false){
    leftDef = document.getElementById('leftDef')
    rightDef = document.getElementById('rightDef')
    if(rightDef.style.background == '' || permisao){
        rightDef.style.background = '#1d6cff'
        rightDef.style.borderBottom = '12px solid #1d6cff'
        leftDef.style.background = ''
        leftDef.style.borderBottom = ''
        controleDeTarefas(dadosTerefas,true);
    }
}
// function escondeHeardSite() {
//     nav.style.visibility = 'hidden';
//     card.style.display = 'none';
//     btn.style.display = 'none';
// }