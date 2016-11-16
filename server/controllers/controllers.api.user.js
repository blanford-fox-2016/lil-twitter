const User = require('../models/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = {
    seedUser: function (req, res) {
        const dataUser = [
            {
                username: 'admin',
                password: 'admin',
                photo_avatar: 'https://demo.bookstackapp.com/user_avatar.png'
            },
            {
                username: 'dharmadi',
                password: 'dharmadi',
                photo_avatar: 'https://demo.bookstackapp.com/user_avatar.png'
            },
            {
                username: 'yoni',
                password: 'yoni',
                photo_avatar: 'https://demo.bookstackapp.com/user_avatar.png'
            }
        ]

        var dataTemp = []

        for (let i = 0; i < dataUser.length; i++) {
            User.register(new User({
                username: dataUser[i].username,
                photo_avatar: dataUser[i].photo_avatar
            }), dataUser[i].password, function (err, data) {
                if (err) res.json(err)
                else {
                    passport.authenticate('local')(req, res, function () {
                        req.session.save(function (err) {
                            if (err) res.json(err)
                            else dataTemp.push(data)
                        })
                    })
                }
            })
        }

        res.json("user seeded")
    },

    getUser: function (req, res) {
        User.find(function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    getUserByUserId: function (req, res) {
        User.findOne({
            _id: req.params.userId
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    localRegisterUser: function (req, res) {
        User.register(new User({
            username: req.body.username,
            photo_avatar: req.body.photo_avatar
        }), req.body.password, function (err, data) {
            if (err) res.json(err)
            else {
                passport.authenticate('local')(req, res, function () {
                    req.session.save(function (err) {
                        if (err) res.json(err)
                        else {
                            return res.status(200).json({
                                token: jwt.sign({
                                    userId: data._id,
                                    username: data.username,
                                    photo_avatar: data.photo_avatar
                                }, process.env.SESSION_SECRET)
                            })
                        }
                    })
                })
            }
        })
    },

    deleteUserByUserId: function (req, res) {
        User.findOneAndRemove({
            _id: req.params.userId
        }, function (err, data) {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    deleteAllUsers: function (req, res) {
        User.remove({}, function (err, data) {
            if (err) res.json(err)
            else res.json("All users deleted")
        })
    },

    loginUser: function (req, res, next) {

        passport.authenticate('local', {

        }, function (err, user, info) {
            if (err) return res.json(err)
            else if (!user) return res.status(400).json('No User Found')
            else {
                return res.status(200).json({
                    token: jwt.sign({
                        userId: user._id,
                        username: user.username,
                        photo_avatar: user.photo_avatar
                    }, process.env.SESSION_SECRET)
                })
            }

        })(req, res, next)
    }

}