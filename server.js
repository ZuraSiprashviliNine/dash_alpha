
import config from './config';
import path from 'path';
import express from 'express';

import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';

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

app.listen(config.port, config.host, () => {
    console.log('listening on port', config.port);
});