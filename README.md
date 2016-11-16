# lil-twitter

## Install Global Package

```
npm install -g nodemon liveserver express-generator bower
```

## Run Server

```
npm install
npm start
```

## Run Client

```
bower install
live-server
```

## Models

### Twit

```
const Twit = new Schema({
    avatar_url: {
        type: String
    },
    content: {
        type: String
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    },
    username: {
        type: String
    },
    hashtag_names: []
})
```

## Routing

### API Twit

| Endpoint                  | HTTP      | Description             |
| ----------                | -----     | ------------            |
| api/twit/seed             | GET       | Create Dummy Twit Data  |
| api/twit/recent           | GET       | Get Recent Twit         |
| api/twit/search/:hashtag  | GET       | Get Twit By Hastag      |
| api/twit                  | POST      | Create Twit             |
| api/twit                  | DELETE    | Delete All Twit         |
| api/twit/:twitId          | DELETE    | Delete Twit By twitId   |