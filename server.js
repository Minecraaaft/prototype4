const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();



const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.crt')),
    ca: fs.readFileSync(path.join(__dirname, 'cert', 'ca.crt')),
    requestCert: false,
    rejectUnauthorized: false
}, app);

sslServer.listen(443, () => console.log("listens..."));

const io = require('socket.io')(sslServer);

io.sockets.on('connection', (socket) => {
    console.log("a user connected");
    socket.on('message', message => {
        console.log(message);
    })
})


// Set static folder
app.use('/', (req, res) => {
    res.send('Hello from SSL server');
});