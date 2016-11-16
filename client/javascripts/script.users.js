const Auth = {
    authenticateUser: (data) => {
        if (data.status === 'error') console.log('No account:', data)
        Auth.deauthenticateUser()
        console.log('data:', data)
        localStorage.setItem('token', data.token)
        console.log('token:', localStorage.getItem('token'))
        window.location = '/'
    },
    isUserAuthenticated: () => {
        console.log('token:', localStorage.getItem('token'))
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

function signIn(e) {
    e.preventDefault()

    var data = {
        username: $('#sign-in-form input[name=username]').val(),
        password: $('#sign-in-form input[name=password]').val()
    }
    $.post({
        url: 'http://localhost:3000/api/users/login',
        data: data,
        success: function(data) {
            //console.log(data);
            localStorage.setItem('token', data.token)
                //console.log(localStorage.getItem('token'));
                //console.log(Auth.getUser().username);
            if (Auth.getUser().username) {
                window.location = 'home.html'
            } else {
                alert('Login details are invalid!')
                window.location = 'index.html'
                localStorage.removeItem('token')
            }
        }
    })
}

function signUp(e) {
    e.preventDefault()

    var data = {
        username: $('#sign-up-form input[name=username]').val(),
        email: $('#sign-up-form input[name=email]').val(),
        password: $('#sign-up-form input[name=password]').val()
    }
    $.post({
        url: 'http://localhost:3000/api/users',
        data: data,
        success: function(data) {
            //console.log(data);
            localStorage.setItem('token', data.token)
            //console.log(localStorage.getItem('token'));
            window.location = 'home.html'
        }
    })
}

function logoutUser() {
    localStorage.removeItem('token')
    console.log(localStorage.getItem('token'));
    window.location = 'index.html'
}

$(function() {

})
