'use strict'
const User = require('../models/auth.model')
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = {
    registerProcess: function(req, res) {
        User.register({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username
        }, req.body.password, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                passport.authenticate('local')(req, res, function() {
                    req.session.save(function(err, next) {
                        if (err) {
                            res.json({ message: `Registration failed : ${err}` })
                        } else {
                            var token = jwt.sign({ username: data.username }, 'secret', { expiresIn: 1440 }) //1 day
                            res.json({
                                success: true,
                                message: `Registration Success`,
                                token: token
                            })
                        }
                    })
                })
            }
        })
    },
    loginProcess: function(req, res) {
        passport.authenticate('local')(req, res, function() {
            req.session.save(function(err, next) {
                if (err) {
                    res.json({ message: `Login failed : ${err}` })
                } else {
                    var token = jwt.sign({ username: data.username }, 'secret', { expiresIn: 1440 }) //1 day
                    res.json({
                        success: true,
                        message: `Registration Success`,
                        token: token
                    })
                }
            })
        })
    }
}
