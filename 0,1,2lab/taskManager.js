function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        let task = document.createElement("li");

        task.innerHTML =
            `<div>
                <button class="complete" onclick="toggleTask(this)"></button>
            </div>
            <div class="task-details">
                <div class="task-text">${taskInput.value}</div>
                <div class="task-date"><sub>от ${date_time()}</sub></div>
            </div>
            <div>
                <button class="delete" onclick="delCurTask(this)"></button>
            </div>`;

        taskList.appendChild(task);
        taskInput.value = "";
    
        saveTasks();
    }
}

function toggleTask(button) {
 
    var listItem = button.closest('li');

 
    listItem.classList.toggle('completed-bg');

 
    var taskText = listItem.querySelector('.task-text');

 
    taskText.classList.toggle('completed');
    saveTasks();
}

function delCurTask(button) {
    let task = button.parentElement.parentElement;
    task.remove();
    saveTasks();
}

function delAllTask() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    saveTasks();
}

 

function filterTasks(filter) {
    const tasks = document.querySelectorAll('#taskList li');

    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed-bg':
                if (task.classList.contains('completed-bg')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!task.classList.contains('completed-bg')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    });
}

function sortTasks(){
    const taskList = document.getElementById("taskList");
    const tasks = Array.from(taskList.querySelectorAll("li"));

    const sortOption = document.getElementById("sortOptions").value;

   
    switch (sortOption) {
        case "newest":
            tasks.sort((a, b) => {
                const textB = b.querySelector(".task-date").innerText.toLowerCase();
                const textA = a.querySelector(".task-date").innerText.toLowerCase();
                return textB.localeCompare(textA);
            });
            break;
        case "oldest":
            tasks.sort((a, b) => {
                const textB = b.querySelector(".task-date").innerText.toLowerCase();
                const textA = a.querySelector(".task-date").innerText.toLowerCase();
                return textA.localeCompare(textB);
            });
            break;
        case "az":
            tasks.sort((a, b) => {
                const textA = a.querySelector(".task-text").innerText.toLowerCase();
                const textB = b.querySelector(".task-text").innerText.toLowerCase();
                return textA.localeCompare(textB);
            });
            break;
        case "za":
            tasks.sort((a, b) => {
                const textA = a.querySelector(".task-text").innerText.toLowerCase();
                const textB = b.querySelector(".task-text").innerText.toLowerCase();
                return textB.localeCompare(textA);
            });
            break;
    }

 
    tasks.forEach(task => task.remove());

 
    tasks.forEach(task => taskList.appendChild(task));
}

 
function saveTasks() {
    const tasks = document.querySelectorAll("#taskList li");

    const tasksData = [];

    tasks.forEach(task => {
        const taskText = task.querySelector(".task-text").innerText;
        const taskDate = task.querySelector(".task-date").innerText;
        const taskCompleted = task.classList.contains("completed-bg");

  
        tasksData.push({
            text: taskText,
            date: taskDate,
            completed: taskCompleted
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasksData));
    console.log("Сохранение выполнено");
}

 
function loadTasks() {
    const tasksData = localStorage.getItem("tasks");
    
 
    if (tasksData) {
        const tasks = JSON.parse(tasksData);
 
        tasks.forEach(task => {
            const taskList = document.getElementById("taskList");
            const newTask = document.createElement("li");

            newTask.innerHTML = `
                <div>
                    <button class="complete" onclick="toggleTask(this)"></button>
                </div>
                <div class="task-details">
                    <div class="task-text">${task.text}</div>
                    <div class="task-date"><sub>${task.date}</sub></div>
                </div>
                <div>
                    <button class="delete" onclick="delCurTask(this)"></button>
                </div>`;

 
            if (task.completed) {
                newTask.classList.add('completed-bg');
                newTask.querySelector('.task-text').classList.add('completed');
            }

            taskList.appendChild(newTask);
        });
    }
}

 
window.onload = function() {
    loadTasks();
}
