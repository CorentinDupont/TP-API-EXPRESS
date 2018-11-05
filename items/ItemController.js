const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const ENTITY_NAME = "item";
const ENTITY_NAME_PLURAL = "items";
const ENTITY_FILE_PATH = "items/items.json"

// CREATE
router.post('/', function (req, response) {

  fs.readFile(ENTITY_FILE_PATH, 'utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {  

      let obj = JSON.parse(data);
      const newObject = {id:obj[ENTITY_NAME_PLURAL].length+1, name:req.body.label, user:req.body.image, items:req.body.description}
      obj[ENTITY_NAME_PLURAL].push(newObject);

      console.log(obj[ENTITY_NAME_PLURAL]);

      json = JSON.stringify(obj);
      fs.writeFile(ENTITY_FILE_PATH, json, 'utf8', (err, res) => {
        if(err){
          console.error(err);
        } else {
          response.status(200).send(`${ENTITY_NAME} ${JSON.stringify(newObject)} has been successfully registered !`);
        }
      });
    }
  });
});

// GET ONE BY ID
router.get('/:id', function (req, response) {
  fs.readFile(ENTITY_FILE_PATH, 'utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {  
      const obj = JSON.parse(data);
      const index = obj[ENTITY_NAME_PLURAL].findIndex(el=> (el.id === Number(req.params.id)));
      const selectedObject = obj[ENTITY_NAME_PLURAL][index];
      response.status(200).send(selectedObject);
    }
  });
});

// DELETE BY ID
router.delete('/:id', function (req, response) {
  fs.readFile(ENTITY_FILE_PATH, 'utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {  
      const obj = JSON.parse(data);
      const index = obj[ENTITY_NAME_PLURAL].findIndex(el=> (el.id === Number(req.params.id)));
      const removedObject = obj[ENTITY_NAME_PLURAL][index];
      obj[ENTITY_NAME_PLURAL].splice(index, 1);

      json = JSON.stringify(obj);
      fs.writeFile(ENTITY_FILE_PATH, json, 'utf8', (err, res) => {
        if(err){
          console.error(err);
        } else {
          response.status(200).send(`${ENTITY_NAME} ${JSON.stringify(removedObject)} has been successfully deleted !`);
        }
      });
    }
  });
});

// UPDATE ONE BY ID
router.put('/:id', function (req, response) {
  fs.readFile(ENTITY_FILE_PATH, 'utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {  
      const obj = JSON.parse(data);
      const index = obj[ENTITY_NAME_PLURAL].findIndex(el=> (el.id === Number(req.params.id)));
      const objectToUpdate = obj[ENTITY_NAME_PLURAL][index];
      const updatedObject =  {id:req.params.id, name:req.body.label, user:req.body.image, items:req.body.description}
      obj[ENTITY_NAME_PLURAL][index] = updatedObject;

      json = JSON.stringify(obj);
      fs.writeFile(ENTITY_FILE_PATH, json, 'utf8', (err, res) => {
        if(err){
          console.error(err);
        } else {
          response.status(200).send(`${ENTITY_NAME} ${JSON.stringify(objectToUpdate)} has been successfully updated to ${JSON.stringify(updatedObject)}!`);
        }
      });
    }
  });
});

// GETS ALL
router.get('/', function (req, response) {
  fs.readFile(ENTITY_FILE_PATH, 'utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {  

      let obj = JSON.parse(data);
      response.status(200).send(obj[ENTITY_NAME_PLURAL]);
    }
  });
});

module.exports = router;