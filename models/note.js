const mongoose = require('mongoose')
mongoose.set('strictQuery',false)


mongoose.connect(MONGODB_URI)
.then(result =>{
    console.log('connected to MongoDB')
})
.catch(error =>{
    console.log('error connecting to MongoDB',error.message)
})



const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      minLength: 5,
      required: true
    },
    important: Boolean,
  })

  
noteSchema.set('toJson', {
    transform: (document,returnedObject) =>{
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  
    }
  })

  module.exports = mongoose.model('Note',noteSchema)