const mongoose = require('mongoose')
if (process.argv.length<3){
    console.log('give password as argument')
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://fuaadmohamoud:${hJDZUtGNTbNpthu8}@cluster0.u3oaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean

})

const Note = mongoose.model('Note',noteSchema)

const note = newNote({
    content: 'HTML is easy',
    important: true
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})