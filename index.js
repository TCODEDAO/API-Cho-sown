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

const Video = require('./Schema')

app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./index.html'))
})


//Api

app.get('/video',async(req,res)=>{
    try {
        const video = await Video.find({})
        return res.json({data:video})
        
    } catch (err) {
        return res.json({errorMessage:err})
    }
})

app.get('/video/:id',async(req,res)=>{
    try {
        const video = await Video.findById(req.params.id)
        return res.json({data:video})
        
    } catch (err) {
        return res.json({errorMessage:err})
    }
})


app.post('/video', async (req, res) => {
  const { title, author, videoURL, description } = req.body;
 
  const isDuplicate = await Video.find({ title: title, videoURL: videoURL });

  if (isDuplicate.length != 0) {
    res.json({ message: 'Video existed' });
    return;
  }
  try {
    let video = new Video({title, author, videoURL, description});

    video = await video.save();
    return res.json({ data: video });
  } catch (err) {
    console.log(err)
    return res.json({ errorMessage: err });
  }
})

app.put('/video/:id', async (req, res) => {
  const { title, author, videoURL, description } = req.body;

  try {
    let data = {
      title,
      author, 
      videoURL, 
      description ,
    }
    const video = await Video.findByIdAndUpdate(req.params.id,data)
    return res.json({ data: data });
  } catch (err) {
    console.log(err)
    return res.json({ errorMessage: err });
  }
})

app.delete('/video/:id', async (req, res) => {

  try {
    const video = await Video.findByIdAndDelete(req.params.id)
    return res.json({ message:"Deleted!"});
  } catch (err) {
    console.log(err)
    return res.json({ errorMessage: err });
  }
})


app.listen(port,()=>{
    console.log(`Your server start at http://localhost:${port}`)
})
