const Service = require('node-windows').Service;


const svc = new Service({
    name: 'MyAppScanner',
    description: 'The nodejs',
    script: 'D:\\Coding\\scanner-backend\\server.js'
})

svc.on('install', function () {
    svc.start();
});

svc.install();