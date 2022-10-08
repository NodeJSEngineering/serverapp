const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { routes } = require('./config.json');
const app = express();

for (route of routes) {
    app.use(route.route,
        createProxyMiddleware({
            target: route.address,
            // pathRewrite remove route name
            pathRewrite: (path, req) => {
                console.log(path,'pathRewrite');
                return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
            },
            changeOrigin: true
        })
    );
}

app.use('/coins/markets', createProxyMiddleware({ 
    target: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    headers: {
        accept: "application/json",
        method: "GET",
    },
    changeOrigin: true
}));

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

app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
    console.log("Server is running.");
  });