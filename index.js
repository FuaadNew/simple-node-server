const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))



const password = process.argv[2]





const Note = require('./models/note')



app.get('/',(request,response)=>{
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes',(request,response)=>{
  Note.find({}).then(notes=>{
    response.json(notes)

  })
})



app.post('/api/notes',(request,response,next)=>{
  
  const body = request.body
  if (!body.content){
    return response.status(400).json({
      error:'content missing'
    })
  }
  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  note.save().then(savedNote =>{
    response.json(savedNote)
  }).catch(error => next(error))
 
  
})
app.get('/api/notes/:id',(request,response)=>{
  Note.findById(request.params.id)
  .then(note =>{
    if (note){
      response.json(note)
    }else{
      response.status(404).end()
    }
    
  }).catch(error=> next(error))
  
  

})

app.put('/api/notes/:id', (request, response, next) => {
  const {content,important} =  request.body

  
  Note.findByIdAndUpdate(request.params.id,note,
    {content,important},{new:true, runValidators: true, context: 'query'})
  .then(updatedNote =>{
    response.json(updatedNote)
  })
  .catch(error =>(error))

})


app.delete('/api/notes/:id',(request,response) => {
  const id = request.params.id
  notes = notes.filter(note=>note.id != id)
  response.status('204').end()


})



const errorHandler = (error,request,response,next)=>{
  console.error(error.message)
  if (error.name === 'CastError'){
    return response.status(400).send({error: 'malfored id'})
  }else if (error.name === 'ValidationError'){
    return response.status(400).json({error:error.message})
  }
}
next(error)


app.use(errorHandler)
app.listen(PORT, ()=>{
  console.log(`server running at ${PORT}`)
})

