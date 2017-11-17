function Open(event){
	let todoModal = document.getElementById('todoModal'),
		todoBtn = document.getElementById('todoBtn')

	if(todoModal.className === 'todo-wrapper'){
		todoModal.className += ' show';
	}else{
		todoModal.className = 'todo-wrapper'
	}
}
function openLink(event){
	let linkModal = document.getElementById('linkModal'),
		linkBtn = document.getElementById('linkBtn')

	if(linkModal.className === 'link-wrapper'){
		linkModal.className += ' show';
	}else{
		linkModal.className = 'link-wrapper'
	}
}
(function updateClock(){
	let now = new Date(),
	    months = [	'January', 
			        'February', 
			        'March',
			        'April',
			        'May',
			        'June',
			        'July',
			        'August',
			        'September',
			        'October',
			        'November',
			        'December'
	    		],
	hours = ((now.getHours() + 11) % 12 + 1)
	    		
	time = hours + ':' +now.getMinutes()

	document.getElementById('time').innerHTML = time
	setTimeout(updateClock,1000)
})(); //invoking itself
