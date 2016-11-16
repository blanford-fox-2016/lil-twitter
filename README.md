# lil-twitter (mpritter by tamatamvan)

Mpritter is a simple micro-blogging like twitter, it's really simple and easy to use. Mpritter was built with Node.JS and Express.js. It use MongoDB as the database and mongoose as the ODM.

### API References

| Endpoint | Method | Action |
|----------|--------|--------|
| /api/tweets | GET | Get all recent tweets |
| /api/tweets | POST | Post a new tweet |
| /api/tweets/:id | DELETE | Delete a single tweet based on id |

### Auth Route
| Endpoint | Method | Action |
|----------|--------|--------|
| /auth/login | POST | User login using username and password |
| /auth/register | POST | New user regisration |


### packages.json server
```
{
  "name": "server",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.15.1",
    "cookie-parser": "~1.4.3",
    "cors": "^2.8.1",
    "debug": "~2.2.0",
    "express": "~4.13.4",
    "express-jwt": "^5.1.0",
    "jsonwebtoken": "^7.1.9",
    "mongodb": "^2.2.11",
    "mongoose": "^4.6.8",
    "morgan": "~1.7.0",
    "passport": "^0.3.2",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^4.0.0",
    "serve-favicon": "~2.3.0",
    "socket.io": "^1.5.1"
  }
}
```

### File Structures

```
.
├── README.md
├── client
│   ├── css
│   │   └── style.css
│   ├── index.html
│   ├── js
│   │   └── main.js
│   └── package.json
└── server
    ├── app.js
    ├── bin
    │   └── www
    ├── controllers
    │   ├── apiTweetsController.js
    │   └── authController.js
    ├── models
    │   ├── Tweets.js
    │   └── Users.js
    ├── package.json
    └── routes
        ├── apiTweets.js
        ├── auth.js
        └── index.js
```

### Screenhots
![Timeline](http://i.imgur.com/LGsZ7jC.png)
![Post New Mprit](http://i.imgur.com/QX6oC58.png)
![Delete Mprit](http://i.imgur.com/ShFnoZW.png)
