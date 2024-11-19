document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input"); // Поле для ввода задачи
    const addTaskBtn = document.getElementById("add-task-btn"); // Кнопка добавления задачи
    const taskList = document.getElementById("task-list"); // Список задач
    const clearAllBtn = document.getElementById("clear-all-btn"); // Кнопка очистки всех задач
     
     

    // Обработчик для кнопки добавления задачи
    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = ""; // Очистка поля ввода
            clearAllBtn.style.display = "inline-block"; // Показать кнопку "Clear All"
        }
    });

    // Функция для добавления новой задачи
    function addTask(taskText) {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="flex justify-between items-center">
                <span class="task-text">${taskText}</span>
                <input type="datetime-local" class="expected-completion">
                <button class="edit-btn bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded">Edit</button>
                <button class="complete-btn bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded">Completed</button>
                <button class="delete-btn bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">Delete</button>
                <button class="increase-txt-btn bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">increase-txt</button>
            </div>
        `;

        // Обработчик для кнопки "Completed"
        const completeBtn = li.querySelector(".complete-btn");
        completeBtn.addEventListener("click", function () {
            li.classList.toggle("completed"); // Отметка задачи как выполненной
        });

        // Обработчик для кнопки "Delete"
        const deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function () {
            li.remove(); // Удаление задачи
            if (taskList.children.length === 0) {
                clearAllBtn.style.display = "none"; // Скрыть кнопку "Clear All"
            }
        });

        // Обработчик для кнопки "Edit"
        const editBtn = li.querySelector(".edit-btn");
        editBtn.addEventListener("click", function () {
            editTask(li); // Вызов функции редактирования задачи
        });

        // Добавление класса анимации с небольшой задержкой
        setTimeout(function () {
            li.classList.add("task-entry");
        }, 10);

        taskList.appendChild(li);
    }

    // Функция редактирования задачи
    function editTask(taskItem) {
        const taskTextElement = taskItem.querySelector(".task-text");
        const currentText = taskTextElement.textContent;

        // Создание поля ввода для редактирования задачи
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = currentText;
        editInput.classList.add("edit-input");
        
        // Заменяем текст задачи на поле ввода
        taskTextElement.replaceWith(editInput);

        // Фокусируемся на поле ввода
        editInput.focus();

        // Обработчик потери фокуса или нажатия Enter для завершения редактирования
        editInput.addEventListener("blur", function () {
            saveEdit(taskItem, editInput);
        });

        editInput.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                saveEdit(taskItem, editInput);
            }
        });
    }

    // Функция для сохранения изменений задачи
    function saveEdit(taskItem, editInput) {
        const newText = editInput.value.trim();
        const taskTextElement = document.createElement("span");
        taskTextElement.classList.add("task-text");
        taskTextElement.textContent = newText !== "" ? newText : "Untitled Task";

        editInput.replaceWith(taskTextElement); // Заменить поле ввода на текст задачи
    }

    // Добавление задачи по нажатию Enter
    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskBtn.click();
        }
    });

    // Очистка всех задач
    clearAllBtn.addEventListener("click", function () {
        taskList.innerHTML = ""; // Удаление всех задач из списка
        clearAllBtn.style.display = "none"; // Скрыть кнопку "Clear All"
    });
});



const increaseTextBtn = li.querySelector(".increase-text-btn");
increaseTextBtn.addEventListener("click", function () {
    const taskTextElement = li.querySelector(".task-text");
    taskTextElement.classList.toggle("large-text");
});



//if (taskTextElement.style.display === "none") {
    //taskTextElement.style.display = "inline"; // Показать текст
//} else {
  //  taskTextElement.style.display = "none"; // Скрыть текст
//}
//});