
import express from 'express';
const router = express.Router();

import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

import validator from 'validator';

import config from '../config';

let mykey = crypto.createCipher('aes-128-cbc', 'love');
let mykey_ = crypto.createDecipher('aes-128-cbc', 'love');

const Mongo = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
const mongo_url = `mongodb://${config.host}:27017/`;

router.get('/test', (req, res) => {
    res.end('api');
});

router.post('/language', (req, res) => {
    let pars = Object.keys(req.body);
    if(pars.length === 1){
        pars = pars[0];

        if(pars === config.constants.languages){ //list of languages
            fs.readFile(path.join(__dirname, 'JSON', 'languages.json'), (err, data) => {
                res.send(data || null);
            })
        }else if(pars === config.constants.refLang){ //string of reference language code
            fs.readFile(path.join(__dirname, 'JSON', 'ref_lang.json'), (err, data) => {
                if(!err){
                    res.send(JSON.parse(data.toString('utf8')) || null);
                }
            })
        }else if(pars === config.constants.keywordsRes){// array of keywords for specific language
            const resKeywordVal = req.body[config.constants.keywordsRes];
            Mongo.connect(mongo_url, {
                useNewUrlParser: true
            }, (err, db) => {
                if(!err){
                    let dbo = db.db('base_1');
                    dbo.collection('keywords').find({

                    }, {

                    }, (err, result) => {
                        if(!err){
                            result.toArray((err, data) => {
                                if(!err){
                                    let _data = data.map(_d => {
                                        return _d[resKeywordVal];
                                    });
                                    res.send(_data || null);
                                }
                                db.close();
                            })
                        }
                    })
                }
            })
        }else if(pars === config.constants.keywordsRef){// arrayy of keywords for default language
            let refKeywordVal = null;
            Mongo.connect(mongo_url, {
                useNewUrlParser: true
            }, (err, db) => {
                if(!err){
                    let dbo = db.db('base_1');
                    dbo.collection('keywords').find({

                    }, {

                    }, (err, result) => {
                        if(!err){
                            result.toArray((err, data) => {
                                if(!err){
                                    fs.readFile(path.join(__dirname, 'JSON', 'ref_lang.json'), (err, _data) => {
                                        if(!err){
                                            refKeywordVal = JSON.parse(_data.toString('utf8'));
                                            let __data = data.map(_d => {
                                                return _d[refKeywordVal];
                                            });
                                            res.send(__data || null);
                                        }
                                        db.close();
                                    }); 
                                }
                            })
                        }
                    })
                }
            })
        }else if(pars === config.constants.divider){// divider string
            fs.readFile(path.join(__dirname, 'JSON', 'divider.json'), (err, data) => {
                res.send(data || null);
            })
        }
    }else if(pars.length === 2){//object of reference and result keywords
        if(pars.includes(config.constants.keywordsRef) && pars.includes(config.constants.keywordsRes)){
            const refKeywordval = req.body[config.constants.keywordsRef];
            const resKeyWordVal = req.body[config.constants.keywordsRes];

            Mongo.connect(mongo_url, {
                useNewUrlParser: true
            }, (err, db) => {
                if(!err){
                    let dbo = db.db('base_1');

                    dbo.collection('keywords').find({
                        
                    }, {

                    }, (err, result) => {
                        if(!err){
                            result.toArray((err, data) => {
                                if(!err){
                                    let _data = data.map(_d => {
                                        return {
                                            [refKeywordval]: _d[refKeywordval],
                                            [resKeyWordVal]: _d[resKeyWordVal]
                                        };
                                    });
                                    res.send(_data || null);
                                }

                                db.close();
                            })
                        }
                    });
                }
            });
        }
    }
});

router.post('/particles', (req, res) => {
    fs.readFile(path.join(__dirname, 'JSON', 'particles.json'), (err, data) => {
        if(!err){
            res.send(data || null);
        }
    });
});

router.post('/artist', (req, res) => {
    fs.readFile(path.join(__dirname, 'JSON', 'artist.json'), (err, data) => {
        if(!err){
            res.send(data || null);
        }
    })
});

router.post('/info', (req, res) => {
    fs.readFile(path.join(__dirname, 'JSON', 'info.json'), (err, data) => {
        if(!err){
            res.send(data || null);
        }
    })
});

router.post('/navigation', (req, res) => {
    Mongo.connect(mongo_url, {
        useNewUrlParser: true
    }, (err, db) => {
        if(!err){
            let dbo = db.db('base_1');

            dbo.collection('navigation').find({

            }, {
                
            }, (err, result) => {
                if(!err){
                    result.toArray((err, data) => {
                        if(!err){
                            res.send(data || null);
                        }
                        db.close();
                    })
                }
            });
        }
    })
});

