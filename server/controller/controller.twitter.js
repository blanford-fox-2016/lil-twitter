'use strict'
const express = require('express');
const mongoose = require('mongoose');
const Twitter = require('../models/models.twitter');




//===============================
// function to splice tag ======
//=============================
let splicetag = (string) => {
  let preresult = string.split('#')
  preresult.splice(0,1)
  return preresult
}

//====================================================================
// function to findout maximum properties tag in array of object ====
//==================================================================
// let maximum = (obj) => {
//   return  max = Object.keys(obj).reduce(function(m, k){ return obj[k] > m ? obj[k] : m }, -Infinity);
// }

//===================
// create twitt ====
//=================

let newTweets = (req,res) => {
////////////////////
console.log(req.body.tag);
  let tweets = new Twitter({
    user             : "@gielantang",
    profile_picture  : "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAUWAAAAJDE2Y2JhNGM3LWFmYTMtNDAyNi04YTRlLTgxMGUwZjU1MGFiNA.jpg",
    content          : req.body.content,
    hashtag           :[]
  });

  // push into hashtag every tag ('#') in content

  for (let i =0 ; i < splicetag(req.body.content).length ;i++) {
    tweets.hashtag.push({hastag_name:splicetag(req.body.content)[i]});
  }
  tweets.save((err,tweets) => {
      if (err) {
        res.status(404).json({message:" Failed to post new tweets"})
      }
      else {
        console.log("berhasil");
        res.status(200).json(tweets)
      }
    })
///////////////////
}


//=======================
// show list twitts ====
//=====================


let showList = (req,res) => {
/////////////////////////////

  Twitter.find({}, (err, tweets) => {
    if (err) {
      res.status(404).json({message:" Failed to post new tweets"})
    }
    else {
      res.status(200).json(tweets)
    }
  })

////////////////////////////
}



//=======================
// hashtag list    ====
//=====================


let hashtag = (req,res) => {
////////////////////////////

  Twitter.findOne({hashtag:req.params.hashtag}, (err, tweets) => {
    if (err) {
      res.status(404).json({message:" Failed to post new tweets"})
    }
    else {
      res.status(200).json(tweets)
    }

  })

////////////////////////////
}


//=================
//  popular
//=================

let popular =  (req,res) => {
/////////////////////////////

  Twitter.find({hastag_name: $exist},(err,tweets) => {
    if (err) {
      res.status(404).json({message:" Failed to post new tweets"})
    }
    else {

    }
  })

////////////////////////////
}

module.exports= {

  newTweets: newTweets,
  showList : showList,
  hashtag  : hashtag,
  popular  : popular


}
