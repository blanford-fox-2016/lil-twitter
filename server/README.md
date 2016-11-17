# Lil Tweet


## Technology Used in server side

- Nodejs
- Express
- Mongodb
- Mongoose


## Model

### User
```js
const tweetSchema = new Schema ({
  avatar_url : {
    type: String,
    required: true
  },
  content : {
    type: String,
    required: true
  },
  created_at : {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  updated_at: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hastag_names: [{
    type: String
  }]
})
```


## API Routes

####

| Method   |           End Point                  |      Description       |
|----------|:------------------------------------:|-----------------------:|
| GET      |  /api/tweets/recents                 | get all tweets         |
| GET      |  /api/tweets/search/:hastag          | get all tweets with hastag       |
| POST     |  /api/tweets                         | Post a single tweet    |
| GET      |  /api/tweets/hastags/popular         | Find the top ten tweet |


## License
MIT
