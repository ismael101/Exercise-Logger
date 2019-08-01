const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const config = require('./config')
const user = require('./routes/users')
const exercise = require('./routes/exercise')


mongoose.connect(config.database_config.host ,{useNewUrlParser:true, useCreateIndex:true})
    .then(result => {
        console.log('successfully connected to mlab')
    })
    .catch((err) => {
        console.log(`something went wrong connecting to mlab:${err}`)
    })

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/users', user)
app.use('/exercise', exercise)

app.listen(config.server_config.port,() => {
    console.log(`Server running on port ${config.server_config.port}`)
})