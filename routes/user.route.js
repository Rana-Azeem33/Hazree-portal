
// import UserModel from '../models/user.model';
let UserModel = require('../models/user.model')
const express = require('express');
const userRoutes = express.Router();

//(Endpoint:1) GET - all users from database.
userRoutes.get('/users', (req, res) => {
    // console.log("...endpoint getuser works!");
    UserModel.find((err, users) => {
        if (err) {
            res.send(err);
            // res.render('login', {  //when you want to show a new webpage on this endpoint...
            //     title: 'Express Login'
            // });
        }
        else {
            console.log("getting all users from database..")
            res.send(users);
        }
    })
})

//(Endpoint:2) GET - user whose id matches.. from database.
userRoutes.get('/users/:id', (req, res) => {
    UserModel.find({ id: req.params.id }, (err, user) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log("get user by id...")
            res.send(user);
        }
    })
})

module.exports = userRoutes;