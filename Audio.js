const mongoose = require('mongoose')

const Audio = new mongoose.Schema({
	name:String,
	artist:String,
	duration:String,
	audio:String,
	thumbnail:String,
	coverImage:String,
	isActive:Boolean,
},{
	timestamps: true 
})

module.exports = mongoose.model('audios', Audio)