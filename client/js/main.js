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

    },
    deleteMprit: function() {
      
    }
  }
})

app.loadMprits();
