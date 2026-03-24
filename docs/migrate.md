# Миграция

## Версия 2.0

Новая политика Spotify API ограничела доступ к важным функциям. Подробнее [здесь](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api).
Чтобы вернуть доступ в goofy 2.0 запросы делятся между двумя приложениями: вашим и приватным. На данный момент приватное приложение продолжает отвечать на запросы к закрытой части API.

1. Зайдите в [Spotify Dashboard](https://developer.spotify.com/dashboard)
2. Выберите приложение для goofy
3. Нажмите кнопку `Settings`
4. Посмотрите статус в поле `App Status` (понадобится дальше)
5. Спуститесь ниже и добавьте в `Redirect URLs` новую ссылку: `https://chimildic.github.io/spotify/auth`
6. Откройте проект в Apps Script
7. Зайдите в файл `config` и добавьте две новые строчки в функцию `setProperties`. Пример как должно выглядеть [здесь](https://github.com/Chimildic/goofy/blob/main/config.js).
```js
  UserProperties.setProperty('PRIVATE_CLIENT_ID', 'вашеЗначение');
  UserProperties.setProperty('PRIVATE_CLIENT_SECRET', 'вашеЗначение');
```

- Если ваш статус `Development mode`, перейдите по [ссылке](https://script.google.com/macros/s/AKfycbwwDT25i71nYAk1aICxnrXfFVDzctcmhRMqzugjEkpqmUWjGATAbMOCL5aqvlPXOIq4/exec), чтобы получить значения для приватного приложения.

- Если ваш статус `Granted quota extension`, продублируйте свои же значения из строк `CLIENT_ID` и `CLIENT_SECRET`. Также вы можете помочь другим получить доступ к закрытому API. Сообщите о своем статусе в [телеграм чате](https://t.me/forum_goofy).

8. Скопируйте в файл `config` следующую функцию и запустите её.

```js
function reset() {
    Admin.reset()
    setProperties()
}
```

9. [Обновите](https://chimildic.github.io/goofy/#/tuning?id=Обновить-библиотеку) код основной библиотеки как раньше (по умолчанию файл `library`)
10.  Обновите права доступа: `начать развертывание` > `пробные развертывания` > перейти по ссылке `веб-приложение` и следовать появившейся инструкции


## Версия 3.0

Обновлять код до версии 3.0 нужно всем клиентам в статусе `Development Mode` путем замены содержимого файла `library` на новое.

Проверять статус в [Spotify Dashborad](https://developer.spotify.com/dashboard/). 

> Если статус `Granted quota extension`, вы можете помочь другими пользователям, поделившись клиентом через добавление его в пул приватных. Для этого напишите в [чат](https://t.me/chimildic).

   ![Development Mode](/img/dev-mode.png)

### Что изменилось

С февраля 2026 года Spotify ужесточил [политику использования API](https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security):
1. Пользователь с клиентом в статусе `Development Mode` обязан иметь Spotify Premium. 
2. Новые клиенты лишены возможности получать треки из плейлистов, если не являются их авторов или участиком коллаборации. То есть не получить треки из рекомендаций, чужие плейлисты.
3. Другие изменения удаляют методы и параметры из API.

### Как влияет на goofy

1. Если по какой-то причине у вас нет Spotify Premium, можете попросить клиент у других пользователей в [телеграм чате](https://t.me/forum_goofy). Поскольку Premium нужен только владельцу клиента. Владелец добавит вас по email в разделе тестировщиков и API для вас заработает без Premium.
2. Для получения плейлистов и удаленных методов API используется приватный клиент. Он старый, имеет расширенную квоту, пока Spotify не применяет к нему новых ограничений.