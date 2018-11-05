const fs = require('fs');

function create(entityName, entityNamePlural, filePath, request, response, fields){
  const check = checkBody(request.body, fields);
  if (check.ok) {
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
  } else {
    response.send(`additional keys : ${check.additionalKeys}, missing keys : ${check.missingKeys}`);
  }
}

function select(entityName, entityNamePlural, filePath, request, response){
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
      const removedObject = obj[entityNamePlural][index];
      obj[entityNamePlural].splice(index, 1);

      json = JSON.stringify(obj);
      fs.writeFile(filePath, json, 'utf8', (err, res) => {
        if(err){
          console.error(err);
        } else {
          response.status(200).send(`${entityName} ${JSON.stringify(removedObject)} has been successfully deleted !`);
        }
      });
    }
  });
}
 
function update(entityName, entityNamePlural, filePath, request, response, fields){

  const check = checkBody(request.body, fields);
  if(check.ok){
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err){
          console.log(err);
      } else {  
        const obj = JSON.parse(data);
        const index = obj[entityNamePlural].findIndex(el=> (el.id === Number(request.params.id)));
        const objectToUpdate = obj[entityNamePlural][index];
        const updatedObject =  {id:request.params.id, ...request.body};
        obj[entityNamePlural][index] = updatedObject;
  
        json = JSON.stringify(obj);
        fs.writeFile(filePath, json, 'utf8', (err, res) => {
          if(err){
            console.error(err);
          } else {
            response.status(200).send(`${entityName} ${JSON.stringify(objectToUpdate)} has been successfully updated to ${JSON.stringify(updatedObject)}!`);
          }
        });
      }
    });
  }else{
    response.send(`additional keys : ${check.additionalKeys}, missing keys : ${check.missingKeys}`);
  }
  
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

function checkBody(body, necessaryFields){
  const bodyKeys = Object.keys(body);

  // find additional and missing keys compareed to the necessary field
  const additionalKeys = bodyKeys.filter(key => (necessaryFields.indexOf(key) === -1));
  const missingKeys = necessaryFields.filter(field => (bodyKeys.indexOf(field) === -1));

  console.log(additionalKeys);
  console.log(missingKeys);

  if(!additionalKeys.length && !missingKeys.length){
    console.log("body is okay");
    return({ok:true})
  }else{
    console.log("body is not valid");
    return({ok:false, additionalKeys, missingKeys});
  }
}

module.exports = {create, select, delet, update, selectAll}