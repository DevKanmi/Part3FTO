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

app.get('/api/notes/:id',(request,response) =>{
  const id = Number(request.params.id)
  // console.log(id)
  const note = notes.find(note => note.id === id)
    // console.log(note.id, typeof note.id, id, typeof id, note.id === id)
  // console.log(note)
  if(note){
    response.json(note)
  }
  else{
    response.status(404).end() ///To fix when a number that is not in the array is called,this error is called
  }

app.delete('/api/notes/:id',(request,response)=>{
  const id =Number(request.params.id)
  notes = notes.filter(note => note.id !==id) //elements that are not of that id are fitered to stay while those that have that id is deleted
  response.status(204).end() //error thrown if we try to access an element that has already been deleted
})

const generateId =() => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response)=>{
  const body = request.body
  
  if(!body.content){
    return response.status(400).json({
      error : "content missing"
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

})
const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server running on port ${PORT}`)
})
