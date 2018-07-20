
import express from 'express';
const router = express.Router();

import crypto from 'crypto';

let mykey = crypto.createCipher('aes-128-cbc', 'love');
let mykey_ = crypto.createDecipher('aes-128-cbc', 'love');

const Mongo = require('mongodb').MongoClient;
const mongo_url = 'mongodb://localhost:27017/';

router.post('/users', (req, res) => {
    Mongo.connect(mongo_url, {
        useNewUrlParser: true
    }, (err, db) => {
        if(err){
            res.send('error');
        }else{
            let dbo = db.db('base_1');
            
            let query = {

            }, fields = {

            };
            
            dbo.collection('users').find(query, fields).toArray((err, result) => {
                if(err){
                    res.end('error_2');
                }else{
                    res.send(result || null);
                }
                db.close();
            })
        }
    })
});

router.post('/user/:id', (req, res) => {
    Mongo.connect(mongo_url,{
        useNewUrlParser: true
    }, (err, db) => {
        if(err){
            res.send('error');
        }else{
            let dbo = db.db('base_1');
            let query = {
                id: parseInt(req.params.id)
            }, fields = {

            };
            dbo.collection('users').findOne(query, fields, (err, result) => {
                if(err){
                    res.send('error_2');
                }else{
                    res.send(result || null);
                }
                db.close();
            });
        }
    })
});

router.post('/user/username/:username', (req, res) => {
    Mongo.connect(mongo_url, {
        useNewUrlParser: true
    }, (err, db) => {
        if(err){
            res.send('error');
        }else{
            let dbo = db.db('base_1');
            let query = {
                user_name: req.params.username
            }, fields = {
                
            };
            dbo.collection('users').findOne(query, fields, (err, result) => {
                if(err){
                    res.send('error_2');
                }else{
                    res.send(result)
                    // res.send(result ? true : false);
                }
                db.close();
            });
        }
    })
});

router.post('/user/auth/:username/:password', (req, res) => {
    Mongo.connect(mongo_url, {
        useNewUrlParser: true
    }, (err, db) => {
        if(err){
            res.send('error');
        }else{
            let dbo = db.db('base_1');
            let query = {
                user_name: req.params.username
            }, fields = {

            };

            dbo.collection('users').findOne(query, fields, (err, result) => {
                if(err){
                    res.send('error_2');
                }else{
                    res.send(result || null);
                }
                db.close();
            })
        }
    })
})

export default router;  