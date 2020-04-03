// document.addEventListener('DOMContentLoaded', function () {
//     messaging.usePublicVapidKey("BLAAHH1CELacYbIwdmI0PzWQjg0dr--sicfliwuFrXjDISSAMtkW-H9VQ_eG_yfrwHk6xz2thNo_1N5eSDdXzeg");




//     importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
//     importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');
// })

// function teste(){
//     messaging.onMessage((payload) => {
//         console.log('Message received. ');
//         // ...
//       });
// }

// Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//         console.log('Notification permission granted.');
//         // TODO(developer): Retrieve an Instance ID token for use with FCM.
//         // ...
//     } else {
//         console.log('Unable to get permission to notify.');
//     }
// });

//Após o carregamento da página
document.addEventListener('DOMContentLoaded', function () {

    //Se não tiver suporte a Notification manda um alert para o usuário
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }

    //Se não tem permissão, solicita a autorização do usuário
    if (Notification.permission !== "granted"){
        Notification.requestPermission();
    }

});



// function novaNotification(){
//     var notification = new Notification('Notificação para voce amor', {
//         body: "Amoorrr te amoooo muitoooo!!",
//       });
//       notification.show()
// }

// setTimeout(novaNotification,3000)
