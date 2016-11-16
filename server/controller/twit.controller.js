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
        Twit.create({
            avatar_url: 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/38/38559df760a478e153188b932d070477ae94d7c6_full.jpg',
            content: req.body.content,
            username: 'felixthebluecat',
            name: 'Felix',
            hashtag: req.body.hashtag
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
