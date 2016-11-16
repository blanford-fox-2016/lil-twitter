$(document).ready(function() {
    if (!localStorage.getItem('token')) {
        authPage()
    } else {
        homePage()
    }
})

function homePage() {
    loadTwit()
    $('#nav-login').hide()
    $('#nav-register').hide()
    $('#nav-home').show()
    $('#nav-create').show()
    $('#nav-search').show()
    $('#nav-logout').show()
    $('#nav-home').on('click', loadTwit)
    $('#nav-create').on('click', formNewTwit)

}

function authPage() {
    formRegister()
    $('#nav-login').show()
    $('#nav-register').show()
    $('#nav-register').on('click', formRegister)
    $('#nav-login').on('click', formLogin)
    $('#nav-home').hide()
    $('#nav-create').hide()
    $('#nav-search').hide()
    $('#nav-logout').hide()
}

// ---------------------------------------------------------------------------
// AUTHENTICATION
// ---------------------------------------------------------------------------

const Auth = {
    authenticateUser: (data) => {
        if (data.status === 'error') console.log('No account:', data)
        Auth.deauthenticateUser()
            // console.log('data:', data)
        localStorage.setItem('token', data.token)
            // console.log('token:', localStorage.getItem('token'))
    },
    isUserAuthenticated: () => {
        // console.log('token:', localStorage.getItem('token'))
        return localStorage.getItem('token') !== null
    },
    deauthenticateUser: () => {
        localStorage.removeItem('token')
    },
    getToken: () => {
        return localStorage.getItem('token')
    },
    getUser: () => {
        let token = Auth.getToken()
        if (!token) return {}
        else {
            return jwt_decode(token)
        }
    }
}


function loadTwit() {
    $('#main-container').empty()
    $('#nav-logout').on('click', logoutProcess)


    $.ajax({
        url: `http://localhost:3000/api/twit/recent`,
        method: "get",
        success: function(data) {
            html = ''
            html += `<div class="page-header"><h1>Recent Tweet</h1></div>`
            for (var i = 0; i < data.length; i++) {
                html += `
        <div class="panel panel-info">
            <div class="panel-heading"><img src='${data[i].avatar_url}' class="avatar img-circle pull-left">
                <span><h3> ${data[i].name} - @${data[i].username} </h3></span>
                <button class="btn btn-danger close" onclick="deleteTwit(${data[i].twitId})"><span class="glyphicon glyphicon-trash"></span></button>
                <div class="clearfix"></div>
            </div>
            <div class="panel-body">
                <p id=tweets>${data[i].content}</p>
            </div>
        </div>
        `
            }
            $('#main-container').append(html)
        }
    })
}

function formNewTwit() {
    $('#formForCreate').remove()
    $('#form-login').remove()
    $('#form-register').remove()
    $('.jumbotron').remove()

    let html = ''
    html += `
    <form id='formForCreate'>
        <div class="form-group">
            <label for="form-create-task">Post new twit :</label>
            <input type="text" class="form-control" id="form-new-twit" placeholder="What's in your mind?">
        </div>
        <div class="form-group">
        <button type="button" class="btn btn-primary" onclick="postTwit()"> Twit <span class="glyphicon glyphicon-send"></span></button>
        </div>
    </form>
`
    $('#main-container').prepend(html)

}

function postTwit() {
    let newTwit = $('#form-new-twit').val()
    console.log(Auth.getUser());
    $.ajax({
        url: `http://localhost:3000/api/twit`,
        method: 'post',
        data: {
            content: newTwit,
            username: Auth.getUser().username,
            avatar_url: Auth.getUser().avatar_url,
            name: Auth.getUser().name
        },
        success: function(data) {
            $('#main-container').empty()
            loadTwit()
            formNewTwit()
        }
    })
}

function deleteTwit(parameter) {
    $.ajax({
        url: `http://localhost:3000/api/twit/${parameter}`,
        method: 'delete',
        success: function() {
            $('#main-container').empty()
            loadTwit()
            alert('Twit deleted')
        }
    })
}

function formLogin() {
    $('#main-container').empty()
    html = ''
    html += `
<div class="jumbotron">
  <h1 class="text-center">Login</h1>
  <form id="form-login">
      <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="input-username" placeholder="Enter Username" name='username'>
      </div>
      <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="input-password" placeholder="Password" name='password'>
      </div>
      <div class="form-group">
          <button type="button" class="btn btn-primary" role="button" onclick="loginProcessClient()">Login</button>
      </div>
  </form>
</div>
  `
    $('#main-container').prepend(html)
}

function loginProcessClient() {
    let $username = $('#input-username').val()
    let $password = $('#input-password').val()

    $.ajax({
        url: "http://localhost:3000/api/auth/login",
        method: 'post',
        data: {
            username: $username,
            password: $password
        },
        success: function(data) {
            Auth.authenticateUser(data)
            loadTwit()
            $('#nav-login').hide()
            $('#nav-register').hide()
            $('#nav-home').show()
            $('#nav-create').show()
            $('#nav-search').show()
            $('#nav-logout').show()
            $('#nav-home').on('click', loadTwit)
            $('#nav-create').on('click', formNewTwit)
        },
        error: function(err) {
            formRegister()
            $('#nav-register').on('click', formRegister)
            $('#nav-login').on('click', formLogin)
            $('#nav-home').hide()
            $('#nav-create').hide()
            $('#nav-search').hide()
            $('#nav-logout').hide()
        }
    })
}

function formRegister() {
    $('#main-container').empty()
    html = ''
    html += `
<div class="jumbotron">
<h1 class="text-center">Register</h1>
<form id="form-login">
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="input-name" placeholder="Enter Name" name='name'>
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="input-email" placeholder="Enter Email" name='email'>
    </div>
    <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="input-username" placeholder="Enter Username" name='username'>
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="input-password" placeholder="Password" name='password'>
    </div>
    <div class="form-group">
        <label for="avatar">Link Image for Avatar</label>
        <input type="text" class="form-control" id="input-avatar" placeholder="Avatar" name='avatar_url'>
    </div>
    <div class="form-group">
        <button type="button" class="btn btn-primary" role="button" onclick="registerProcessClient()">Register</button>
    </div>
</form>
</div>
`
    $('#main-container').prepend(html)
}

function registerProcessClient() {
    let $name = $('#input-name').val()
    let $email = $('#input-email').val()
    let $username = $('#input-username').val()
    let $password = $('#input-password').val()
    let $avatar_url = $('#input-avatar').val()

    $.ajax({
        url: "http://localhost:3000/api/auth/register",
        method: "post",
        data: {
            name: $name,
            email: $email,
            username: $username,
            password: $password,
            avatar_url: $avatar_url
        },
        success: function(data) {
            console.log('success');
            Auth.authenticateUser(data)
            console.log(Auth.getToken());
            loadTwit()
            $('#nav-login').hide()
            $('#nav-register').hide()
            $('#nav-home').show()
            $('#nav-create').show()
            $('#nav-search').show()
            $('#nav-logout').show()
            $('#nav-home').on('click', loadTwit)
            $('#nav-create').on('click', formNewTwit)

        },
        error: function(err) {
            console.log('failed');
            formRegister()
            $('#nav-register').on('click', formRegister)
            $('#nav-login').on('click', formLogin)
            $('#nav-home').hide()
            $('#nav-create').hide()
            $('#nav-search').hide()
            $('#nav-logout').hide()
        }
    })
}

function logoutProcess() {
    localStorage.removeItem('token')
    authPage()
}
