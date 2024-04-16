const app = require('./app');
const http = require('http');
const { PAGE_URL} = require('./config.js')

const server = http.createServer(app);

server.listen(3000,()=>{
    
    console.log('Proyecto Iniciado');
    console.log(PAGE_URL);
})