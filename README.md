# lil-twitter

make little-twitter using node.js, express framework, jQuery, bootstrap & mongodb - mongoose

## How to Run App

### Client

```sh
cd client
npm isntall
bower install
gulp
```

### Server

```sh
cd server
npm isntall
npm run dev
```

## Dependencies

### Client

1. gulp
2. browser-sync
3. bower
4. jQuery
5. bootstrap

### Server

1. express framework
2. nodemon
3. mongodb
4. mongoose
5. cors
6. passport
7. passport-local
8. passport-local-mongoose
9. jsonwebtoken
10. dotenv
11. mocha
12. chai

## Database Configuration

1. db name : db_lil_tweet
2. collections: users & tweetSchema
3. MONGODB_URL: mongodb://localhost/db_lil_tweet

### Model's Schema

```json
const mongoose = require('mongoose')
const Schema = mongoose.Schema
let tweetSchema = new Schema{
  "avatar_url"  : String,
  "content"     : String,
  "username"    : String,
  "hastag"      : [
    "type"      : String
  ]
}, {
  "timestamps": true
}
```

### Expected Model's Result

```json
{
  "tweet" : {
    "avatar_url"  : "URL",
    "content"     : "Content",
    "username"    : "kenduigraha",
    "createdAt"   : "createdAt",
    "updatedAt"   : "updatedAt",
    "hashtag"      : ["hashtag1", "hashtag2", "hashtag3"]
  }
}
```

## API

Default development port and host : http://localhost:3000/
| Routes                        | HTTP   | Description                          |
|-------------------------------|--------|--------------------------------------|
| /api/tweets                   | GET    | recent tweet (maximal 50 tweets)     |
| /api/tweets                   | POST   | process new tweet                    |
| /api/tweets/:id               | DELETE | delete a tweet                       |
| /api/tweets/seed              | POST   | seed data into tweets collection     |
| /api/tweets/                  | DELETE | delete all data in tweets collection |
| /api/tweets/search/:hashtag   | GET    | Search a tweet by hashtag            |

## File's Structure

```json
```

## Package JSON

### Client

```json
```

### Server

```json
```

## Contributor

Ken Duigraha Putra &copy; 2016

## License

MIT
