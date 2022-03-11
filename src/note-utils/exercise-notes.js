const fs = require('fs')
const chalk = require('chalk')


const addNote= function(title,body){
	const notes = loadNotes()
	// alternative way to check for notes
	const duplicateNote = notes.find((notes) => notes.title === title)
	//const duplicateNotes = notes.filter(function(note){
	//	return note.title === title
	//})
	//if (duplicateNotes.length === 0) {
	if (!duplicateNote) {
		notes.push({
		title: title,
		body: body
	})
	saveNotes(notes)
	console.log(chalk.green('New note saved'))
	} else {
		console.log(chalk.yellow('Note title already exists'))
	}
}

const removeNote = function(title){
	const notes = loadNotes()
	const notesToKeep = notes.filter(function(note){
		return note.title != title
	})
	if (notes.length > notesToKeep.length){
		console.log(chalk.green.inverse('Note removed'))
		saveNotes(notesToKeep)
	} else {
		console.log(chalk.red('No note found, please check the title'))
	}
}


const saveNotes= function(notes){
	const notesJSON= JSON.stringify(notes)
	fs.writeFileSync('notes.json', notesJSON)
}

const loadNotes = function(){
	 try {
		 const dataBuffer = fs.readFileSync('notes.json')
		 const dataJSON = dataBuffer.toString()
		 return JSON.parse(dataJSON)
	 } catch (e){
		 return []
	 }
}

const listNotes = function(){
	const notes = loadNotes()
	console.log(chalk.blue('Your notes are'))
	notes.forEach(function(note){
		console.log(note.title)
	})
}

const readNote = (title) => {
	const notes = loadNotes()
	console.log(chalk.blue('title:',title))
	const note = notes.find((note) => note.title === title)
	if (note){
		console.log('body:',note.body)
	} else {
		console.log(chalk.red('Note title not found'))
	}
}

//notes.forEach((note) => {
//	console.log(note.title)
//})


// export single function
//module.exports = getNotes

// export more than one function

module.exports = {
	addNote : addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}