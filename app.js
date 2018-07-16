//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks)

    //add task event
    form.addEventListener('submit', addTask);

    //remove task event
    taskList.addEventListener('click', removeTask);

    //clear task event
    clearBtn.addEventListener('click', clearTasks);
}

//Get tasks from local storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create li element
        const li = document.createElement('li');
        //add class to new li
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));

        //create new link element (task delete button)
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
    });
}

//Add task to the ul list
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add task');
    } else {
        //create li element
        const li = document.createElement('li');
        //add class to new li
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));

        //create new link element (task delete button)
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);

        //append li to ul
        taskList.appendChild(li);
        //console.log(li);

        //store in local storage
        storeTaskInLocalStorage(taskInput.value);

        //clear input
        taskInput.value = '';

        e.preventDefault();
    }
}

//Store task in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task - click on X remove li element (i -> a -> li)
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //remove from local storage after clicking X
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks button
function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //clear from local storage
    clearTasksFromLocalStorage();
}

//Clear tasks from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

