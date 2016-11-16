'use strict'

const Twit = require('../models/twit.model')

module.exports = {
    getRecentTwit: function(req, res) {
        Twit.find({}).sort({ twitId: 'desc' }).exec(function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        });
    },
    popularHashtag: function(req, res) {
        Twit.find({
            hashtag: req.query.q
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })

    },
    popularRiver: function(req, res) {
        Twit.find({})
    },
    search: function(req, res) {
        Twit.find({ hashtag: req.query.hashtag }).
        limit(10).
        exec(function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                if (data.length == 0) {
                    res.json({ message: `No data found !` })
                } else {
                    res.json(data)
                }
            }
        });
    },
    createNewTwit: function(req, res) {
        console.log('body >>>>>>>', req.body);

        let tweet = req.body.content
        let arrHash = tweet.split(' ')
        let storage = []
        for (var i = 0; i < arrHash.length; i++) {
            if (arrHash[i][0] == '#') {
                storage.push(arrHash[i].slice(1))
            }
        }
        console.log('storage>>>>>>>>>', storage);

        Twit.create({
            avatar_url: req.body.avatar_url,
            content: req.body.content,
            username: req.body.username,
            name: req.body.name,
            hashtag: storage
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    deleteTwit: function(req, res) {
        Twit.remove({
            twitId: req.params.id
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    }
}
