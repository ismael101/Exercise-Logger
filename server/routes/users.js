const express = require('express')
let router = express.Router()
let User = require('../models/user')
const mongoose = require('mongoose')

router.get('/',(req,res) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json(err))
})
router.get('/:id',(req,res) => {
    User.findOne({_id:req.params.id})
    .then(user => {
        res.status(200).json({
            message:'User Fetched',
            user:user
        })
    })
    .catch(err => {
        res.status(400).json({
            message:'Error Occured',
            error:err
        })
    })
})

router.post('/',(req,res) => {
    const newUser = new User({
        _id:new mongoose.Types.ObjectId(),
        username:req.body.username
    })
    newUser.save()
        .then(user => {
            res.status(200).json({
                message:'New User Added',
                user:user
            })
        })
        .catch(err => {
            res.status(400).json({
                message:'Error Occured',
                error:err
            })
        })
})

router.patch('/:id',(req,res) => {
    User.findOneAndUpdate({_id:req.params.id},{$set:req.body})
    .then(user => {
        res.status(200).json({
            message:'User Updated',
            user:user
        })
    })
    .catch(err => {
        res.status(400).json({
            message:'Error Occured',
            error:err
        })
    })
})

router.delete('/:id',(req,res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(200).json({
            message:'User Deleted'
        })
    })
    .catch(err => {
        res.status(400).json({
            message:'Error Occured',
            error:err  
        })
    })
})

module.exports = router