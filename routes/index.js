const express = require("express");
const router = express.Router();
//Api
const Video = require('../Schema.js')
const Audio = require('../Audio.js')
router.get('/videos',async(req,res)=>{
  console.log(Video)
    try {
        const video = await Video.find({})
        return res.json({data:video})
        
    } catch (err) {
      console.log(err)
        return res.json({errorMessage:err})
    }
})

router.get('/video/:id',async(req,res)=>{
    try {
        const video = await Video.findById(req.params.id)
        return res.json({data:video})
        
    } catch (err) {
        return res.json({errorMessage:err})
    }
})


router.post('/video', async (req, res) => {
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

router.put('/video/:id', async (req, res) => {
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

router.delete('/video/:id', async (req, res) => {

  try {
    const video = await Video.findByIdAndDelete(req.params.id)
    return res.json({ message:"Deleted!"});
  } catch (err) {
    console.log(err)
    return res.json({ errorMessage: err });
  }
})





router.get('/audios',async(req,res)=>{
    try {
        const audio = await Audio.find({})
        return res.json({data:audio})
        
    } catch (err) {
      console.log(err)
        return res.json({errorMessage:err})
    }
})

router.get('/audio/:id',async(req,res)=>{
    try {
        const audio = await Audio.findById(req.params.id)
        return res.json({data:audio})
        
    } catch (err) {
        return res.json({errorMessage:err})
    }
})


router.post('/audio', async (req, res) => {
  const {
      name,
artist,
duration,
audio,
thumbnail,
coverImage,isActive,} = req.body;
 
  const isDuplicate = await Audio.find({ name: name, audio: audio });

  if (isDuplicate.length != 0) {
    res.json({ message: 'Video existed' });
    return;
  }
  try {
    let newaudio = new Audio({
      name,
artist,
duration,
audio,
thumbnail,
coverImage,isActive,});

    newaudio = await newaudio.save();
    return res.json({ data: newaudio });
  } catch (err) {
    console.log(err)
    return res.json({ errorMessage: err });
  }
})

router.put('/audio/:id', async (req, res) => {
  const {
      name,
artist,
duration,
audio,
thumbnail,
coverImage,isActive,} = req.body;

  try {
    let data = {
      name,
artist,
duration,
audio,
thumbnail,
coverImage,isActive,}
    const newaudio = await Audio.findByIdAndUpdate(req.params.id,data)
    return res.json({ data: data });
  } catch (err) {
    console.log(err)
    return res.json({ errorMessage: err });
  }
})

router.delete('/audio/:id', async (req, res) => {

  try {
    const audio = await Audio.findByIdAndDelete(req.params.id)
    return res.json({ message:"Deleted!"});
  } catch (err) {
    console.log(err)
    return res.json({ errorMessage: err });
  }
})

module.exports = router