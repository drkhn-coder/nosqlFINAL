 Task Management System  

 Описание проекта  
Простая система управления задачами с регистрацией, авторизацией и управлением задачами. Использует Node.js, Express, MongoDB и JWT для аутентификации.  

Установка и запуск  

1. Клонирование репозитория  

git clone https://github.com/drkhn-coder/nosqlFINAL
cd task-manager


2. Установка зависимостей  
Перейдите в папку `backend` и установите зависимости:  
cd backend
npm install

Перейдите в папку `frontend` и установите зависимости:  

cd ../frontend
npm install


3. Настройка окружения  
Создайте файл `.env` в папке `backend` и добавьте туда:  

PORT=5000
MONGO_URI=mongodb+srv://darkhan228:darkhan228@cluster0.ff7sm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_secret_key


4. Запуск проекта  
Запустите сервер:  

cd backend
node server.js

Запустите фронтенд (если нужен `live-server`):  

cd ../frontend
live-server


API Документация  

Аутентификация  
| Метод | URL                 | Описание                    |
|--------|--------------------|-----------------------------|
| POST   | `/api/auth/register` | Регистрация пользователя   |
| POST   | `/api/auth/login`    | Авторизация пользователя   |

Управление задачами  
| Метод | URL              | Описание                     |
|--------|-----------------|------------------------------|
| GET    | `/api/tasks`    | Получить список задач       |
| POST   | `/api/tasks`    | Добавить новую задачу       |
| PUT    | `/api/tasks/:id` | Обновить задачу по ID       |
| DELETE | `/api/tasks/:id` | Удалить задачу по ID        |

Управление пользователями (для админа)  
| Метод | URL              | Описание                     |
|--------|-----------------|------------------------------|
| GET    | `/api/users`    | Получить список пользователей |
| GET    | `/api/users/:id` | Получить профиль пользователя |
| PUT    | `/api/users/:id` | Обновить данные пользователя |
| DELETE | `/api/users/:id` | Удалить пользователя |

Фронтенд  
Сайт включает:  
- Страницу входа / регистрации  
- Страницу списка задач  