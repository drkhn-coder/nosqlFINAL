const apiUrl = "/api/auth"; // Базовый URL API

// Функция переключения между формами
function toggleForms() {
    document.getElementById("login-form").classList.toggle("hidden");
    document.getElementById("register-form").classList.toggle("hidden");
}

// Регистрация пользователя
async function register() {
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const username = document.getElementById("username").value;

    try {
        const response = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Регистрация успешна! Теперь войдите в систему.");
            toggleForms(); // Переключаемся на логин
        } else {
            alert(`Ошибка: ${data.message}`);
        }
    } catch (error) {
        console.error("Ошибка регистрации:", error);
        alert("Ошибка при регистрации.");
    }
    
}

// Авторизация пользователя
async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token); // Сохраняем токен
            window.location.href = "tasks.html"; // Перенаправляем на страницу задач
        } else {
            alert(`Ошибка: ${data.message}`);
        }
    } catch (error) {
        console.error("Ошибка авторизации:", error);
        alert("Ошибка при входе.");
    }
}

// Выход из системы
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html"; // Возвращаемся на страницу входа
}
