var emailInput = document.getElementById('emailInput')
var passwordInput = document.getElementById('passwordInput')

var authEmailPassButton = document.getElementById('authEmailPassButton')

var authFacebookButton = document.getElementById('authFacebookButton')
var authGoogleButton = document.getElementById('authGoogleButton')
var telaLogin = document.getElementById('telaDeLoginEcad');


// Loga com email ja Cadastrado
authEmailPassButton.addEventListener('click', function () {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function (result) {
            runServices()
            visibleLoginECad()
            // displayName.innerText = 'Bem vindo, ' + emailInput.value
        })
        .catch(function (error) {
            console.error(error.code)
            console.error(error.message)
            alert('Falha ao tentar logar, tente novamente!')
        })
})

// Cria login 
function createUserbtFunc() {
    var createUserButton = document.getElementById('createUserButton')
    createUserButton.addEventListener('click', function () {
        let emailInput = document.getElementById('emailInput');
        let passwordInput = document.getElementById('passwordInput');
        if (validaCreateUserEmail()) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
                .then(function () {
                    runServices()
                    visibleLoginECad()
                })
                .catch(function (error) {
                    console.error(error.code)
                    console.error(error.message)
                    alert('Falha ao cadastrar!')
                })

        }

    })
}

function validaCreateUserEmail() {
    try {
        let nameUser = document.getElementById('UserName');
        let emailInput = document.getElementById('emailInput');
        let passwordInput = document.getElementById('passwordInput');
        let passwordInputConfirm = document.getElementById('passwordInputConfirm');
        if (nameUser.value && emailInput.value && passwordInput.value && passwordInputConfirm.value &&
            passwordInput.value === passwordInputConfirm.value) {
            return true;
        } else {
            alert('Dado incorreto!')
            return false;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}


// funcção para login de google e facebook
function signIn(provider) {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
            var token = result.credential.accessToken;
            runServices()
            fotoUser(result.additionalUserInfo.profile.picture, result.user.displayName)
            visibleLoginECad()
        }).catch(function (error) {
            console.log(error)
            alert('Falha na autenticação!')
        })
}

// busca foto do usuario
function fotoUser(foto, name) {
    if (foto) {
        let imgUser = document.getElementById('imgUser');
        imgUser.style.display = 'block';
        imgUser.src = foto;
        document.getElementById('nameUserProfile').innerText = name;

    }
}



// logar com GOOGLE
authGoogleButton.addEventListener('click', function () {
    var goo = new firebase.auth.GoogleAuthProvider();
    signIn(goo);
})

// logar com FACEBOOK
authFacebookButton.addEventListener('click', function () {
    var git = new firebase.auth.FacebookhubAuthProvider();
    signIn(git);
})



// SAIR DA CONTA
function sairDaConta() {
    // logOutButton.addEventListener('click', function () {
    firebase
        .auth()
        .signOut()
        .then(function (result) {
            // console.log(result)
        })
        .catch(function (error) {
            console.error(error.code)
            console.error(error.message)
            alert('Falha ao autenticar, Verifique o erro no console')
        })
    window.location.reload()

}


//

function criaEstruturaCad() {
    let nameUser = `
        <div class="form-label-group">
        <input type="text" id="UserName" class="form-control" placeholder="Seu Nome" required autofocus>
        <label for="UserName">Seu Nome</label>
        </div>`

    let confirmPass = `<div class="form-label-group">
        <input type="password" id="passwordInputConfirm" class="form-control" placeholder="Senha" required>
        <label for="inputPasswordConfirm">Senha</label>
    </div>`

    let hr = `<hr class="my-4">`

    let tipo = `<button class="btn btn-lg btn-success btn-block text-uppercase" id="createUserButton">Criar Conta</button>
    <span class="badge badge-pill d-flex justify-content-center registrarUser" id="criarUser" onclick="criaEstruturaLogin()">Voltar</span>`

    criaEstruturaLoginMain(nameUser, confirmPass, hr, tipo);
    createUserbtFunc();

}

function criaEstruturaLogin() {
    let nameUser = ``
    let confirmPass = ``
    let hr = ``
    let tipo = `<button class="btn btn-lg btn-primary btn-block text-uppercase" id="authEmailPassButton">Entrar</button>
    <span class="badge badge-pill d-flex justify-content-center registrarUser" id="criarUser" onclick="criaEstruturaCad()">Registrar-se</span>`

    criaEstruturaLoginMain(nameUser, confirmPass, hr, tipo);
}

function visibleLoginECad() {
    let login = document.getElementById('telaDeLoginEcad');
    login.style.display = login.style.display == 'none' ? 'block' : 'none';
    telaLogin.innerHTML = '';
}

function criaEstruturaLoginMain(nameUser, confirmPass, hr, tipo) {
    telaLogin.innerHTML = `
        <div class="container">
                    <div class="row">
                      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div class="card card-signin my-5">
                          <div class="card-body">
                            <h5 class="card-title text-center" id ='titleCad'>Login</h5>
                            ${nameUser}
                            <div class="form-signin" id="form-signin">
                              <div class="form-label-group">
                                <input type="email" id="emailInput" class="form-control" placeholder="Endereço de Email" required autofocus>
                                <label for="inputEmail">Endereço de Email</label>
                            </div>
                            ${hr}
                            <div class="form-label-group">
                                <input type="password" id="passwordInput" class="form-control" placeholder="Senha" required>
                                <label for="inputPassword">Senha</label>
                            </div>

                            ${confirmPass}
                
                            <div class="custom-control custom-checkbox mb-3">
                                <input type="checkbox" class="custom-control-input" id="customCheck1">
                                <label class="custom-control-label" for="customCheck1">Relembrar Senha</label>
                            </div>
                              ${tipo}
                              <!-- <button class="btn btn-lg btn-secondary btn-block text-uppercase" id="createUserButton">Registrar-se</button> -->
                              <hr class="my-4">
                              <button class="btn btn-lg btn-google btn-block text-uppercase" id="authGoogleButton"><i class="fab fa-google mr-2"></i> Entrar com Google</button>
                              <button class="btn btn-lg btn-facebook btn-block text-uppercase" id="authFacebookButton"><i class="fab fa-facebook-f mr-2"></i> Entrar com Facebook</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        </div>`

}


