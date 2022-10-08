const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, 
const port = 1001; //Save the port number where your server ill be listening
var path = require('path');
app.get('/', (req, res) => {        
    res.sendFile('index.html', {root: __dirname});      
});

app.use(express.static(path.join(__dirname, "builds/stock")));

app.get('/stock', (req, res) => {       
    res.sendFile(path.join(__dirname, 'builds/stock', 'index.html'));
});


app.listen(process.env.PORT || port, '0.0.0.0', () => {
    console.log(`Now listening on port ${process.env.PORT, port}`);
  });