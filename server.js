
import config from './config';
import path from 'path';
import express from 'express';
import http from 'http';

import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';

import sio from 'socket.io';

const app = express();

app.set('view engine', 'ejs');
app.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));

app.use('/api', apiRouter);
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.render('index');
});

const server = http.createServer(app);

const suckit = sio(server);

suckit.on('connection', socket => {
    console.log('connected');
    
    socket.on('cc', color => {
        console.log('Color Changed to: ', color)
        suckit.sockets.emit('cc', color)
      })
    socket.on('disconnect', () => {
        console.log('disconnected');
    })
});

server.listen(config.port, config.host, () => {
    console.log(`listening on port ${config.port}`);
})



// app.listen(config.port, config.host, () => {
//     console.log('listening on port', config.port);
// });