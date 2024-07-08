const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://okanmiyo:${password}@cluster0.xfrd9do.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,   // Create your node model schema 
})

const Note = mongoose.model('Note', noteSchema) // Create your model based on the schema created

const note1 = new Note({
  content: 'HTML is easy',   //Add objects to database using the Note(the note serves as a class blueprint) the "note" is an object created based on model.
  important: true,
})

const note2 = new Note({
  content: "JS is beans",
  important: true,
})

const note3 = new Note({
  content: "CSS Beautifies",
  important: true,
})


// note1.save().then(result => {  // .save is to ensure the note is saved, the "then" indicated that after it is saved a function should be returned indicating the model has been saved ad then end connection
//   console.log('note1 saved!')
// })

// note2.save().then(result => {  // .save is to ensure the note is saved, the "then" indicated that after it is saved a function should be returned indicating the model has been saved ad then end connection
//   console.log('note2 saved!')
// })

// note3.save().then(result => {  // .save is to ensure the note is saved, the "then" indicated that after it is saved a function should be returned indicating the model has been saved ad then end connection
//   console.log('note3 saved!')
//   mongoose.connection.close() //Needed for a program to finish execution.
// })

Note.find({}).then(result =>{
  result.forEach(note =>{
    console.log(note);
  }) //Used to Print all the Items currently stored in the database
 mongoose.connection.close()
})