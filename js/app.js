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
	    hours = (now.getHours() % 12)
	    minutes = now.getMinutes(),
	    getDayTime = new DayTime(hours,minutes)
	time = getDayTime.getTime() + '<small class="small">' + getDayTime.AmPm + '</small>';
	greetings = getDayTime.Greetings

	document.getElementById('time').innerHTML = time
	document.getElementById('greetings').innerHTML = greetings

	setTimeout(updateClock,1000)
})(); //invoking itself
function DayTime(hours,minutes){
	this.hours = hours
	this.minutes = minutes
	if(this.hours <= 12){
		this.AmPm = 'AM'
		this.Greetings = 'Good Morning'
	}else{
		this.AmPm = 'PM'
		this.Greetings = 'Good Morning'
	}
	this.getTime = () => {
		return time = this.hours + ':' + (this.minutes < 10 ? '0' : '') + this.minutes;
	}
}

//its time for local storage thing
let form = document.getElementById('todoForm'),
	selectedIndex = -1

form.addEventListener('submit',saveTodo)
function saveTodo(event){
	event.preventDefault()
	let todoInput = document.getElementById('todoInput').value,
	 	todoList = {
		task:todoInput
	}
	if(localStorage.getItem('todoLists') === null){
		let todoLists = []
		todoLists.push(todoList)
		localStorage.setItem('todoLists',JSON.stringify(todoLists))
	}else{
		let todoLists = JSON.parse(localStorage.getItem('todoLists'))

		todoLists.push(todoList)
		localStorage.setItem('todoLists',JSON.stringify(todoLists))
	}
	form.reset()
	fetchTodoList();
}
function deleteTask(task){
	var todoLists = JSON.parse(localStorage.getItem('todoLists'))
	for(var i = 0;i < todoLists.length;i++){
		if(todoLists[i].task === task){
			todoLists.splice(i,1)
		}
	}
	localStorage.setItem('todoLists',JSON.stringify(todoLists))
	fetchTodoList();
}
function fetchTodoList(){
	var todoLists = JSON.parse(localStorage.getItem('todoLists')),
		todoListResult = document.getElementById('todoListResult')

	todoListResult.innerHTML = ''
	for(var i = 0; i < todoLists.length;i++){
		var task = todoLists[i].task
		todoListResult.innerHTML += '<li>' + task + '<span onclick="deleteTask(\''+ task +'\')">&times;</span></li>'
	}
}
fetchTodoList()
