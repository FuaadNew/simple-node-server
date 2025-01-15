const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))


const mongoose = require('mongoose')

const password = process.argv[2]


const url = `mongodb+srv://fuaadmohamoud:${password}@cluster0.u3oaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

<<<<<<< HEAD

=======
let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
>>>>>>> parent of 73e5315 (fixed route bug)

app.get('/',(request,response)=>{
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes',(request,response)=>{
  response.json(notes)
})

app.delete('/api/notes/:id',(request,response) => {
  const id = request.params.id
  notes = notes.find(note=>note.id != id)
  response.status('204').end()


<<<<<<< HEAD
app.post('/api/notes',(request,response,next)=>{
=======
})

app.get('/api/notes/:id',(request,response)=>{
  const id = request.params.id
  const note = notes.find(note=>note.id == id)
  if (note){
    response.json(note)
  }else{
    response.status(400).end()
  }
  

})

const generateId = () =>{
  const maxId = notes.length >0
  ? Math.max(...notes.map(n=>number(n.id))) 
  : 0
  return String(maxId + 1)
}

app.post('api/notes',(request,response)=>{
>>>>>>> parent of 73e5315 (fixed route bug)
  
  const body = request.body
  if (!body.content){
    return response.status(400).json({
      error:'content missing'
    })
  }
  const note = {
    content: body.content,
<<<<<<< HEAD
    important: body.important || false
  })

  note.save().then(savedNote =>{
    response.json(savedNote)
  }).catch(error => next(error))
=======
    important: Boolean(body.important) || false,
    id: generateId()
  }
>>>>>>> parent of 73e5315 (fixed route bug)
 
  notes = notes.concat(note)
  
<<<<<<< HEAD
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
=======
  response.json(note)
>>>>>>> parent of 73e5315 (fixed route bug)

})


<<<<<<< HEAD
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

=======
>>>>>>> parent of 73e5315 (fixed route bug)

app.use(errorHandler)
const PORT = process.env.PORT ||  3000
app.listen(PORT, ()=>{
  console.log(`server running at ${PORT}`)
})
