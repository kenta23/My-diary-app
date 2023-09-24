const crypto = require('crypto');
const fs = require('fs/promises');
const writeFile = require('./writedata');
const bodyparser = require('./bodyparser');


function getData (req,res) {
      try {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(req.data)); 
        res.end();
      }  
      catch(err) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({title: '404', message: 'Not Found'}));
        console.log(err)
      }
}

async function postData (req, res) {
    try {
        const body = await bodyparser(req);
        body.id = crypto.randomUUID();
        req.data.push(body);
        writeFile(req.data);
        res.writeHead(201, { 'Content-Type': 'application/json'});
        res.write(JSON.stringify(req.data)); //show data
        res.end();
        }
        catch(err) { 
           throw err;
           res.writeHead(404, {'Content-Type': 'application/json'});
           res.end(JSON.stringify({title: '404', message: 'Cant create New movie'}));
        }
}

module.exports = {
    getData: getData,
    postData: postData, 
}
