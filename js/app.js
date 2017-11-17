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
	    hours = now.getHours(),
	    minutes = now.getMinutes(),
	    getDayTime = new DayTime(hours,minutes)
	// hours = ((hours + 11) % 12 + 1)
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