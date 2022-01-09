"use strict";



let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo-ul');

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', () => {
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        delete: false
    };

    todoList.push(newTodo);
    displayMessages();

    localStorage.setItem('todo', JSON.stringify(todoList));

    addMessage.value = "";
});

function displayMessages() {
    let displayMessage = "";

    if (todoList.length === 0) {
        todo.innerHTML = '';
    }
    todoList.forEach(function(item, i){
        displayMessage += `
        <li class="list-item">
            <input type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>
            <label for="item_${i}" class="${item.delete ? 'delete' : ''}">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('change', function(event) {
    let idInput = (event.target.getAttribute('id'));
    let forLabel = todo.querySelector('[for='+ idInput + ']');
    let valueLabel = forLabel.innerHTML;

    todoList.forEach(item => {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault();

    todoList.forEach(function(item, index) {
        if (item.todo === event.target.innerHTML)
        {
            todoList.splice(index, 1);
        }
        displayMessages();
        localStorage.setItem('todo', JSON.stringify(todoList));
    });
});

// alert('Добавить дело - клик по лапке');
// alert('Удалить дело - ПКМ по делу');