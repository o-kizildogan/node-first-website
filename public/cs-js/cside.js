//client-side javascript. Not node.js

console.log('This is from the client side script')

//fetch json data from a URL http://puzzle.mead.io/puzzle


//select the html form, e is for event

const formNote =document.getElementById('form-note')

const titleValue = document.getElementById('title')

const bodyValue = document.getElementById('body')

formNote.addEventListener('submit',(e) => {
	e.preventDefault()
	const theTitle = titleValue.value
	const theBody = bodyValue.value
	console.log(theTitle)
	console.log(theBody)
})