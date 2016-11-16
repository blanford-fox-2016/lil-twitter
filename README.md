# Lil Twitter
a mini socmed with twitter-like feature

### Package Installation
* Go to folder `server`
* Install Dependencies
```sh
cd server
npm install
```
### package.json
```json
{
    "name": "server",
    "version": "0.0.0",
    "private": true,
    "scripts": {
        "start": "node ./bin/www",
        "dev": "nodemon ./bin/www",
        "test": "mocha"
    },
    "dependencies": {
        "body-parser": "~1.15.1",
        "cookie-parser": "~1.4.3",
        "cors": "^2.8.1",
        "debug": "~2.2.0",
        "dotenv": "^2.0.0",
        "express": "~4.13.4",
        "jade": "~1.11.0",
        "mongodb": "^2.2.11",
        "mongoose": "^4.6.7",
        "mongoose-sequence": "^3.1.0",
        "morgan": "~1.7.0",
        "serve-favicon": "~2.3.0"
    },
    "devDependencies": {
        "nodemon": "^1.11.0"
    }
}
```

### Routes
Endpoint | Method | Description |
----|-----| ------|
`http://localhost:3000/api/twit` | GET | Show All Twit
`http://localhost:3000/api/twit/:id` | GET | Show Selected Twit
`http://localhost:3000/api/twit` | POST | Create New Twit
`http://localhost:3000/api/twit/:id` | PUT | Edit Twit Task Content
`http://localhost:3000/api/Twit/:id` | DELETE | Delete Selected Twit

### Run Server
* Make sure you are in folder `server`
* Run server
```sh
cd server
npm run dev
```

### Run Client
* Go to folder `client`
* Run live server
* Make sure you have `live-server` installed globally by using `npm install --global live-server`
```sh
cd client
live-server
```
### License
MIT

### Copyright
Copyright 2016 by ahyanarizky
