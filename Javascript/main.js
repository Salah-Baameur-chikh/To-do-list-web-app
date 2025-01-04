let modeSwitch = document.querySelector('.slider');

// Check the saved mode in local storage when the page loads
window.addEventListener('load', () => {
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

modeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save current mode to local storage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('mode', 'dark');
    } else {
        localStorage.setItem('mode', 'light');
    }
});

let noTasks = document.querySelector('.when-no-tasks');

let taskDiv = document.querySelector('.tasks-container');
let input = document.querySelector('.task-input');
let addTask = document.querySelector('.add-task');

// Empty array to store tasks
let tasksArray = [];

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

// Add task to array and save to local storage
addTask.addEventListener('click', () => {
    if (input.value === '') {
        alert('Please enter a task');
    } else {
        noTasks.style.display = 'none';
        let task = {
            text: input.value,
            completed: false,
        };
        tasksArray.push(task);
        renderTask(task);
        input.value = '';
        saveTasks();
    }
});

// Render task
function renderTask(task) {
    taskDiv.innerHTML += `
    <div class="task">
        <div class="left">
            <label class="completed-task">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <div class="checkmark"></div>
            </label>
            <p>${task.text}</p>
        </div>
        <button type="button" class="delete-task"><i class="fa-solid fa-trash fa-sm"></i></button>
    </div>
    `;
}

// Load tasks from local storage
function loadTasks() {
    let storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasksArray = JSON.parse(storedTasks);
        tasksArray.forEach(task => {
            noTasks.style.display = 'none';
            renderTask(task);
        });
    }
}

// Update task completion status
taskDiv.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        let taskText = e.target.closest('.task').querySelector('p').textContent;
        tasksArray = tasksArray.map(task => {
            if (task.text === taskText) {
                task.completed = e.target.checked;
            }
            return task;
        });
        saveTasks();
    }
});

// Delete task
taskDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-task')) {
        let taskElement = e.target.closest('.task');
        let taskText = taskElement.querySelector('p').textContent;
        taskElement.remove();
        tasksArray = tasksArray.filter(task => task.text !== taskText);
        saveTasks();
        if (tasksArray.length === 0) {
            noTasks.style.display = 'block';
        }
    }
});

// Load tasks when the page loads
window.addEventListener('load', loadTasks);