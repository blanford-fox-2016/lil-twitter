var app = new Vue({
  el: '#app',
  data: {
    authenticated: false,
    mprits: [],
    authmode: 'up',
    //MPRIT
    name: '',
    username: '',
    ava: '',
    content: '',
    email: '',
    password: '',

    ses_name: '',
    ses_username: '',
    ses_ava: '',
    token: ''
  },
  methods: {
    setauthin: function() {
      app.authmode = 'in'
    },
    setauthup: function() {
      app.authmode = 'up'
    },
    loadMprits : function() {
      axios.get('http://localhost:3000/api/tweets', {})
      .then(function (response) {
        app.mprits = response.data.reverse();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    postNewMprit: function() {
      axios.post('http://localhost:3000/api/tweets',{
        name: app.ses_name,
        username: app.ses_username,
        avatar_url: app.ses_ava,
        content: app.content
      })
      .then(function (response) {
        app.mprits.unshift(response.data)
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    deleteMprit: function(id) {
      axios.delete('http://localhost:3000/api/tweets/'+id, {})
      .then(function(response) {
        app.loadMprits()
      })
      .catch(function(error) {
        console.log(error);
      })
    },

    register: function(id) {
      axios.post('http://localhost:3000/auth/register', {
        name: app.name,
        username: app.username,
        email: app.email,
        password: app.password,
        avatar_url: app.ava
      })
      .then(function(response) {
        alert(response)
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    login: function() {
      axios.post('http://localhost:3000/auth/login', {
        username: app.username,
        password: app.password
      })
      .then(function(response) {
        console.log(JSON.stringify(response));
        // app.authenticated = localStorage.setItem('authenticated', true)
        // app.token = localStorage.setItem('token', response.data.token)
        // app.ses_username = localStorage.setItem('ses_username', response.data.username)
        // app.ses_name = localStorage.setItem('ses_name', response.data.name)
        // app.ses_ava = localStorage.setItem('ses_ava', response.data.avatar_url)
        localStorage.setItem('authenticated', true)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('ses_username', response.data.username)
        localStorage.setItem('ses_name', response.data.name)
        localStorage.setItem('ses_ava', response.data.avatar_url)
        app.checkAuth()
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    logout: function() {
      localStorage.removeItem('token')
      localStorage.removeItem('ses_username')
      localStorage.removeItem('ses_name')
      localStorage.removeItem('ses_ava')
      localStorage.removeItem('authenticated')

      app.authenticated = false;
      app.ses_name = '';
      app.ses_username = '';
      app.ses_ava = '';
      app.token = '';
    },
    checkAuth: function() {
      app.authenticated = localStorage.getItem('authenticated')
      app.token = localStorage.getItem('token')
      app.ses_username = localStorage.getItem('ses_username')
      app.ses_name = localStorage.getItem('ses_name')
      app.ses_ava = localStorage.getItem('ses_ava')
    }
  }
})

setTimeout(function(){app.loadMprits()}, 1000);
app.checkAuth();
