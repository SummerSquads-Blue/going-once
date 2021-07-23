const Item = require('../models/item');

module.exports = {
  index,
  tagIndex
};

function index(req, res) {
  Item.find({}).then(items => res.json(items))
}

function tagIndex(req, res) {
    Item.find({}).then(items => res.json(items))
}

function findItemById(req, res) {
    Item.findById({})
}