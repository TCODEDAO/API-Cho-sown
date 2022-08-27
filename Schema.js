const mongoose = require('mongoose')

const Video = new mongoose.Schema({
	title:String,
	description:String,
	author:String,
	videoURL:String,
},{
	timestamps: true 
})

module.exports = mongoose.model('videos',Video)