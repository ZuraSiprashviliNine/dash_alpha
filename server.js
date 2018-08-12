
import config from './config';
import path from 'path';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';

const app = express();


// import React from 'react';
// import RDS from 'react-dom/server';
// import {Element} from './src/index';

app.set('view engine', 'ejs');
app.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRouter);
app.use(express.static('public'));

app.get('*', (req, res) => {
    // res.send(RDS.renderToNodeStream((
    //     <Element />
    // )));
    // res.send('x');
    res.render('index');
});

const server = http.createServer(app);

server.listen(config.port, config.host, () => {
    console.log(`listening on port ${config.port}`);
})



// app.listen(config.port, config.host, () => {
//     console.log('listening on port', config.port);
// });