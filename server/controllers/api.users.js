'use strict'
const passport = require('passport')
const User = require('../models/api.users')
const jwt = require('jsonwebtoken')

/*
  * @api {get} /api/users
  * @api purpose get all users
  * @apiName allUsers
  * @apiGroup users
  *
  * @apiSuccess show all user's username {String}
*/
let allUsers = (req, res) => {
  User.find({}, (err, users) => {
    if(err) res.status(400).json({'error': `Error: ${err}`})
    if(!users) res.status(404).json({'message': 'Failed to get all users'})
    console.log(`get all users`);
    res.status(200).json(users)
  })
}

/*
  * @api {put} /api/users/:id
  * @api purpose put a user
  * @apiName editUser
  * @apiGroup users
  *
  * @apiSuccess edit a user
*/
let editUser = (req, res) => {
  User.findOneAndUpdate({
    userId : req.params.id
  }, req.body, {
    new: true
  }, (err, updated_user) => {
    if(err) res.status(400).json({'error': 'Error: ${err}'})
    if(!updated_user) res.status(404).json({'message': 'Failed to update user'})

    res.status(200).json(updated_user)
  })
}

/*
  * @api {delete} /api/users/:id
  * @api purpose delete a user
  * @apiName deleteUser
  * @apiGroup users
  *
  * @apiSuccess delete a user
*/
let deleteUser = (req, res) => {
  console.log(`params: ${req.params.id}`);
  User.findOneAndRemove({
    _id : req.params.id
  }, (err, deleted_user) => {
    if(err) res.status(400).json({'error': 'Error: ${err}'})
    if(!deleted_user) res.status(404).json({'message': 'Failed to delete user'})
    console.log(deleted_user);
    res.status(200).json(deleted_user)
  })
}

/*
  * @api {POST} /api/users/register_local
  * @api purpose to register a user
  * @apiName registerLocalUser
  * @apiGroup users
  *
  * @apiSuccess register a user
*/
let registerLocalUser = (req, res, next) => {
  console.log(`register`);
  console.log(req.body);

  User.register(new User({
    username : req.body.username
  }),
  req.body.password,
  (err, new_user) => {
    if(err) res.status(400).json({'error': `Register Error: ${err}`})
    if(!new_user) res.status(404).json({'message': 'Failed to register a user'})

    passport.authenticate('local', {
      successRedirect: '/',
      successFlash: true,
      // failureRedirect: '/register',
      failureFlash: true
    }, (err, user, info) => {
      if(err) return res.status(400).json({'error': `Login Error: ${err}`})
      if(!user) return res.status(404).json({'message': 'Register succeded but sign in falied'})

      return res.status(200).json({
        token: jwt.sign({
          sub: user._id,
          username: user.username
        }, 'secret')
      })
    })(req, res, next)
  })
}

/*
  * @api {POST} /api/users/login
  * @api purpose to login a user
  * @apiName apiSuccess
  * @apiGroup users
  *
  * @apiSuccess login a user
*/
let loginUser = (req, res, next) => {
  passport.authenticate('local',
  {},
  (err, user, info) => {
      console.log(user)
      if(err){
        return res.json(err)
      }else {
        return res.status(200).json({
          token: jwt.sign({
            sub: user._id,
            username: user.username
          }, 'secret')
        })
      }

  })(req, res, next)
}

module.exports = {
  allUsers   : allUsers,
  editUser   : editUser,
  deleteUser : deleteUser,
  registerLocalUser : registerLocalUser,
  loginUser  : loginUser
}
