const fs = require('fs');

function create(entityName, entityNamePlural, filePath, request, response ){
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {  
      let obj = JSON.parse(data);
      const newObject = {id:obj[entityNamePlural].length+1, ...request.body}
      obj[entityNamePlural].push(newObject);
  
      json = JSON.stringify(obj);
      fs.writeFile(filePath, json, 'utf8', (err, res) => {
        if(err){
          console.error(err);
        } else {
          response.status(200).send(`${entityName} ${JSON.stringify(newObject)} has been successfully registered !`);
        }
      });
    }
  });
}

function select(entityName, entityNamePlural, filePath, request, response ){
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {  
      const obj = JSON.parse(data);
      const index = obj[entityNamePlural].findIndex(el=> (el.id === Number(request.params.id)));
      const selectedObject = obj[entityNamePlural][index];
      response.status(200).send(selectedObject);
    }
  });
}

function delet(entityName, entityNamePlural, filePath, request, response){
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {  
      const obj = JSON.parse(data);
      const index = obj[entityNamePlural].findIndex(el=> (el.id === Number(request.params.id)));
      const selectedObject = obj[entityNamePlural][index];
      response.status(200).send(selectedObject);
    }
  });
}
 
function update(entityName, entityNamePlural, filePath, request, response){
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {  
      const obj = JSON.parse(data);
      const index = obj[entityNamePlural].findIndex(el=> (el.id === Number(req.params.id)));
      const objectToUpdate = obj[entityNamePlural][index];
      const updatedObject =  {id:req.params.id, ...request.body};
      obj[entityNamePlural][index] = updatedObject;

      json = JSON.stringify(obj);
      fs.writeFile(ENTITY_FILE_PATH, json, 'utf8', (err, res) => {
        if(err){
          console.error(err);
        } else {
          response.status(200).send(`${entityName} ${JSON.stringify(objectToUpdate)} has been successfully updated to ${JSON.stringify(updatedObject)}!`);
        }
      });
    }
  });
}

function selectAll(entityName, entityNamePlural, filePath, request, response){
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {  

      let obj = JSON.parse(data);
      response.status(200).send(obj[entityNamePlural]);
    }
  });
}

module.exports = {create, select, delet, update, selectAll}