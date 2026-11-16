# Signy — сайт электронного документооборота

React 18 + TypeScript (strict) + Tailwind 3 + React Router 6 (data router) + React Hook Form + Zod + three.js

## Запуск
```bash
npm install
npm run dev        # разработка
npm run build      # проверка типов + production-сборка (с CSP meta)
npm run preview
```

## Структура (FSD)
`src/app` — роутер, layout · `src/pages` — страницы · `src/widgets` — блоки (header, footer, hero, home, blog, video)
`src/features` — auth, forms, demo-popup, cookie · `src/entities` — article, video · `src/shared` — api, security, ui, hooks, lib, config

## API (jsonplaceholder.typicode.com)
- `GET /posts`, `GET /posts/:id`, `GET /posts/:id/comments` — блог и статья (loader'ы роутера)
- `GET /users?email=` — вход, `POST /users` — регистрация, `POST /posts` — формы (демо, контакты, FAQ, подписка)
- Вход в демо: e-mail пользователя jsonplaceholder (например `Sincere@april.biz`) и пароль `signy1234`;
  зарегистрированные локально пользователи входят со своим паролем.

## Безопасность (по слайду «Итоги»)
| Тема | Где |
|---|---|
| Модель угроз | все ответы API, URL-параметры и данные из storage парсятся Zod: `shared/api/schemas.ts`, `postLoader`, `authStorage.ts` |
| SOP / CORS | allow-list origin, `credentials: 'omit'`: `shared/security/origin.ts`, `shared/api/http.ts` |
| XSS / textContent | текст — только React-узлами; HTML — только `SafeHtml` → DOMPurify: `shared/security/sanitize.ts` |
| Trusted Types | `trustedTypes.ts` + `require-trusted-types-for 'script'` в CSP |
| CSP | meta в сборке (`vite.config.ts`) и заголовки в `public/_headers` |
| CSRF и фреймы | `X-CSRF-Token` на мутациях, `SameSite` для cookie на бэке, `frame-ancestors 'none'` + `preventFraming()` |

`nonce` и `frame-ancestors` работают только как HTTP-заголовки — настройте их на хостинге (пример в `public/_headers`).

## 3D
404 — three.js (НЛО, луч, цифры-текстуры, параллакс за курсором), поп-ап — вращающийся конверт, карточки — 3D-наклон, вход — парящие документы (CSS 3D).


## Локализация и внешние сервисы

- Переключатель языка в шапке: русский, тоҷикӣ, English. Выбор сохраняется в `localStorage` под ключом `signy-language`.
- Видеоуроки встроены через YouTube Privacy Enhanced Mode (`youtube-nocookie.com`). Карточки с мемами открывают тематическую выдачу YouTube.
- Фото из переданного `foto.zip` размещены в `src/shared/assets/` и используются в карточках/блоках вместо части иллюстративных заглушек.
- Карта на странице контактов — встроенный Google Maps поиск по ТЦ «Баракат» в Душанбе; отдельные ссылки открывают поиск маршрута к ТЦ «Баракат» и Alif Academy. Уточните точный адрес/корпус Alif Academy перед публикацией.

## Авторизация и заявки: текущий статус

**Важно: frontend-проект пока не содержит собственного backend и базы данных.** В текущем демо авторизация использует браузерное хранилище: список тестовых пользователей — `localStorage` (`signy-users`), текущая сессия — `sessionStorage` (`signy-session`). Временная регистрация также обращается к JSONPlaceholder, который не сохраняет реальные аккаунты. Это не production-авторизация; не используйте её для реальных пользователей.

Для production нужно подключить backend и БД (например PostgreSQL): хранить пароль только как Argon2id/bcrypt hash на сервере, выдавать защищённую HttpOnly/Secure/SameSite cookie, проверять CSRF и валидировать данные на сервере. Никогда не хранить пароль или его хеш в браузерном `localStorage`.

**Заявки с форм** отправляются на `POST {VITE_API_URL}/leads`. Если переменная не задана, форма покажет ошибку подключения вместо ложного сообщения об успешной отправке. Backend должен принимать JSON с полями формы и возвращать JSON вида `{ "id": 123 }` (числовой `id`). Скопируйте `.env.example` в `.env` и укажите URL реального API. Также настройте CORS/CSRF и серверную валидацию.

Анимация CyberSuccess запускается только после успешного ответа backend — она не подтверждает отправку, если сервер недоступен.

При подключении backend добавьте его точный HTTPS-домен в `connect-src` заголовка Content-Security-Policy в `public/_headers` (и настройте CORS на сервере).
