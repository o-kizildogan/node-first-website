// valudotor to check url and email format
const validator = require('validator')

const fs = require('fs')

const chalk = require('chalk')

const yargs = require('yargs')

const notes = require('./exercise-notes.js')

//const result= getNotes()

//console.log(result)
//
//console.log(validator.isEmail('jackdoe@example.com'))

//console.log(validator.isURL('www.jackdoe.com'))

//print the string in colour or style selection

//console.log(chalk.green('Success!'))

//grab the third item from the command console

//const command = process.argv[2]

//if (command === 'add'){
//	console.log('Adding note')
//}

// yargs to get input from CLI

// create add command

yargs.command({
	command:'add',
	describe:'Add a new note',
	builder: {
		body:{
			describe:'Text for the note',
			demandOption: true,
			type:'string'
		},
		title: {
			describe: 'Note title',
			//ask title as mandatory argument
			demandOption: true,
			//specify the title to be string
			type:'string'
		}
	},
	handler:function(argv){
		notes.addNote(argv.title, argv.body)
	}
})

// create remove command

yargs.command({
	command:'remove',
	describe:'Remove a note',
	builder:{
		title: {
			describe: 'Title to delete',
			demandOption: true,
			type:'string'
		}
	},
	handler:function(argv){
		notes.removeNote(argv.title)
	}
})

// create a read command

yargs.command({
	command:'read',
	describe:'Read a note',
	builder:{
		title: {
			describe: 'Title to read',
			demandOption: true,
			type:'string'
		}
	},
	handler:function(argv){
		notes.readNote(argv.title)
	}
})

// create a list command

yargs.command({
	command:'list',
	describe:'List notes',
	handler:function(argv){
		notes.listNotes()
	}
})

yargs.parse()

//yargs should be called otherwise it doesnt pring the output
//console.log(yargs.argv)