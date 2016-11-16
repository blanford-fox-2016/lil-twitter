var app = new Vue({
  el: '#app',
  data: {
    mprits: [],
    name: '',
    username: '',
    ava: '',
    content: ''
  },
  methods: {
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
        name: app.name,
        username: app.username,
        avatar_url: app.ava,
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
      axios.delete('http://localhost/api/tweets/'+id, {})
      .then(function(response) {
        app.loadMprits()
      })
      .catch(function(error) {
        console.log(error);
      })
    }
  }
})

app.loadMprits();
