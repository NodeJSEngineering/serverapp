// Dependencies
const express = require('express');
// const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Config
const { routes } = require('./config.json');

const app = express();

for (route of routes) {
    app.use([route.route],
        createProxyMiddleware({
            target: route.address,
            // pathRewrite remove route name
            pathRewrite: (path, req) => {
                console.log(path, 'path');
                console.log(path.split('/').slice(2).join('/'), 'path2');

                return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
            },
            changeOrigin: true
        })




    );
}

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })


app.get('/project1', (req, res) => {   
    res.sendFile('index.html', {root: __dirname});  
});


app.get('/project2', (req, res) => {       
    res.sendFile('index.html', {root: __dirname});      
});



// app.listen(80, () => {
//     console.log('Proxy listening on port 80');
// });

app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
    console.log("Server is running.");
  });