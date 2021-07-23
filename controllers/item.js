const Item = require('../models/item');

module.exports = {
  index,
  findItemById
};

function index(req, res) {
  Item.find({}).then(items => res.json(items))
}

// function tagIndex(req, res) {
//     Item.find({ tag: req.tag }).then(items => res.json(items))
// }

function findItemById(req, res) {
    Item.findById(req.id).then(item => res.json(item))
}

