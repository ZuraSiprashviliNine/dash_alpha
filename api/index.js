
import express from 'express';
const router = express.Router();
import Axios from 'axios';
import _ from 'lodash';

router.post('/', (req, res) => {
    res.send('hello world');
});

export default router;