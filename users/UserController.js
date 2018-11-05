var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// CREATE A NEW USER
router.post('/new', function (req, res) {

});

// GETS ALL USERS
router.get('/', function (req, res) {
  
});


// GET ONE USER BY ID
router.get('/:id', function (req, res) {

});

// DELETE A USER BY ID
router.delete('/:id', function (req, res) {

});

// UPDATE A SINGLE USER
router.post('/:id', function (req, res) {

});

module.exports = router;