router.post('/contact', (req, res) => {
    let user_name = req.body.user_name,
        email = req.body.email,
        subject = req.body.subject,
        message = req.body.message;
    let date = new Date();
    user_name = validator.trim(user_name);
    email = validator.trim(email);
    subject = subject.trim(subject);
    message = message.trim(message);
    let errors = {};
    if(validator.isEmpty(user_name)){
        if(errors.user_name){
            errors = {
                ...errors,
                user_name: [
                    ...errors.user_name,
                    config.constants.empty
                ]
            };
        }else{
            errors = {
                ...errors,
                user_name: [
                    config.constants.empty
                ]
            };
        }
    }
    if(validator.isEmpty(email)){
        if(errors.email){
            errors = {
                ...errors,
                email: [
                    ...errors.email,
                    config.constants.empty
                ]
            };
        }else{
            errors = {
                ...errors,
                email: [
                    config.constants.empty
                ]
            };
        }
    }
    if(!validator.isEmail(email)){
        if(errors.email){
            errors = {
                ...errors,
                email: [
                    ...errors.email,
                    config.constants.notEmail
                ]
            };
        }else{
            errors = {
                ...errors,
                email: [
                    config.constants.notEmail
                ]
            };
        }
    }
    if(validator.isEmpty(subject)){
        if(errors.subject){
            errors = {
                ...errors,
                subject: [
                    ...errors.subject,
                    config.constants.empty
                ]
            };
        }else{
            errors = {
                ...errors,
                subject: [
                    config.constants.empty
                ]
            };
        }
    }
    if(validator.isEmpty(message)){
        if(errors.message){
            errors = {
                ...errors,
                message: [
                    ...errors.message,
                    config.constants.empty
                ]
            };
        }else{
            errors = {
                ...errors,
                message: [
                    config.constants.empty
                ]
            };
        }
    }
    let _valid = Object.values(errors).length === 0;
    if(_valid === true){
        Mongo.connect(mongo_url, {
            useNewUrlParser: true
        }, (err, db) => {
            let dbo = db.db('base_1');

            dbo.collection('leads').insert({
                user_name,
                email,
                subject,
                message,
                created_at: date
            }, (err, result) => {
                if(!err){
                    res.send(true);
                }
            })
        })
    }else{
        res.send(errors);
    }
});

