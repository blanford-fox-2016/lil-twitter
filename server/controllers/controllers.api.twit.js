const Twit = require('../models/twit')

module.exports = {
    twitSeed: (req, res) => {

    },

    getTwitRecent: (req, res) => {

    },

    getTwitById: (req, res) => {

    },

    getTwitByHashtag: (req, res) => {

    },

    createTwit: (req, res) => {
        const twit = {
            avatar_url: 'http://www.littlestarsplayschool.com/images/1466407606547378dummy.png',
            content: req.body.content,
            username: 'dharmadi93'
        }

        Twit.create(twit, (err, data) => {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    deleteAllTwit: (req, res) => {

    },

    deleteTwitById: (req, res) => {

    }
}