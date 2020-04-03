(function () {
    let firebaseConfig = {
        apiKey: "AIzaSyAu4LyZjPxdRds5nGbF1gj-7Gp1S2dIAyw",
        authDomain: "agende-se-116d9.firebaseapp.com",
        databaseURL: "https://agende-se-116d9.firebaseio.com",
        projectId: "agende-se-116d9",
        storageBucket: "agende-se-116d9.appspot.com",
        messagingSenderId: "10706789990",
        appId: "1:10706789990:web:d80a2288a4d3035b8d6fa7",
        measurementId: "G-NT5RMHSZ6K"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.database();
    firebase.auth()
    messaging = firebase.messaging();

})()