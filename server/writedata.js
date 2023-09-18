const path = require('path');
const fs = require('fs');
const imageurl = require('./imageurldata.json');
const http = require('node:http');
const express = require('express');
const app = express();
require('dotenv').config();

const bodyparser = require('body-parser');

const PORT = process.env.PORT || undefined;

app.use(bodyparser.json());
const pathFile = path.join(__dirname, './/', 'writedata.js');

console.log(pathFile);

app.get('/imageurldata.json', (req, res) => {
    fs.readFile(pathFile, (err, data) => {
         if (err) {
            return res.status(500).json({ error: 'Unable to read data' });
          }
      
          try {
            const jsonData = JSON.parse(data);
            res.writeHead(200, {'Content-Type': 'application/json'});

            res.json(jsonData);
            res.write(JSON.stringify(jsonData));
            res.end()
          } catch (parseError) {
            return res.end(JSON.stringify({title: 'Failed', message: 'No data'}));
          }
    })
})
app.post('/imageurldata.json', (req, res) => {
    const newData = req.body;
    // Read existing data from the JSON file
    fs.readFile(pathFile, 'utf-8', (err, data) => {
      if (err) {
        return res.end(JSON.stringify({title: 'Error 404', message: 'Cant post data'}));
      }
      const jsonData = JSON.parse(data);
  
      // Add the new data to the array
      jsonData.push(newData);
  
      // Write the updated data back to the JSON file
      fs.writeFile(pathFile, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          return res.end(JSON.stringify({title: 'Error', message: 'Cant add data'}));
        }
        res.json({ message: 'Data added successfully' });
      });
    });
  });


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})

