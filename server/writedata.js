const fs = require('fs');
const path = require('path');

module.exports = (data) => {
  try {
    console.log('new data: '+data);
    fs.writeFileSync(path.join(__dirname, 'imageurldata.json'), JSON.stringify(data, null,2), 'utf-8'); //to write data 
 }
  catch(err) {
    throw err;
  }
}



