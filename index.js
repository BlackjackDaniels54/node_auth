// Подключаем необходимые библиотеки: express для создания веб-приложения и mongoose для работы с MongoDB.
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter')
// Задаем переменную PORT, которая будет использоваться как порт для запуска веб-сервера.
// Если переменная окружения PORT определена, используем ее, иначе используем порт 5000.
const PORT = process.env.PORT || 5000;

// Создаем экземпляр веб-приложения с помощью express.
const app = express();

// Используем middleware express.json() для обработки JSON-запросов.
app.use(express.json());
app.use("/auth", authRouter);

// Определяем асинхронную функцию start, которая будет вызываться при запуске сервера.
const start = async () => {
    try {
        // Устанавливаем соединение с MongoDB, используя строку подключения.
        await mongoose.connect('mongodb+srv://bj_prod:zp210301@jackcluster.vhryt4s.mongodb.net/?retryWrites=true&w=majority');
        
        // Запускаем веб-сервер на указанном порту и выводим сообщение в консоль.
        console.log(`Server started on port: ${PORT}`);
        app.listen(PORT);
    } catch(e) {
        // В случае ошибки выводим ее в консоль.
        console.log(e);
    }
}

// Вызываем функцию start для запуска сервера.
start();