const Twit = require('../models/twit')

module.exports = {
    twitSeed: (req, res) => {
        const twit = [
            {
                avatar_url: 'http://www.littlestarsplayschool.com/images/1466407606547378dummy.png',
                content: 'content 1',
                username: 'andi',
                hashtag_names: ['andi', 'content']
            },
            {
                avatar_url: 'http://www.littlestarsplayschool.com/images/1466407606547378dummy.png',
                content: 'content 2',
                username: 'budi',
                hashtag_names: ['budi', 'content']
            },
            {
                avatar_url: 'http://www.littlestarsplayschool.com/images/1466407606547378dummy.png',
                content: 'content 3',
                username: 'cindy',
                hashtag_names: ['cindy', 'content']
            },
            {
                avatar_url: 'http://www.littlestarsplayschool.com/images/1466407606547378dummy.png',
                content: 'content 4',
                username: 'doni',
                hashtag_names: ['doni', 'content']
            },
            {
                avatar_url: 'http://www.littlestarsplayschool.com/images/1466407606547378dummy.png',
                content: 'content 5',
                username: 'eri',
                hashtag_names: ['eri', 'content']
            }
        ]

        Twit.create(twit, (err, data) => {
            if (err) res.json(err)
            else res.json(data)
        })
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
            username: 'dharmadi93',
            hashtag_names: ['apa', 'aja']
        }

        Twit.create(twit, (err, data) => {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    deleteAllTwit: (req, res) => {
        Twit.remove((err) => {
            if (err) res.json(err)
            else res.json("All Twit Deleted")
        })
    },

    deleteTwitById: (req, res) => {

    }
}