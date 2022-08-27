const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const port = 3000
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(
    'mongodb+srv://thanhadmin:thanh13708@thanhdeptrai.bucuf.mongodb.net/Api-cho-son?retryWrites=true&w=majority',
    () => {
      console.log('Your mongodb is starting...')
    }
  )



app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./index.html'))
})
app.use('/api/v1',require('./routes/index.js'))

app.listen(port,()=>{
    console.log(`Your server start at http://localhost:${port}`)
})
