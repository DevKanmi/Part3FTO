const dotenv = require("dotenv");
dotenv.config();


// const mongoose = require('mongoose')


// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url = process.env.MONGODB_URI;
 
// mongoose.set('strictQuery',false)

// mongoose.connect(url)

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,   // Create your node model schema 
// })

// const Note = mongoose.model('Note', noteSchema) // Create your model based on the schema created

// noteSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

const Note = require('./models/note')


const express = require('express');
const app = express()

app.use(express.json());
// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only JavaScript",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       important: true
//     }
//   ]
 
app.get('/',(request,response) => {
    response.send('<h1>Hello World</h1>') //Route 1 defines an event handler
})

app.get('/api/notes',(request,response) =>{
  Note.find({}).then(notes=>{
      response.json(notes)
  })
  })


app.delete('/api/notes/:id',(request,response)=>{
  const id =Number(request.params.id)
  notes = notes.filter(note => note.id !==id) //elements that are not of that id are fitered to stay while those that have that id is deleted
  response.status(204).end() //error thrown if we try to access an element that has already been deleted
})


app.post('/api/notes', (request, respons, next)=>{
  const body = request.body
  
  if(body.content === undefined){
    return response.status(400).json({
      error : "content missing"
    })
  }

  const note = new Note({
    content: body.content,
    important: (body.important) || false,
 })

 note.save().then(savedNote =>{
  response.json(savedNote)
 })
 .catch(error =>next(error))
})

app.get('api/notes/:id', (request, response) =>{
  Note.findById(request.params.id).then(note =>{
    if (note) {
      response.json(note)
    }
    else {
        response.status(404).end()  // if the request(Note) does not exist in the database, return this
    }
  })
  .catch(error=> next(error))
})

const errorHandler = (error, request, response, next) =>{
  console.error(error.message)

  if (error.name === 'CastError'){
    return response.status(400).send({error: 'Malformatted id'})
  }

  else if(error.name ==="ValidationError"){
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`)
})
