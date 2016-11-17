var app = new Vue({
  el: '#app',
  data: {
    tweets: [],
    name: '',
    username: '',
    avatar_url: '',
    content: '',
    top:'',
    hastags:''
  },
  methods: {
    list: function() {
      axios
        .get('http://localhost:3000/api/tweets/recents')
        .then((tweet) => {
          app.tweets = tweet.data
          console.log(tweet)})
        .catch((err) => console.log(error))
    },
    postTweet: function()  {
      axios
      .post('http://localhost:3000/api/tweets',{
        name: app.name,
        username: app.username,
        avatar_url: app.avatar_url,
        content: app.content,
        hastags: app.hastags,
      })
      .then((tweet) => {app.tweets.unshift(tweet.data)})
      .catch(function(error) {
        console.log(error);
      })
    },
    deleteTweet: function(id) {
        axios
          .get("http://localhost:3000/tweets/search/"+hastag)
          .then((tweet) => {
            app.top = tweet.data
          })
          .catch((err) => console.log(err))
    }
  }
})

app.list();
