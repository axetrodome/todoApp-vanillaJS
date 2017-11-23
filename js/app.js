
function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = 'none';
      el.classList.add('is-hidden');
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display){
  if (el.classList.contains('is-hidden')){
    el.classList.remove('is-hidden');
  }

    el.style.opacity = 0;
    el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
			el.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
}
// refator later
var linkbtn = document.querySelector('.link-btn'),
	linkel = document.querySelector('.link-wrapper'),
	todobtn = document.querySelector('.todo-btn'),
	todoel = document.querySelector('.todo-wrapper')


linkbtn.addEventListener('click',function(e){
	if(linkel.classList.contains('is-hidden')){
		fadeIn(linkel);
	}else{
		fadeOut(linkel);
	}
})

todobtn.addEventListener('click',function(e){
	if(todoel.classList.contains('is-hidden')){
		fadeIn(todoel);
	}else{
		fadeOut(todoel);
	}
})

//end refactor later



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
	    hours = now.getHours(),
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
	if(this.hours < 12){
		this.AmPm = 'AM'
		this.Greetings = 'Good Morning'
	}else if(this.hours >= 12 && this.hours <= 18){
		this.AmPm = 'PM'
		this.Greetings = 'Good Afternoon'
	}else{
		this.AmPm = 'PM'
		this.Greetings = 'Good Evening'
	}
	this.getTime = () => {
		return time = (this.hours == 12 || this.hours == 0 ? 12 : (this.hours % 12)) + ':' + (this.minutes < 10 ? '0' : '') + this.minutes;
	}
}
//forms
var todoForm = document.getElementById('todoForm'),
	linkForm = document.getElementById('linkForm'), //remove
	mainFocusForm = document.getElementById('mainFocusForm'),
	userName = document.getElementById('userName'),
	selectedIndex = -1
//event listeners
todoForm.addEventListener('submit',saveTodo)
linkForm.addEventListener('submit',saveLink)//remove ithink
mainFocusForm.addEventListener('submit',saveMainFocus)
userName.addEventListener('click',editName)

//actions
function editName(event){
	event.preventDefault()
	userName.setAttribute('contenteditable','true')
	var name = userName.innerHTML,
		formObject = {
			id:Date.now(),
			name:name
		},
		storage = 'user',
		currName = []
	userName.addEventListener('blur',() => {
		insertOnefn(formObject,storage,currName)
		console.log(name)

		fetchName()

	})
	// console.log('gg ez')
}
function insertOnefn(formObject,storage,arrayContainer){
	this.formObject = formObject
	this.storage = storage
	this.arrayContainer = arrayContainer

	if(localStorage.getItem(storage) === null){
		this.arrayContainer.push(this.formObject)
		localStorage.setItem(storage,JSON.stringify(this.arrayContainer))

	}else{
		this.arrayContainer = JSON.parse(localStorage.getItem(storage))
		this.arrayContainer.splice(0,1,this.formObject);
		localStorage.setItem(storage,JSON.stringify(this.arrayContainer))
	}
}
function fetchName(){
	var fetchName = JSON.parse(localStorage.getItem('user'))
		userName.innerHTML = ``
	if(!fetchName){
		userName.innerHTML += ` Enter name `
	}else{
		var name = fetchName.slice(-1).pop()
		userName.innerHTML += fetchName.slice(-1).pop().name
	}
}

function saveLink(event){
	event.preventDefault()
	var URL = document.getElementById('URL').value,
		name = document.getElementById('name').value,
		LinkData = document.getElementById('linkListResult'),
		storage = 'linkLists',
		formObject = {
			id:Date.now(),
			URL:URL,
			name:name
		},
		linkLists = [],
		obj =  {
		  fields: {
		    '#URL': {
		      required: true,
		      maxlength:3
		    },
		    '#name': {
		      maxlength: 4
		    } 
		  }
		}
	if(!validator('#linkForm',obj)){
		return false
	}else{
		insert(formObject,storage,linkLists)
		linkForm.reset()
		fetchLinkList()
	}

}
function saveTodo(event){
	event.preventDefault()
	var todoInput = document.getElementById('todoInput').value,
		TodoData = document.getElementById('todoListResult'),
		storage = 'todoLists'
	 	todoObject = {
	 		id:Date.now(),
			task:todoInput
		},
		todoLists = [],
		obj = {
			fields:{
				'#todoInput':{
					required:true,
					maxlength:4
				}
			}
		}

		//validation
	if(!validator('#todoForm',obj)){
		return false
	}else{

		insert(todoObject,storage,todoLists)

		todoForm.reset()

		fetchTodoList()
	}
	
}
function saveMainFocus(event){
	event.preventDefault()
	var mainInput = document.getElementById('main-input').value,
		mainFocusResult = document.getElementById('mainFocusResult'),
		storage = 'mainFocus',
		mainFocusObject = {
			id:Date.now(),
			taskName:mainInput
		},
		mainArray = [],
		obj = {
			fields:{
				'#main-input':{
					required:true,
					maxlength:4
				}
			}
		}

	if(!validator('#mainFocusForm',obj)){
		return false
	}else{
		
		insertOnefn(mainFocusObject,storage,mainArray)

		mainFocusForm.reset()
		
		fetchMainFocusList();
	}
}



