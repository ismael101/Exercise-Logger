const express = require('express')
const mongoose = require('mongoose')
let Exercise = require('../models/exercise')
let router = express.Router()


router.get('/',(req,res) => {
    Exercise.find()
    .then(exercises => {
        res.status(200).json(exercises)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

router.get('/:id', (req,res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        res.status(200).json({
            message:'Exercise Fetched',
            exercise: exercise
        })
    })
    .catch(err => {
        res.status(400).json({
            message:'Error Occurred',
            error:err
        })
    })
})

router.post('/',(req,res) => {
    const newExercise = new Exercise({
        _id:new mongoose.Types.ObjectId(),
        username:req.body.username,
        description:req.body.description,
        duration:req.body.duration,
        date:Date.parse(req.body.date)
    })
    newExercise.save()
    .then(exercise => {
        res.status(200).json({
            message:'New Exercise Added',
            exercise: exercise
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
    Exercise.findOneAndUpdate({_id:req.params.id},{$set:req.body})
    .then(() => {
        res.status(200).json({
            message:'Exercise Updated'
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
   Exercise.findByIdAndDelete(req.params.id)
   .then(() => {
       res.status(200).json({
           message:'Exercise Deleted'
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