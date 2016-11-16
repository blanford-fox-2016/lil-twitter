//DATA WITH MONGOOSE MODEL

const House = require('../models/houses')

//CONTROLLING

module.exports = {
  //get all
  getDatas: (req, res) => {
    House.find({}, (err, data) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(404).json({ 'message': 'Failed to get all' })
      res.status(200).json(data)
    })
  },

  //post one
  postData: (req, res) => {
    const house = {
      name: req.body.name,
      price: req.body.price,
      rooms: req.body.rooms,
      address: req.body.address,
      image: req.body.image
    }
    House.create(house, (err, data) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(304).json({ 'message': 'Failed to post' })
      res.status(200).json({'message': 'Add data successful',data})
    })
  },

  //get one
  getData: (req, res) => {
    House.findOne({
      _id: req.params.id
    }, (err, data) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(404).json({ 'message': 'Failed to get' })
      res.status(200).json(data)
    })
  },

  //delete one
  deleteData: (req, res) => {
    House.findOneAndRemove({
      _id: req.params.id
    }, (err, data) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(404).json({ 'message': 'No data found' })
      res.status(200).json({ 'message': `Data ${req.params.id} has been deleted` })
    })
  },

  //update one
  updateData: (req, res) => {
    House.findOneAndUpdate({
      _id: req.params.id
    }, {
      name: req.body.name,
      price: req.body.price,
      rooms: req.body.rooms,
      address: req.body.address,
      image: req.body.image
    }, {
      new: true
      //use below to add new if data doesn't exist
      //upsert: true 
    }, (err, data) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(404).json({ 'message': 'Failed to update' })
      res.status(200).json({'message': 'Edit data successful',data})
    })
  }
}
