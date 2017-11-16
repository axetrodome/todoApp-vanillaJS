var todoModal = document.getElementById('todoModal')
var todoBtn = document.getElementById('todoBtn')

todoBtn.addEventListener('click',Open)

function Open(){
	if(todoModal.className === 'todo-wrapper'){

		todoModal.className += ' show';
	}else{
		todoModal.className = 'todo-wrapper'
	}
}