router.post('/gallery/data', (req, res) => {
    let pars = Object.keys(req.body);
    if(pars.length === 1){
        pars = pars[0];
        if(pars === config.constants.total){
            Mongo.connect(mongo_url, {
                useNewUrlParser: true
            }, (err, db) => {
                if(!err){
                    let dbo = db.db('base_1');

                    dbo.collection('gallery').find({

                    }, {

                    }).count((err, data) =>{
                        if(!err){
                            res.send(data.toString());
                            db.close();
                        }
                    })
                }
            })
        }else if(pars === config.constants.perPage){
            res.send(config.constants.itemsPerPage.toString());
        }
    }else if(pars.length === 3 || pars.length === 2){
        if(pars.includes(config.constants.category) && pars.includes(config.constants.page)){
            let page = parseInt(req.body[config.constants.page]),
                category = req.body[config.constants.category];
            Mongo.connect(mongo_url, {
                useNewUrlParser: true
            }, (err, db) => {
                if(!err){
                    let dbo = db.db('base_1');

                    dbo.collection('gallery').find({
                        
                    }, {
        
                    })
                        .toArray((err, data) => {
                            if(!err){
                                if(category !== config.constants.all){
                                    let _data = data.filter(d => d.categories.includes(category));
                                    _data = _data.slice(config.constants.itemsPerPage * page, config.constants.itemsPerPage * page + config.constants.itemsPerPage)
                                    if(req.body[config.constants.front]){
                                        _data = _data.map(d => {
                                            return {
                                                _id: d._id,
                                                title: d.title,
                                                categories: d.categories,
                                                image: d.image,
                                                short_description: d.short_description,
                                                comments: d.comments.length,
                                                likes: d.likes.length,
                                                views: d.views.length,
                                                created_at: d.created_at,
                                                slag: d.slag
                                            };
                                        })
                                    }
                                    res.send(_data || null);
                                }else{
                                    let _data = data.slice(config.constants.itemsPerPage * page, config.constants.itemsPerPage * page + config.constants.itemsPerPage)
                                    if(req.body[config.constants.front]){
                                        _data = _data.map(d => {
                                            return {
                                                _id: d._id,
                                                title: d.title,
                                                categories: d.categories,
                                                image: d.image,
                                                short_description: d.short_description,
                                                comments: d.comments.length,
                                                likes: d.likes.length,
                                                views: d.views.length,
                                                created_at: d.created_at,
                                                slag: d.slag
                                            }
                                        })
                                    }
                                    res.send(_data || null);
                                }
                            }
                            db.close();
                        });
                }
            })
        }else if(pars.includes(config.constants.total) && pars.includes(config.constants.category)){
            let category = req.body[config.constants.category];
            Mongo.connect(mongo_url, {
                useNewUrlParser: true
            }, (err, db) => {
                if(!err){
                    let dbo = db.db('base_1');

                    dbo.collection('gallery').find({
                        
                    }, {
        
                    })
                        .toArray((err, data) => {
                            if(!err){
                                if(category !== config.constants.all){
                                    let _data = data.filter(d => d.categories.includes(category));
                                    res.send(_data.length.toString() || nul);
                                }else{
                                    res.send(data.length.toString() || null);
                                }
                            }
                            db.close();
                        });
                }
            })
        }else if(pars.includes(config.constants.ident) && pars.includes(config.constants.like) && pars.includes(config.constants.id)){
            let id = req.body[config.constants.id];
            
            Mongo.connect(mongo_url, {
                useNewUrlParser: true
            }, (err, db) => {
                if(!err){
                    let dbo = db.db('base_1');

                    dbo.collection('gallery').find({
                        _id: new ObjectId(id)
                    })
                        .toArray((err, data) => {
                            if(!err){
                                data = data[0];
                                let _old = data;
                                let _date = new Date();
                                let ok = _old.likes.find(like => like.ident == req.body[config.constants.ident]);
                                if(ok){
                                    res.send(JSON.stringify(id));
                                }else{
                                    let _new = {
                                        ..._old,
                                        likes: [
                                            ..._old.likes,
                                            {
                                                time: `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}/${_date.getHours() + 1}:${_date.getMinutes()}:${_date.getSeconds()}`,
                                                ident: parseInt(req.body[config.constants.ident])
                                            }
                                        ]
                                    };
    
                                    dbo.collection('gallery').update({
                                        _id: new ObjectId(id)
                                    },{
                                        ..._new,
                                        likes: _new.likes
                                    }, (err, result) => {
                                        if(!err){
                                            res.send(JSON.stringify(id));
                                        }
                                        db.close();
                                    })
                                }
                            }
                        });
                }
            })
        }else if(pars.includes(config.constants.ident) && pars.includes(config.constants.unlike) && pars.includes(config.constants.id)){
            let id = req.body[config.constants.id];

            Mongo.connect(mongo_url, {
                useNewUrlParser: true
            }, (err, db) => {
                if(!err){
                    let dbo = db.db('base_1');

                    dbo.collection('gallery').find({
                        _id: new ObjectId(id)
                    })
                        .toArray((err, data) => {
                            if(!err){
                                data = data[0];
                                let _old = data;
                                let _new_likes = [];
                                _old.likes.map(like => {
                                    if(like.ident !== req.body[config.constants.ident]){
                                        _new_likes.push(like);
                                        return like;
                                    }
                                });
                                let _new = {
                                    ..._old,
                                    likes: _new_likes
                                };
                                
                                dbo.collection('gallery').update({
                                    _id: new ObjectId(id)
                                },{
                                    ..._new,
                                    likes: _new.likes
                                }, (err, result) => {
                                    if(!err){
                                        res.send(JSON.stringify(id));
                                    }
                                })
                            }
                            db.close();
                        });
                }
            })
        }else if(pars.includes(config.constants.isBack) && pars.includes(config.constants.slag)){
            let slag = req.body[config.constants.slag];

            Mongo.connect(mongo_url, {
                useNewUrlParser: true
            }, (err, db) => {
                if(!err){
                    let dbo = db.db('base_1');

                    dbo.collection('gallery').findOne({
                        slag: slag
                    }, (err, result) => {
                        if(!err){
                            res.send(JSON.stringify(result));
                            db.close();
                        }
                    })
                }
            })
        }else if(pars.includes(config.constants.ident) && pars.includes(config.constants.view) && pars.includes(config.constants.id)){
            let id = req.body[config.constants.id],
                ident = req.body[config.constants.ident];

            Mongo.connect(mongo_url, {
                useNewUrlParser: true
            }, (err, db) => {
                if(!err){
                    let dbo = db.db('base_1');

                    dbo.collection('gallery').find({
                        _id: new ObjectId(id)
                    }).toArray((err, data) => {
                        if(!err){
                            data = data[0];
                            let _old = data;
                            let _date = new Date();
                            let ok = _old.views.find(view => view.ident == ident);
                            if(ok){
                                res.send(JSON.stringify(id));
                            }else{
                                let _new = {
                                    ..._old,
                                    views: [
                                        ..._old.views,
                                        {
                                            time: `${_date.getDate()}/${_date.getMonth() + 1}/${_date.getFullYear()}/${_date.getHours() + 1}:${_date.getMinutes()}:${_date.getSeconds()}`,
                                            ident: parseInt(req.body[config.constants.ident])
                                        }
                                    ]
                                };

                                dbo.collection('gallery').update({
                                    _id: new ObjectId(id)
                                },{
                                    ..._new,
                                    views: _new.views
                                }, (err, result) => {
                                    if(!err){
                                        res.send(JSON.stringify(id));
                                    }
                                    db.close();
                                })
                            }
                        }
                    })
                }
            })
        }
    }
});

router.post('/gallery/info', (req, res) => {
    fs.readFile(path.join(__dirname, 'JSON', 'gallery.json'), (err, data) => {
        if(!err){
            let _data = data.toString('utf8');
            res.send(_data || null);
        }
    });
});


export default router;