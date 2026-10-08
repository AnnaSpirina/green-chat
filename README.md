# Green Chat

Веб-чат на React для отправки и получения текстовых сообщений в Telegram через [GREEN-API](https://green-api.com/telegram). Интерфейс сделан по мотивам [web.max.ru](https://web.max.ru): слева список чатов, справа переписка.

Демо: [https://green-chat-nu.vercel.app/](https://green-chat-nu.vercel.app/)

## Возможности

- Вход по учётным данным инстанса GREEN-API (`idInstance`, `apiTokenInstance`)
- Сохранение учётных данных в `localStorage`, выход из аккаунта
- Создание чата по номеру телефона: номер приводится к единому виду (`+7 (999) 123-45-67` и `89991234567` приводятся к `79991234567`)
- Отправка текстовых сообщений методом [`sendMessage`](https://green-api.com/telegram/docs/api/sending/SendMessage/)
- Получение входящих сообщений через [HTTP API](https://green-api.com/telegram/docs/api/receiving/technology-http-api/) (`receiveNotification` / `deleteNotification`)
- Список чатов: чат с последним сообщением поднимается наверх, входящее от нового собеседника автоматически создаёт чат
- Многострочные сообщения: Enter отправляет, Shift+Enter переносит строку

## Стек

- React 19 (функциональные компоненты, хуки `useState`, `useEffect`, `useRef`, `useCallback`, кастомный хук `useIncomingMessages`)
- Fetch API, вынесенный в отдельный модуль `api/greenApi.js`
- CSS, CSS-переменные, Flexbox и Grid
- Vite

## Запуск проекта локально

1. Зарегистрируйтесь на [green-api.com](https://green-api.com/telegram), создайте инстанс для Telegram и авторизуйте его через свой Telegram-аккаунт.
2. В настройках инстанса включите получение уведомлений о входящих сообщениях.
3. Скопируйте из личного кабинета `idInstance` и `apiTokenInstance`, они понадобятся для входа в чат.
4. Установите зависимости и запустите проект:

```
npm install
npm run dev
```

Приложение откроется на [http://localhost:5173](http://localhost:5173).

## Сборка

```
npm run build
```

## Ограничения

- Поддерживаются только российские номера (11 цифр, начинаются с 7)
- Отправляются и отображаются только текстовые сообщения
- История переписки хранится в памяти и пропадает после перезагрузки страницы
- Выполнена только декстопная версия приложения