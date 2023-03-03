const newTask       = document.querySelector("#new-task")
const btnAddTask    = document.querySelector("#add-task")
const todoList      = document.querySelector(".todo-list ul")
const doneList      = document.querySelector(".complete-list ul")

// Funções
const checkDone = function (event) {
    const task = event.target.parentNode
    const taskText = task.innerText

    todoList.removeChild(task)

    const taskDoneExample = document.querySelector("#task-done-example")
    if(taskDoneExample !== null) {
        doneList.removeChild(taskDoneExample)
    }

    const undo = addListItem(doneList, taskText, true)

    undo.addEventListener("change", function(ev) {
        const taskUndo = undo.parentNode
        const taskUndoText = task.innerText

        doneList.removeChild(taskUndo)

        const cb = addListItem(todoList, taskUndoText)
        cb.addEventListener("change", checkDone)
    })
}

const addListItem = function (list, value, checked = false) {
    const li    = document.createElement("li")
    const check = document.createElement("input") 
    const label = document.createElement("label")
    label.innerText = value
    check.setAttribute("type", "checkbox")
    li.appendChild(check)
    li.appendChild(label)
    list.appendChild(li)

    if(checked) {
        check.setAttribute("checked", "checked")
    }

    return check
}

// Eventos
btnAddTask.onclick = function() {
    const taskExample = document.querySelector("#task-example")
    if(taskExample !== null) {
        todoList.removeChild(taskExample)
    }
    
    const check = addListItem(todoList, newTask.value)

    newTask.value = ""
    newTask.focus()

    check.addEventListener("change", checkDone)

}

newTask.onkeyup = function(event) {
    if(event.keyCode === 13) {
        btnAddTask.click()
    }
}