// insert
function insert(formObject,storage,arrayContainer){
	this.formObject = formObject
	this.storage = storage
	this.arrayContainer = arrayContainer

	if(localStorage.getItem(storage) === null){
		this.arrayContainer.push(this.formObject)
		localStorage.setItem(storage,JSON.stringify(this.arrayContainer))

	}else{
		this.arrayContainer = JSON.parse(localStorage.getItem(storage))
		this.arrayContainer.push(this.formObject)
		localStorage.setItem(storage,JSON.stringify(this.arrayContainer))
	}
}


function deleteTask(id,storage){
	var data = JSON.parse(localStorage.getItem(storage))
	for(var i = 0;i < data.length;i++){
		if(data[i].id === id){
			data.splice(i,1)
		}
	}
	localStorage.setItem(storage,JSON.stringify(data))

	fetchTodoList();
	fetchLinkList();
	fetchMainFocusList();
	fetchName();

}

//show
function fetchTodoList(){
	var todoLists = JSON.parse(localStorage.getItem('todoLists')),
		todoListResult = document.getElementById('todoListResult')
	todoListResult.innerHTML = ``
	if(!todoLists.length){

		todoListResult.innerHTML += `<li><h2>Empty List</h2></li>`
	}else{
		for(var i = 0; i < todoLists.length;i++){
			var task = todoLists[i].task,
				id = todoLists[i].id

			todoListResult.innerHTML += `<li>${task}<span onclick="deleteTask(${id},'todoLists')">&times;</span></li>`
		}
	}

}
function fetchLinkList(){
	var linkLists = JSON.parse(localStorage.getItem('linkLists')),
		linkListResult = document.getElementById('linkListResult')

	linkListResult.innerHTML = ``
	if(!linkLists.length){
		linkListResult.innerHTML += `<li><h2>Empty List</h2></li>`
	}else{
		for(var i = 0; i < linkLists.length;i++){
			var URL = linkLists[i].URL,
				name = linkLists[i].name,
				id = linkLists[i].id

			linkListResult.innerHTML += `<li><a href="${URL}" target="_blank">${name}</a><span onclick="deleteTask(${id},'linkLists')">&times;</span></li>`
		}
	}
}
function fetchMainFocusList(){
	var mainFocus = JSON.parse(localStorage.getItem('mainFocus')),
		mainFocusResult = document.getElementById('mainFocusResult'),
		mainInput = document.getElementById('main-input')

	mainFocusResult.innerHTML = ``
	if(!mainFocus.length){
		mainInput.style.display = "block"
	}else{
		for(var i = 0; i < mainFocus.length;i++){
			var taskName = mainFocus[i].taskName,
				id = mainFocus[i].id
			mainFocusResult.innerHTML += `<li>${taskName}<span onclick="deleteTask(${id},'mainFocus')">&times;</span></li>`
			mainInput.style.display = "none"
		}
	}
}

function validator(form,obj){
	var form = document.querySelector(form)
	var elFields = obj.fields || {};

	for(field in elFields){
		var el = document.querySelector(field)
			elVal = el.value
		if(elVal.trim() === '' || elVal.length < elFields[field].maxlength){
			return false;
		}
	}
	return true
}


fetchTodoList()
fetchLinkList()
fetchMainFocusList()
fetchName()
// add user 
// add logo
//add editing data
//call the
//refator fetching!
