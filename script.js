function createTodoList(title) {
    const checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';

    const label = document.createElement("label");
    label.innerText = title;
    label.className = 'title';

    const textfield = document.createElement("input");
    textfield.type = 'text';
    textfield.className = 'textfield';

    const edit = document.createElement('button');
    edit.innerText = 'Изменить';
    edit.className = 'edit';
    edit.onclick = () => editTodo(label, textfield);

    const deleteb = document.createElement('button');
    deleteb.innerText = 'Удалить';
    deleteb.className = 'delete';
    deleteb.onclick = () => deleteTodo(label.innerText);

    const listitem = document.createElement('li');
    listitem.className = 'todo-item';
    listitem.append(checkbox, label, textfield, edit, deleteb);

    return listitem;
}

function addTodoForm(event) {
    event.preventDefault();
    const title = addinput.value.trim();

    if (!title) return alert("Введите название задачи.");

    const listitem = createTodoList(title);
    todolist.appendChild(listitem);
    addinput.value = "";
}

function deleteTodo(todoTitle) {
    const labels = Array.from(document.querySelectorAll('.todo-item .title'));
    labels.forEach(label => {
        if (label.innerText === todoTitle) {
            const listItem = label.closest('.todo-item');
            listItem.remove();
        }
    });
}

function editTodo(label, textfield) {
    // Заполняем поле ввода текущим значением
    addinput.value = label.innerText; 
    butt.innerHTML = "Сохранить"; // Меняем текст кнопки

    // Удаляем старый обработчик
    todoform.onsubmit = function(event) {
        event.preventDefault();
        saveEdit(label);
    };
}

function saveEdit(label) {
    const newTitle = addinput.value.trim();

    if (!newTitle) return alert("Введите название задачи.");

    label.innerText = newTitle; // Обновляем текст метки
    addinput.value = ""; // Очищаем поле ввода
    butt.innerHTML = "Добавить"; // Меняем текст кнопки обратно

    // Восстанавливаем оригинальный обработчик события добавления
    todoform.onsubmit = addTodoForm;
}

const todoform = document.getElementById("todo-form");
const addinput = document.getElementById("add-input");
const todolist = document.getElementById("todo-list");
const butt = document.getElementById('add-button');

// Добавляем обработчик события для добавления новой задачи
todoform.addEventListener('submit', function(event) {
    // Если кнопка "Сохранить" была нажата
    if (butt.innerHTML === "Сохранить") {
        // Сохранение изменений в существующей задаче
        event.preventDefault(); // Останавливаем стандартное поведение формы
        const labels = Array.from(todolist.querySelectorAll('.title'));
        labels.forEach(label => {
            if (label.innerText === addinput.value) {
                saveEdit(label);
            }
        });
    } else {
        // Добавление новой задачи
        addTodoForm(event);
    }
});