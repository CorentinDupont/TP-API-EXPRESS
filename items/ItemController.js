var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// CREATE A NEW ITEM
router.post('/new', function (req, res) {

});

// GETS ALL ITEMS
router.get('/', function (req, res) {
  
});


// GET ONE ITEM BY ID
router.get('/:id', function (req, res) {

});

// DELETE A ITEM BY ID
router.delete('/:id', function (req, res) {

});

// UPDATE A SINGLE ITEM
router.post('/:id', function (req, res) {

});

module.exports = router;