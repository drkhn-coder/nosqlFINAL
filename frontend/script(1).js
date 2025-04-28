const API_URL = `${location.origin}/api/tasks`;

document.addEventListener("DOMContentLoaded", async () => {
    await loadTasks();

    document.getElementById("addTask").addEventListener("click", addTask);
    document.getElementById("logout").addEventListener("click", logout);
});

// 📌 Загрузка задач
async function loadTasks() {
    try {
        const response = await fetch(API_URL, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        if (!response.ok) throw new Error("Ошибка при загрузке задач");

        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Ошибка загрузки:", error);
    }
}

// 📌 Отрисовка задач
function renderTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
            <p>${task.title}</p>
            <button onclick="deleteTask('${task._id}')">🗑</button>
        `;
        taskList.appendChild(taskElement);
    });
}

// 📌 Добавление задачи
async function addTask() {
    const title = prompt("Введите название задачи:");
    if (!title) return;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ title })
        });

        if (!response.ok) throw new Error("Ошибка при добавлении задачи");
        await loadTasks();
    } catch (error) {
        console.error("Ошибка добавления:", error);
    }
}

// 📌 Удаление задачи
async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });

        if (!response.ok) throw new Error("Ошибка при удалении задачи");
        await loadTasks();
    } catch (error) {
        console.error("Ошибка удаления:", error);
    }
}

// 📌 Выход
function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
}
