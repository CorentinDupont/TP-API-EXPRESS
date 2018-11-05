var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// CREATE A NEW LIST
router.post('/new', function (req, res) {

});

// GETS ALL LISTS
router.get('/', function (req, res) {
  
});


// GET ONE LIST BY ID
router.get('/:id', function (req, res) {

});

// DELETE A LIST BY ID
router.delete('/:id', function (req, res) {

});

// UPDATE A SINGLE LIST
router.post('/:id', function (req, res) {

});

module.exports = router;