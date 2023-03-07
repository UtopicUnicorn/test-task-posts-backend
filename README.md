# test-task-posts-backend
### Небольшое тестовое задание по созданию backend-приложения, которое в ответ на запрос отправляет сформированный массив из пользователей и постов

##Инструкция по работе с проектом 
1. Скачать репозиторий
```bash 
git clone git@github.com:UtopicUnicorn/test-task-posts-backend.git
```
2. Перейти в директорию с проектом
3. Установить зависимости
```bash
npm install
```

4. Запуск проекта
```bash
npm run start
```

5. Для получения результата необходимо открыть страницу в браузере или сделать get запрос в Postman по адресу http://localhost:3000


6. Сборка Docker контейнера
```bash
sudo docker build -t nodejs-app . 
```

7. Запуск Docker контейнера
```bash
docker run --name nodejs-app -p 3000:3000 nodejs-app
```
 
## Реализованный функционал
1. В ответе, при запросе на сервер, формируется массив из пользователей и их постов;
2. Выполнена дополнительная задача - обоготить посты пользователя под именем "Ervin Howell" комментарими.

## Дополнительная реализация
1. Добавлена возможность собрать docker контейнер.

## Возможные доработки
1. Добавить заглушки для других типов завросов;
2. Покрыть функционал тестами.

