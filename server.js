const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening
var path = require('path');

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});


// app.use('/stock',express.static('builds/stock'));  
// app.use('/', express.static(path.join(__dirname, './builds/stock')))
app.use(express.static(path.join(__dirname, "builds/stock")));

app.get('/stock', (req, res) => {       
    // res.sendFile('./builds/stock/index.html', {root: __dirname}); 
    // res.sendFile('index.html', { root: path.join(__dirname, 'builds/stock') });   
    // res.sendFile('builds/stock/index.html' , { root : __dirname})
    res.sendFile(path.join(__dirname, 'builds/stock', 'index.html'));

});

// app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
//     console.log(`Now listening on port ${port}`); 
// });

app.listen(process.env.PORT || port, '0.0.0.0', () => {
    console.log("Server is running.");
  });