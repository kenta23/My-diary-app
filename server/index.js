const express = require('express');
const app = express();
const path = require('path');
const imageData = require('./imageurldata.json');
const { getData, postData } = require('./requestType');
const fs = require('fs');
const router = express.Router();
const cors = require('cors');


const filepath = path.join(__dirname, 'imageurldata.json');


const PORT = process.env.PORT || 3000;

//body parsing middleware
app.use(express.json()); //body parser / to read the data after being post to the json file
app.use(cors());

app.get('/api/images', (req, res, next) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            // Handle any error that occurs during file reading
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Error reading file' });
            return;
        }

        try {
            // Parse the JSON data
            const jsonData = JSON.parse(data);
            
            // Send the JSON data as the response
            //res.status(200).json(jsonData);
            res.writeHead(200, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify(jsonData, null, 2));
        } catch (parseError) {
            // Handle JSON parsing errors
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Error parsing JSON' });
        }

       
    })

  
})   

app.post('/api/images', (req, res, next) => {
    // Parse data from the request body
    let newData = req.body;

    // Read the existing JSON data from the file
    fs.readFile(filepath, 'utf-8', (readErr, data) => {
        if (readErr) {
            console.error('Error reading file:', readErr);
            res.status(500).json({ error: 'Error reading file' });
            return;
        }

        try {
            // Parse the existing JSON data
            const existingData = JSON.parse(data);

            // Append new data
            existingData.push(newData)
            // Write the updated data back to the file
            fs.writeFile(filepath, JSON.stringify(existingData, null, 2), (err) => {
                if(err) {
                    console.error('Error writing file:', writeErr);
                    res.status(500).json({ error: 'Error writing file' });
                    return;
                }
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(existingData));
            });

        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Error parsing JSON' });
        }
    });
});




app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`); 
})

