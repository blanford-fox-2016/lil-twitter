var app = new Vue({
  el: '#app',
  data: {
    tweets: [],
    name: '',
    username: '',
    avatar_url: '',
    content: '',
  },
  methods: {
    list: function() {
      axios
        .get('http://localhost:3000/api/tweets/recents')
        .then((tweet) => {
          app.tweets = tweet.data
          console.log(tweet)})
        .catch((err) => console.log(error))
    }
    // postTweet: function()  {
    //   axios
    //   .post('http://localhost:3000/api/tweets',{
    //     name: app.name,
    //     username: app.username,
    //     avatar_url: app.avatar_url,
    //     content: app.content
    //   })
    //   .then(function (tweet) {
    //     app.mprits.unshift(tweet.data)
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   })
    // },
    // }



  }
})

app.list();
// app.postTweet();
