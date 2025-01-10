const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))
require('dotenv').config();



const password = process.argv[2]





const Note = require('./models/note')

let notes = [
    
  ]

app.get('/',(request,response)=>{
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes',(request,response)=>{
  Note.find({}).then(notes=>{
    response.json(notes)

  })
})



app.post('/api/notes',(request,response)=>{
  
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
  })
 
  
})
app.get('/api/notes/:id',(request,response)=>{
  Note.findById(request.params.id).then(note =>{
    response.json(note)
  })
  

})


app.delete('/api/notes/:id',(request,response) => {
  const id = request.params.id
  notes = notes.filter(note=>note.id != id)
  response.status('204').end()


})







const PORT = process.env.PORT ||  3000
app.listen(PORT, ()=>{
  console.log(`server running at ${PORT}`)
})

