const taskInp = document.querySelector('.addTask')
const taskInpBtn = document.querySelector('.addTaskBtn')
    loadTask()
function addTask() {
    task = taskInp.value.trim()
    if(task === ""){
        alert("Dont leave input field empty")
        return
    } else{
        createLi(task)
        taskInp.value = ""
        saveTask()

    }
}

taskInpBtn.addEventListener('click', addTask)
window.addEventListener('keydown', function(e){
    if(e.key === "Enter"){
        addTask()
    }
})

function createLi(task){
    let letters = ["a", "b", "c", "d", "e", "f"]
    let ranId = ""
    for (let i = 0; i <= 5; i++) {
        ranId += letters[Math.round(Math.random() * 5)]
    }
    let li = document.createElement('li')
    li.className = "list-group-item"
    li.innerHTML = `<input class="form-check-input me-1 checkBox" type="checkbox" id="${ranId}Checkbox">
    <label class="form-check-label" for="${ranId}Checkbox">${task.trim()}</label>
    <button type="button" class="btn-close float-end" aria-label="Close"></button>`;
    document.querySelector('.list-group').appendChild(li)
    li.querySelector('.btn-close').addEventListener('click', function(){
        li.remove();
        saveTask();
    });
}

document.querySelector('.delTaskBtn').addEventListener('click', function(){
    document.querySelector('.list-group').innerHTML = ""; // remove all li
    saveTask();
});

function saveTask() {
    const data = document.querySelector('.list-group')
    let tasks = []
    data.querySelectorAll('li').forEach(e =>{
        const label = e.querySelector('label')
        tasks.push(label.textContent.trim());
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTask(){
    let data = localStorage.getItem('tasks')
    for (const i in JSON.parse(data)) {
        createLi(JSON.parse(data)[i])
    }
}