const fs = require('fs');
const mongoDbClient = require('./mongo.connector');
const ObjectID = require('mongodb').ObjectID;

function create(entityName, entityNamePlural, filePath, request, response, fields){
  const check = checkBody(request.body, fields);
  if (check.ok) {
    const newObject = request.body;
    mongoDbClient.db.collection(entityNamePlural).save(newObject, (err, result) => {
      if (err) return console.log(err)
  
      console.log(`${newObject} was correctly saved to database`)
      response.status(200).send(`${JSON.stringify(newObject)} was correctly saved to database`)
    })
  } else {
    response.send(`additional keys : ${check.additionalKeys}, missing keys : ${check.missingKeys}`);
  }
}

function select(entityName, entityNamePlural, filePath, request, response){
  mongoDbClient.db.collection(entityNamePlural).findOne({_id:ObjectID(request.params.id)}, (err, result) => {
    if (err) throw err;
    console.log("1 document returned");
    response.status(200).send(result);
  });
}

function delet(entityName, entityNamePlural, filePath, request, response){
  mongoDbClient.db.collection(entityNamePlural).deleteOne({_id:ObjectID(request.params.id)}, (err, obj) => {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(200).send(`document with id ${request.params.id} correctly deleted`);
  });
}
 
function update(entityName, entityNamePlural, filePath, request, response, fields){
  const check = checkBody(request.body, fields);
  if(check.ok){
    const updatedUser = request.body;

    mongoDbClient.db.collection(entityNamePlural).updateOne({ _id:ObjectID(request.params.id) }, { $set:updatedUser }, (err, result) => {
      if (err) throw err;
      console.log("1 document updated");
      response.status(200).send(`document ${JSON.stringify(updatedUser)} with id ${request.params.id} correctly updated`);
    });


  }else{
    response.send(`additional keys : ${check.additionalKeys}, missing keys : ${check.missingKeys}`);
  }
  
}

function selectAll(entityName, entityNamePlural, filePath, request, response){
  mongoDbClient.db.collection(entityNamePlural).find().toArray( (err, results) => {
    console.log(results)
    response.status(200).send(results);
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