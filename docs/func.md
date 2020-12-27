# Список функций

## Source

Источник получения треков Spotify

### getTracks

Возвращает массив треков из одного и более плейлистов

Аргументы
- (массив) `playlistArray` - один и более плейлист. 

Формат одного плейлиста
- `id` - [идентификационный номер плейлиста](/guide?id=Плейлист).
- `userId` - [идентификационный номер пользователя](/guide?id=Пользователь).
- `name` - имя плейлиста.

| id | name | userId | Действие |
|:-:|:-:|:-:|:-|
| ✓ | ☓ | ☓ | Взять плейлист с указанным id |
| ☓ | ✓ | ☓ | Поиск плейлиста по имени среди ваших |
| ☓ | ✓ | ✓ | Поиск плейлиста по имени у пользователя |

> 💡 Рекомендуется всегда указывать `id` и `name`. Наиболее быстрый и удобный способ.

> ❗️ Если указано `name` без `id` и есть несколько плейлистов с таким именем, вернутся треки из первого встретившегося.
> 
>  Когда плейлист не найден, вернется пустой массив.

Пример 1 - Получить треки двух плейлистов по `id`. Значение `name` необязательно. Указывается для удобства.
```js
let tracks = Source.getTracks([
  { name: 'Главные хиты', id: '37i9dQZF1DX12G1GAEuIuj' },
  { name: 'Кардио', id: '37i9dQZF1DWSJHnPb1f0X3' },
]);
```

Пример 2 - Получить треки личных плейлистов The Best и Саундтреки.
```js
let tracks = Source.getTracks([
  { name: 'The Best' },
  { name: 'Саундтреки' },
]);
```

Пример 3 - Получить треки плейлиста с названием mint у пользователя spotify.
```js
let tracks = Source.getTracks([
  { name: 'mint', userId: 'spotify' },
]);
```

### getTracksRandom

Возвращает массив треков из одного и более плейлистов. Плейлисты выбираются случайным образом. 

Аргументы
- (массив) `playlistArray` - один и более плейлист. Аналогично [getTracks](/func?id=gettracks).
- (число) `countPlaylist` - количество случайно выбираемых плейлистов. По умолчанию один.

Пример 1 - Получить треки одного случайно выбранного плейлиста из трех.
```js
let tracks = Source.getTracksRandom([
  { name: 'Главные хиты', id: '37i9dQZF1DX12G1GAEuIuj' },
  { name: 'Кардио', id: '37i9dQZF1DWSJHnPb1f0X3' },
  { name: 'Темная сторона', id: '37i9dQZF1DX73pG7P0YcKJ' },
]);
```

Пример 2 - Получить треки двух случайно выбранных плейлистов из трех.
```js
let playlistArray = [
  { name: 'Главные хиты', id: '37i9dQZF1DX12G1GAEuIuj' },
  { name: 'Кардио', id: '37i9dQZF1DWSJHnPb1f0X3' },
  { name: 'Темная сторона', id: '37i9dQZF1DX73pG7P0YcKJ' },
];
let tracks = Source.getTracksRandom(playlistArray, 2);
```

### getPlaylistTracks

Возвращает массив треков из одного плейлиста. Аналогично [getTracks](/func?id=gettracks) с одним плейлистом.

Аргументы
- (строка) `name` - имя плейлиста.
- (строка) `id` - [идентификационный номер плейлиста](/guide?id=Плейлист).
- (строка) `user` - [идентификационный номер пользователя](/guide?id=Пользователь). По умолчанию ваш.

Пример 1 - Получить треки одного плейлиста
```js
let tracks = Source.getPlaylistTracks('Заблокированный треки', 'abcdef');
```

### getTopTracks

Возвращает массив треков с топом прослушиваний за выбранный период. До 98 треков.

Аргументы
- (строка) `timeRange` - период. По умолчанию `medium`.

|timeRange|Период|
|-|-|
| short | Примерно последний месяц |
| medium | Примерно последние 6 месяцев |
| long | За несколько лет |

> ❗️ Такие треки не содержат информации о дате добавления. При использовании [rangeDateRel](/func?id=rangedaterel) или [rangeDateAbs](/func?id=rangedateabs) им присваивается дата 01.01.2000

Пример 1 - Получить топ за последний месяц.
```js
let tracks = Source.getTopTracks('short');
```

Пример 2 - Получить топ за несколько лет.
```js
let tracks = Source.getTopTracks('long');
```

### getTopArtists

Возвращает топ исполнителей за выбранный период. До 98 исполнителей. 

Аргументы
- (строка) `timeRange` - период. По умолчанию `medium`. Возможные значения приведены в [getTopTracks](/func?id=gettoptracks).

Пример 1 - Получить топ треков от топ 10 исполнителей
```js
let artists = Source.getTopArtists('long');
Selector.keepFirst(artists, 10);
let tracks = Source.getArtistsTopTracks(artists);
```

### getRecentTracks

Возвращает массив треков недавней истории прослушивай. Источник только Spotify. Сортировка от свежих к более старым. Подробнее [здесь](/desc?id=История-прослушиваний).

Аргументы
- (число) `limit` - предельное количество треков. По умолчанию 200. Максимум 20 тысяч.

Пример 1 - Получить последние 200 прослушанных треков.
```js
let tracks = Source.getRecentTracks();
```

Пример 2 - Получить последнюю тысячу прослушанных треков.
```js
let tracks = Source.getRecentTracks(1000);
```

### getFollowedTracks

Возвращает массив треков отслеживаемых плейлистов и/или личных плейлистов указанного пользователя.

> 💡 Если нужно выполнить разные действия над источником, создайте копию массива [sliceCopy](/func?id=slicecopy) вместо новых запросов к Spotify через getFollowedTracks.

Аргументы
- (объект) `params` - аргументы отбора плейлистов.

Описание ключей
- (строка) `type` - тип выбираемых плейлистов. По умолчанию `followed`.
- (строка) `userId` - [идентификатор пользователя](#идентификатор). Если не указан, устанавливается `userId` авторизированного пользователя, то есть ваш.
- (число) `limit` - если используется, плейлисты выбираются случайным образом.
- (массив) `exclude` - перечень плейлистов, которые нужно исключить. Значимо только `id`. Значение `name` необязательно, нужно лишь для понимания какой это плейлист. Можно обойтись комментарием.

|type|Выбор|
|-|-|
| owned | Только личные плейлисты |
| followed | Только отслеживаемые плейлисты |
| all | Все плейлисты |

Полный объект `params`
```js
{
    type: 'followed',
    userId: 'abc',
    limit: 2,
    exclude: [
        { name: 'playlist 1', id: 'abc1' },
        { id: 'abc2' }, // playlist 2
    ],
}
```

Пример 1 - Получить треки только из моих отслеживаемых плейлистов.
```js
// Все значения по умолчанию, аргументы не указываются
let tracks = Source.getFollowedTracks();

// Тоже самое с явным указанием типа плейлистов
let tracks = Source.getFollowedTracks({
    type: 'followed',
});
```

Пример 2 - Получить треки только двух случайно выбранных личных плейлистов пользователя `example`, исключая несколько плейлистов по их id. 
```js
let tracks = Source.getFollowedTracks({
    type: 'owned',
    userId: 'example',
    limit: 2, 
    exclude: [
        { id: 'abc1' }, // playlist 1
        { id: 'abc2' }, // playlist 2
    ],
});
```

> ❗️ Следует избегать пользователей со слишком большим количеством плейлистов. Например, `glennpmcdonald` почти с 5 тысячами плейлистов. Ограничение связано с квотой на выполнение в Apps Script. За отведенное время не удастся получить такой объем треков. Подробнее в [описании ограничений](/desc?id=Ограничения).

### getSavedTracks

Возвращает массив любимых треков (лайков).

Аргументов нет.

> 💡 Если у вас много любимых треков и в скрипте нужно выполнить разные действия над ними, создайте копию массива [sliceCopy](/func?id=slicecopy) вместо новых запросов к Spotify.

Пример 1 - Получить массив любимых треков.
```js
let tracks = Source.getSavedTracks();
```

### getSavedAlbumTracks

Возвращает массив треков со всех сохраненных альбомов. Можно задать выбор альбомов случайным образом.

Аргументы:
- (число) `limit` - если используется, альбомы выбираются случайно до указанного значения.

Пример 1 - Получить треки трех случайных альбомов
```js
let tracks = Source.getSavedAlbumTracks(3);
```

Пример 2 - Получить треки из всех сохраненных альбомов
```js
let tracks = Source.getSavedAlbumTracks();
```

### getRecomTracks

Возвращает массив рекомендованных треков по заданным параметрам. До 100 треков.

Аргументы
- (объект) `queryObj` - параметры для отбора рекомендаций.

Допустимые параметры
- limit - количество треков. Максимум 100.
- seed_* - до **5 значений** в любых комбинациях:
  - seed_artists - [идентификаторы исполнителей](/guide?id=Идентификатор), разделенных запятой.
  - seed_tracks - [идентификаторы треков](/guide?id=Идентификатор), разделенных запятой.
  - seed_genres - жанры, разделенные запятой. Допустимые значения смотреть [здесь](/guide?id=Жанры-для-отбора-рекомендаций).
- max_* - предельное значение одной из [особенностей (features) трека](/guide?id=Особенности-трека-features).
- min_* - минимальное значение одной из [особенностей (features) трека](/guide?id=Особенности-трека-features).
- target_* - целевое значение одной из [особенностей (features) трека](/guide?id=Особенности-трека-features). Выбираются наиболее близкие по значению.

Пример объекта с параметрами
```js
let queryObj = {
      seed_artists: '',
      seed_genres: '',
      seed_tracks: '',
      max_*: 0,
      min_*: 0,
      target_*: 0,
};
```

Пример 1 - Получить рекомендации по жанру инди и альтернативы с позитивным настроением:
```js
let tracks = Source.getRecomTracks({
      seed_genres: 'indie,alternative',
      min_valence: 0.65,
});
```

Пример 2 - Получить рекомендации в жанре рок и электроники на основе 3 случайных любимых исполнителей (до 5 значений).
```js
let savedTracks = Source.getSavedTracks();
Selector.keepRandom(savedTracks, 3);

let artistIds = savedTracks.map(track => track.artists[0].id);

let tracks = Source.getRecomTracks({
      seed_artists: artistIds.join(','),
      seed_genres: 'rock,electronic'
});
```

### getArtists

Возвращает массив исполнителей согласно заданным `paramsArtist`.

Аргументы
- (объект) `paramsArtist` - перечень критериев отбора исполнителей. Объект соответствует описанию из [getArtistsTracks](/func?id=getartiststracks) в части исполнителя.

Пример 1 - Получить массив отслеживаемых исполнителей
```js
let artists = Source.getArtists({
    followed_include: true,
});
```

### getArtistsAlbums

Возвращает массив со всеми альбомами указанных исполнителей.

Аргументы
- (массив) `artists` - массив исполнителей
- (объект) `paramsAlbum` - перечень критериев отбора альбомов. Объект соответствует описанию из [getArtistsTracks](/func?id=getartiststracks) в части альбома.

Пример 1 - Получить массив синглов одного исполнителя
```js
let artist = Source.getArtists({
    followed_include: false,
    include: [ 
        { id: 'abc', name: 'Avril' }, 
    ],
});
let albums = Source.getArtistsAlbums(artist, {
    groups: 'single',
});
```

### getAlbumTracks

Возвращает массив треков указанного альбома.

Аргументы
- (объект) `album` - объект одного альбома
- (число) `limit` - если указано, выбирает треки случайно до указанного количества.

Пример 1 - Получить треки первого альбома массива
```js
let albums = Source.getArtistsAlbums(artists, {
    groups: 'album',
});
let albumTracks = Source.getAlbumTracks(albums[0]);
```

Пример 2 - Получить треки из всех альбомов
```js
let albums = Source.getArtistsAlbums(artists, {
    groups: 'album',
});
let tracks = [];
albums.forEach((album) => Combiner.push(tracks, Source.getAlbumTracks(album)));
```

### getAlbumsTracks

Возвращает массив треков из всех альбомов.

Аргументы
- (массив) `albums` - перечень альбомов

Пример 1 - Получить треки из топ-10 альбомов Lastfm
```js
let albums = Lastfm.getTopAlbums({ user: 'login', limit: 10 });
let tracks = Source.getAlbumsTracks(albums);
```

### getArtistsTracks

Возвращает массив треков исполнителей согласно заданным `params`.

> ❗️ В выборку попадает множество альбомов. Особенно при большом количестве отслеживаемых исполнителей (100+). Для сокращения времени выполнения используйте фильтры для исполнителя и альбома. Можно указать случайный выбор N-количества.

Аргументы
- (объект) `params` - перечень критериев отбора исполнителей и их треков

| Ключ | Тип | Описание |
|-|-|-|
| followed_include | бул | При `true` включает отслеживаемых исполнителей. При `false` исполнители берутся только из `include` |
| include | массив | Выборка исполнителей по `id` для получения альбомов. Ключ `name` для удобства и необязателен.  |
| exclude | массив | Выборка исполнителей по `id` для исключения исполнителей из выборки. Использовать в комбинации с `followed_include` |
| popularity | объект | Диапазон популярности исполнителя |
| followers | объект | Диапазон количества фолловеров исполнителя |
| genres | массив | Перечень жанров. Если хотя бы один есть, исполнитель проходит фильтр.  |
| ban_genres | массив | Перечень жанров для блокировки. Если хотя бы один есть, исполнитель удаляется из выборки. |
| groups | строка | Тип альбома. Допустимо: `album`, `single`, `appears_on`, `compilation` |
| release_date | объект | Дата выхода альбома. Относительный период при `sinceDays` и `beforeDays`. Абсолютный период при `startDate` и `endDate` |
| _limit | число | Если указано, выбирается случайное количество указанных элементов (artist, album, track) |

Пример объекта `params` со всеми ключами
```js
{
    artist: {
        followed_include: true,
        popularity: { min: 0, max: 100 },
        followers: { min: 0, max: 100000 },
        artist_limit: 10,
        genres: ['indie'],
        ban_genres: ['rap', 'pop'],
        include: [
            { id: '', name: '' }, 
            { id: '', name: '' },
        ],
        exclude:  [
            { id: '', name: '' }, 
            { id: '', name: '' },
        ],
    },
    album: {
        groups: 'album,single',
        release_date: { sinceDays: 6, beforeDays: 0 },
        // release_date: { startDate: new Date('2020.12.01'), endDate: new Date('2020.12.08') },
        album_limit: 10,
        track_limit: 1,
    }
}
```

Пример 1 - Получить треки из синглов отслеживаемых исполнителей, вышедших за последнюю неделю включая сегодня. Исключить несколько исполнителей.
```js
let tracks = Source.getArtistsTracks({
    artist: {
        followed_include: true,
        exclude:  [
            { id: 'abc1', name: '' }, 
            { id: 'abc2', name: '' },
        ],
    },
    album: {
        groups: 'single',
        release_date: { sinceDays: 7, beforeDays: 0 },
    },
});
```

Пример 2 - Получить треки из альбомов и синглов за неделю десяти отслеживаемых исполнителей, выбранных случайным образом. Исполнители с не более чем 10 тысячами подписчиков. Только один трек из альбома.
```js
let tracks = Source.getArtistsTracks({
    artist: {
        followed_include: true,
        artist_limit: 10,
        followers: { min: 0, max: 10000 },
    },
    album: {
        groups: 'album,single',
        track_limit: 1,
        release_date: { sinceDays: 7, beforeDays: 0 },
    },
});
```

Пример 3 - Получить треки из альбомов и синглов указанных исполнителей
```js
let tracks = Source.getArtistsTracks({
    artist: {
        followed_include: false,
        include:  [
            { id: 'abc1', name: '' }, 
            { id: 'abc2', name: '' },
        ],
    },
    album: {
        groups: 'album,single',
    },
});
```

### getArtistsTopTracks

Возвращает топ треков исполнителя в виде массива. До 10 треков на исполнителя.

Аргументы
- (массив) `artists` - массив исполнителей. Значимо только `id`.
- (бул) `isFlat` - если `false` результат содержит треки в отдельном массиве для каждого исполнителя. Если `true` все треки в одном массиве. По умолчанию `true`.

Пример 1 - `isFlat = true`
```js
let tracks = Source.getArtistsTopTracks(artists);
tracks[0]; // первый трек первого исполнителя
tracks[10]; // первый трек второго исполнителя, если у первого 10 треков
```

Пример 2 - `isFlat = false`
```js
let tracks = Source.getArtistsTopTracks(artists, false);
tracks[0][0]; // первый трек первого исполнителя
tracks[1][0]; // первый трек второго исполнителя
```

## RecentTracks

Источник истории прослушиваний 

### get

Возвращает массив треков истории прослушиваний в зависимости от [параметров](/guide?id=Параметры)

Аргументы
- (число) `limit` - если указано, ограничить количество возвращаемых треков. Если нет, все доступные. 

| Включенный параметр | Возвращаемый массив |
|-|-|
| `ON_SPOTIFY_RECENT_TRACKS` | История прослушиваний только Spotify |
| `ON_LASTFM_RECENT_TRACKS` | История прослушиваний только Lastfm.   |
| `ON_SPOTIFY_RECENT_TRACKS` и `ON_LASTFM_RECENT_TRACKS` | Объединение обоих источников с удалением дубликатов треков. |

Пример 1 - Получить массив треков истории прослушиваний. Источник треков зависит от параметров. 
```
let tracks = RecentTracks.get();
```

Пример 2 - Получить 100 треков истории прослушиваний.
```
let tracks = RecentTracks.get(100);
```

### compress

Сжимает треки в существующих накопительных файлах истории прослушиваний в зависимости от [параметров](/guide?id=Параметры). Предварительно создает копию файла.

Аргументов нет. Возвращаемого значения нет.

> Используется для совместимости с прошлыми версиями библиотеки. Достаточно одного выполнения, чтобы сжать файлы истории прослушиваний. Новые треки истории сжимаются автоматически.

Пример 1 - Сжать существующие файлы с историей прослушиваний. Файлы выбираются исходя из [активных параметров](/guide?id=Параметры).
```
RecentTracks.compress();
```

## Combiner

Объединение треков разных источников 

### push

Добавить в конец первого массива все элементы второго массива и так далее.

Аргументы
- (массив) `sourceArray` - первый массив, к которому добавляются элементы остальных.
- (перечень массивов) `...additionalArray` - перечень остальных массивов.

Пример 1 - Добавить элементы второго массива в конец первого массива.
```js
let firstArray = Source.getTracks(playlistArray); // допустим, 20 треков
let secondeArray = Source.getSavedTracks(); // допустим, 40 треков
Combiner.push(firstArray, secondeArray);
// теперь в firstArray 60 треков
```

Пример 2 - Добавить к первому массиву элементы двух других.
```js
let firstArray = Source.getTracks(playlistArray); // допустим, 25 треков
let secondeArray = Source.getSavedTracks(); // допустим, 100 треков
let thirdArray = Source.getRecentTracks(); // допустим, 20 треков
Combiner.push(firstArray, secondeArray, thirdArray);
// теперь в firstArray 145 треков
```

### mixinMulti

Возвращает новый массив, в котором чередуются элементы массивов-источников в заданном соотношении. Количеством источников неограничено.

Аргумент
- (объект) `params` - параметры, задающие источник и соотношение.

Параметры
- (массив) `source` - перечень массивов-источников
- (массив) `inRow` - перечень с количеством элементов для каждого массива
- (бул) `toLimitOn` - элементы чередуются до тех пор, пока соотношение можно сохранить. Если `true` лишние элементы не включаются в результат. Если `false` добавляются в конец результата, продолжая сохранять пропорцию, если это возможно. По умолчанию `false`.

> Важно: количество элементов в `source` должно соответствовать количеству элементов `inRow`. То есть каждому массиву назначается число подряд идущих элементов.

> При `toLimitOn = true`, первая итерация проверяет количество элементов. Если элементов меньше, чем задано соотношением, вернется пустой массив.

Пример 1 - Чередовать элементы в соотношении 1:1:1. Сохранить все элементы.
```js
let x = [1, 2, 3, 4, 5];
let y = [10, 20, 30, 40];
let z = [100, 200, 300];
let result = Combiner.mixinMulti({
    source: [x, y, z],
    inRow: [1, 1, 1],
});
// 1, 10, 100, 2, 20, 200, 3, 30, 300, 4, 40, 5
```

Пример 2 - Чередовать элементы в соотношении 2:4:2 до тех пор, пока можно сохранить последовательность
```js
let x = [1, 2, 3, 4, 5];
let y = [10, 20, 30, 40];
let z = [100, 200, 300];
let result = Combiner.mixinMulti({
    toLimitOn: true,
    source: [x, y, z],
    inRow: [2, 4, 2],
});
// 1, 2, 10, 20, 30, 40, 100, 200
```

Пример 3 - Чередовать рекомендации, любимые треки и историю прослушиваний в соотношении 4:1:1 до тех пор, пока можно сохранить последовательность
```js
let recom = Source.getRecomTracks(...);
let saved = Source.getSavedTracks();
let recent = RecentTracks.get();
let tracks = Combiner.mixinMulti({
    toLimitOn: true,
    source: [recom, saved, recent],
    inRow: [4, 1, 1],
});
```

### mixin

Возвращает новый массив, в котором чередуются элементы двух массивов в заданной пропорции. Внутри вызывается [mixinMulti](/func?id=mixinmulti) с двумя массивами.

Аргументы
- (массив) `xArray` - первый массив источник.
- (массив) `yArray` - второй массив источник.
- (число) `xRow` - количество подряд идущих элементов первого массива.
- (число) `yRow`- количество подряд идущих элементов второго массива.
- (булево) `toLimitOn` - элементы чередуются до тех пор, пока пропорцию можно сохранить. Если `true` лишние элементы не включаются в результат. Если `false` добавляются в конец результата.

Пример 1 - Чередовать треки плейлистов-источников и любимые треки в соотношении 5 к 1. Удалить лишние.
```js
let tracks = Source.getTracks(playlistArray);
let savedTracks = Source.getSavedTracks();
let resultArray = Combiner.mixin(tracks, savedTracks, 5, 1, true);
```

### alternate

Возвращает новый массив, в котором чередуются элементы массивов источников.

Аргументы
- (строка) bound - допустимое значение `max` или `min`.
  - Если элементы в одном из массивов закончились, добавляет оставшиеся элементы другого массива в конец (`max`). При нескольких оставшихся массивах, продолжает чередовать их элементы.
  - Если хотя бы в одном массиве закончились элементы, немедленно возвращает результат (`min`). Оставшиеся элементы отбрасываются.
- (перечень массивов) `...arrays` - перечень массивов, чьи элементы необходимо чередовать.

Пример 1 - Чередовать элементы трех массивов.
```js
let firstArray = [1, 3, 5];
let secondeArray = [2, 4, 6, 8, 10];
let thirdArray = [100, 200, 300];
let resultArray = Combiner.alternate('max', firstArray, secondeArray, thirdArray);
// результат 1, 2, 100, 3, 4, 200, 5, 6, 300, 8, 10
```

Пример 2 - Чередовать топ прослушиваний за месяц и любимые треки.
```js
let topTracks = Source.getTopTracks('short'); // допустим, 50 треков
let savedTracks = Source.getSavedTracks(20); //допустим, 20 треков
let resultArray = Combiner.alternate('min', topTracks, savedTracks);
// результат содержит 40 треков
```

## Filter

Отсеивание треков по разным признакам

### removeTracks

Удаляет из `sourceArray` треки, которые есть в `removedArray`. Совпадение определяется по `id` трека или по названию трека вместе с исполнителем.

Аргументы
- (массив) `sourceArray` - массив треков, в котором нужно удалить треки.
- (массив) `removedArray` - массив треков, которые требуется удалить.
- (бул) `invert` - инверсия результата. Если `true`, удалять все треки, кроме тех, что в `removedArray`. По умолчанию `false`.

Пример 1 - Получить треки плейлистов и исключить любимые треки.
```js
let sourceArray = Source.getTracks(playlistArray);
let removedArray = Source.getSavedTracks();
Filter.removeTracks(sourceArray, removedArray);
```

### removeArtists

Удаляет из `sourceArray` треки исполнителей, которые есть в `removedArray`. Совпадение определяется по `id` основного исполнителя трека.

Аргументы
- (массив) `sourceArray` - массив треков, в котором нужно удалить треки.
- (массив) `removedArray` - массив треков, которые требуется удалить. Выбирается не трек, а исполнитель.
- (бул) `invert` - инверсия результата. Если `true`, удалять всех исполнителей, кроме тех, что в `removedArray`. По умолчанию `false`.

Пример 1 - Получить треки плейлистов и исключить исполнителей любимых треков.
```js
let sourceArray = Source.getTracks(playlistArray);
let removedArray = Source.getSavedTracks();
Filter.removeArtists(sourceArray, removedArray);
```

### dedupTracks

Удаляет дубликаты треков по `id` и `name`.

Аргументы
- (массив) `tracks` - массив треков, в котором требуется удалить дубликаты.

Пример 1 - Удалить дубликаты.
```js
let tracks = Source.getTracks(playlistArray);
Filter.dedupTracks(tracks);
```

### dedupArtists

Удаляет дубликаты основных исполнителей по `id`. То есть если у трека несколько исполнителей, выбирается первый в списке. Обычно он главный. В результате, массив содержит по одному треку каждого исполнителя.

Аргументы
- (массив) `tracks` - массив треков, в котором требуется удалить дубликаты основных исполнителей.

Пример 1 - Удалить дубликаты основных исполнителей.
```js
let tracks = Source.getTracks(playlistArray);
Filter.dedupArtists(tracks);
```

### getDateRel

Возвращает дату со смещением в днях относительно сегодня.

Аргументы
- (число) `days` - количество дней для смещения.
- (строка) `bound` - обнуление часов. При `startDay` 00:00, при `endDay` 23:59. Если не указать, время согласно моменту обращения.

Пример в шаблоне [любимо и забыто](/template?id=Любимо-и-забыто).

### rangeDateRel

Оставить только треки, добавленные за указанный период относительно сегодня.

> ❗️ Если трек не содержит даты добавления или прослушивания, устанавливается дата 01.01.2000. Такое возможно если трек добавлен очень давно, источником является [getTopTracks](/func?id=gettoptracks) или это плейлисты "Мой микс дня #N". Для перечисленного Spotify не имеет или не дает дату.

Аргументы
- (массив) `tracks` - массив треков.
- (число) `sinceDays` - стартовая граница. По умолчанию сегодня 00:00.
- (число) `beforeDays` - предельная граница. По умолчанию сегодня 23:59.

Ниже пример для `sinceDays` = 7 и `beforeDays` = 2. То есть получить треки, добавленные в плейлист с 3 сентября 00:00 по 8 сентября 23:59 относительно сегодня, 10 сентября. 

![Пример использования sinceDays и beforeDays](/img/DaysRel.png)

Пример 1 - Треки, добавленные за последние 5 дней и сегодня.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeDateRel(tracks, 5);
// аналогично Filter.rangeDateRel(tracks, 5, 0);
```

Пример 2 - Треки за последние 7 дней исключая сегодня.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeDateRel(tracks, 7, 1);
```

Пример 3 - Треки за один день, который был 14 дней назад.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeDateRel(tracks, 14, 14);
```

Пример 4 - Треки только за сегодня.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeDateRel(tracks);
// аналогично Filter.rangeDateRel(tracks, 0, 0);
```

### rangeDateAbs

Оставить только треки, добавленные за указанный абсолютный период.

> ❗️ Предупреждение описано в [rangeDateRel](/func?id=rangedaterel).

Аргументы
- (массив) `tracks` - массив треков.
- (дата) `startDate` - стартовая граница.
- (дата) `endDate` - предельная граница.

Формат даты `YYYY-MM-DDTHH:mm:ss.sss` где
- `YYYY-MM-DD` - год, месяц, день
- `T` - разделитель для указания времени. Указать, если добавляется время.
- `HH:mm:ss.sss` - часы, минуты, секунды, миллисекунды

Пример 1 - Треки, добавленные между 1 и 3 сентября.
```js
let tracks = Source.getTracks(playlistArray);
let startDate = new Date('2020-09-01');
let endDate = new Date('2020-09-03');
Filter.rangeDateAbs(tracks, startDate, endDate);
```

Пример 2 - Треки, добавленные с 1 августа 15:00 по 20 августа 10:00.
```js
let tracks = Source.getTracks(playlistArray);
let startDate = new Date('2020-08-01T15:00');
let endDate = new Date('2020-08-20T10:00');
Filter.rangeDateAbs(tracks, startDate, endDate);
```

Пример 3 - Треки, добавленные с 1 сентября по текущую дату и время.
```js
let tracks = Source.getTracks(playlistArray);
let startDate = new Date('2020-09-01');
let endDate = new Date();
Filter.rangeDateAbs(tracks, startDate, endDate);
```

### rangeTracks

Оставляет только треки, которые удовлетворяют условиям `args`. Треки непрошедшие проверку удаляются из оригинального массива `tracks`. 

Аргументы
- (массив) `tracks` - проверяемые треки. 
- (объект) `args` - условия проверки на принадлежность диапазону `min` - `max` (границы включительно), равенству или присутствию жанра.

Категории проверки параметров
- `meta` - трек
- `features` - особенности трека
- `artist` - основной исполнитель трека
- `album` - альбом трека

> ❗️ Функция запрашивает дополнительные данные для `features`, `artist`, `album`. Чтобы сократить число запросов, используйте ее после максимального сокращения массива треков другими способами (например, [rangeDateRel](/func?id=rangedaterel), [match](/func?id=match) и другие). Полученные данные кэшируются для **текущего** выполнения. Повторный вызов функции или сортировка [sort](/func?id=sort) с теми же категориями не отправляют новых запросов.

Ниже пример объекта `args` со всеми допустимыми условиями проверки. Описание параметров читать [здесь](/guide?id=Описание-параметров-объектов).
```js
let args = {
    meta: {
        popularity: { min: 0, max: 100 },
        duration_ms: { min: 0, max: 10000 },
        explicit: false,
    },
    artist: {
        popularity: { min: 0, max: 100 },
        followers: { min: 0, max: 100000 },
        genres: ['indie'],
        ban_genres: ['rap', 'pop'],
    },
    features: {
        acousticness: { min: 0.0, max: 1.0 },
        danceability: { min: 0.0, max: 1.0 },
        energy: { min: 0.0, max: 1.0 },
        instrumentalness: { min: 0.0, max: 1.0 },
        liveness: { min: 0.0, max: 1.0 },
        loudness: { min: -60, max: 0 },
        speechiness: { min: 0.0, max: 1.0 },
        valence: { min: 0.0, max: 1.0 },
        tempo: { min: 30, max: 210 },
        key: 0,
        mode: 0,
        time_signature: 1,

        // дублирует args.meta.duration_ms, достаточно одного (выбор зависит от категории)
        duration_ms: { min: 0, max: 10000 },
    },
    // Не рекомендуется использовать
    // album: {
    //     popularity: { min: 30, max: 70 },
    //     genres: [], // Тесты показывают, что у альбомов список жанров всегда пуст
    //     release_date: { sinceDays: 6, beforeDays: 0 },
    //     или release_date: { startDate: new Date('2020.12.01'), endDate: new Date('2020.12.08') },
    // },
};
```

Пример 1 - Исключить треки жанра рэп.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeTracks(tracks, {
    artist: {
      ban_genres: ['rap'],
    }
});
```

Пример 2 - Оставить только треки в жанре инди и альтернативы.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeTracks(tracks, {
    artist: {
        genres: ['indie', 'alternative'],
    },
});
```

Пример 3 - Оставить только малопопулярные треки от малоизвестных исполнителей.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeTracks(tracks, {
    meta: {
      popularity: { min: 0, max: 49 },
    },
    artist: {
      followers: { min: 0, max: 9999 },
    },
});
```

### getLastOutRange

Получить новый массив с треками, которые не прошли последнюю проверку функции [rangeTracks](/func?id=rangetracks).

Нет аргументов.

Пример 1 - Получить треки непрошедшие проверку.
```js
let tracks = Source.getTracks(playlistArray);
Filter.rangeTracks(tracks, args);
let outRangeTracks = Filter.getLastOutRange();
```

### match

Оставляет только треки, которые удовлетворяют условию `strRegex` по названию трека и альбома.

Аргументы
- (массив) `tracks` - массив треков.
- (строка) `strRegex` - строка регулярного выражения.
- (булево) `invert` - если `true` инверсия результата. По умолчанию `false`. 

Пример 1 - Удалить треки, содержащие в своем названии слова `cover` или `live`.
```js
let tracks = Source.getTracks(playlistArray);
Filter.match(tracks, 'cover|live', true);
```

### matchExcept

Оставляет только треки, которые **не** удовлетворяют условию `strRegex` по названию трека и альбома.

Аргументы
- (массив) `tracks` - массив треков.
- (строка) `strRegex` - строка регулярного выражения.

Аналогично [match](/func?id=match) с аргументом `invert = true`

### matchExceptMix

Удаляет треки, содержащие `mix` и `club`.

Аргументы
- (массив) `tracks` - массив треков.

Аналогично [matchExcept](/func?id=matchexcept) с аргументом `strRegex = 'mix|club'`

### matchExceptRu

Удаляет треки, содержащие кириллицу.

Аргументы
- (массив) `tracks` - массив треков.

Аналогично [matchExcept](/func?id=matchexcept) с аргументом `strRegex = '^[а-яА-Я]+'`

### matchLatinOnly

Оставляет треки, которые содержат названия только на латинице. То есть удаляет иероглифы, кириллицу и прочее. 

Аргументы
- (массив) `tracks` - массив треков.

Аналогично [match](/func?id=match) с аргументом `strRegex = '^[a-zA-Z0-9]+'`

### matchOriginalOnly

Удаляет неоригинальные версии треков.

Аргументы
- (массив) `tracks` - массив треков.

Аналогично [matchExcept](/func?id=matchexcept) с аргументом `strRegex = 'mix|club|radio|piano|acoustic|edit|live|version|cover'`

## Selector

Отбор количества треков по позиции

### keepFirst / sliceFirst

Изменяет / возвращает массив, состоящий из первых `count` элементов массива `array`.

> Разница функций `keep*` и `slice*`:
> 
> - `keep*` изменяет содержимое оригинального массива, 
> - `slice*` возвращает новый массив, не изменяя оригинала.

Аргументы
- (массив) `array` - массив, из которого берутся элементы.
- (число) `count` - количество элементов.

Пример 1 - Получить первые 100 треков.
```js
let tracks = Source.getTracks(playlistArray);
tracks = Selector.sliceFirst(tracks, 100);
```

### keepLast / sliceLast

Изменяет / возвращает массив, состоящий из последних `count` элементов массива `array`.

Аргументы
- (массив) `array` - массив, из которого берутся элементы.
- (число) `count` - количество элементов.

Пример 1 - Получить последние 100 треков.
```js
let tracks = Source.getTracks(playlistArray);
tracks = Selector.sliceLast(tracks, 100);
```

### keepAllExceptFirst / sliceAllExceptFirst

Изменяет / возвращает массив, состоящий из всех элементов массива `array` кроме `skipCount` первых.

Аргументы
- (массив) `array` - массив, из которого берутся элементы.
- (число) `skipCount` - количество пропускаемых элементов.

Пример 1 - Получить все треки кроме первых 10.
```js
let tracks = Source.getTracks(playlistArray);
tracks = Selector.sliceAllExceptFirst(tracks, 10);
```

### keepAllExceptLast / sliceAllExceptLast

Изменяет / возвращает массив, состоящий из всех элементов массива `array` кроме `skipCount` последних.

Аргументы
- (массив) `array` - массив, из которого берутся элементы.
- (число) `skipCount` - количество пропускаемых элементов.

Пример 1 - Получить все треки кроме последних 10.
```js
let tracks = Source.getTracks(playlistArray);
tracks = Selector.sliceAllExceptLast(tracks, 10);
```

### keepRandom / sliceRandom

Изменяет / возвращает массив, состоящий из случайно отобранных элементов исходного массива.

Аргументы
- (массив) `array` - массив, из которого берутся элементы.
- (число) `count` - количество случайно выбираемых элементов.

Пример 1 - Получить 20 случайных треков.
```js
let tracks = Source.getTracks(playlistArray);
tracks = Selector.sliceRandom(tracks, 20);
```

### keepNoLongerThan / sliceNoLongerThan

Изменяет / возвращает массив треков с общей длительностью не более, чем `minutes` минут.

Аргументы
- (массив) `tracks` - исходный массив треков.
- (число) `minutes` - количество минут.

Пример 1 - Получить треки с общей продолжительностью не более, чем 60 минут.
```js
let tracks = Source.getTracks(playlistArray);
tracks = Selector.sliceNoLongerThan(tracks, 60);
```

### sliceCopy

Возвращает новый массив, который является копией исходного массива.

> 💡 Используйте создание копии, если в одном скрипте нужно выполнить разные действия над источником. Позволит ускорить время выполнения и не отправлять тех же запросов дважды.

Аргументы
- (массив) `array` - исходный массив, копию которого нужно создать.

Пример 1 - Создать копию массива.
```js
let tracks = Source.getTracks(playlistArray);
let tracksCopy = Selector.sliceCopy(tracks);
```

### isWeekend

Возвращает булево значение: `true` если сегодня суббота или пятница и `false` если нет.

Аргументов нет.

Пример использования
```js
if (Selector.isWeekend()){
    // сегодня выходной
} else {
   // будни
}
```

### isDayOfWeekRu

Возвращает булево значение: `true` если сегодня день недели `strDay` и `false` если нет. Значение дня недели кириллицей.

Аргументы
- (строка) `strDay` - день недели. Допустимые значения: `понедельник`, `вторник`, `среда`, `четверг`, `пятница`, `суббота`, `воскресенье`.

Пример использования
```js
if (Selector.isDayOfWeekRu('понедельник')){
    // сегодня понедельник
} else if (Selector.isDayOfWeekRu('среда')) {
    // сегодня среда
} else {
    // другой день недели
}
```

### isDayOfWeek

Возвращает булево значение: `true` если сегодня день недели `strDay` и `false` если нет.

Аргументы
- (строка) `strDay` - день недели.
- (строка) `locale` - локаль дня недели. По умолчанию `en-US`, для которой допустимы значения: `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`.

Пример использования
```js
if (Selector.isDayOfWeek('friday')){
    // сегодня пятница
} else {
    // другой день недели
}
```

## Order

Сортировка треков

### sort

Сортирует оригинальный массив по заданному ключу.

> ❗️ Функция делает дополнительные запросы. Чтобы сократить число запросов, используйте ее после максимального сокращения массива треков другими способами. Подробнее в [rangeTracks](/func?id=rangetracks).

Аргументы
- (массив) `tracks` - массив треков, который нужно отсортировать.
- (строка) `pathKey` - ключ сортировки.
- (строка) `direction` - направление сортировки: `asc` по возрастанию, `desc` по убыванию. По умолчанию `asc`.

Допустимые ключи в формате `категория.ключ`. Описание ключей [здесь](/guide?id=Описание-параметров-объектов).

| Категория | Ключ |
|-|-|
| meta | name, popularity, duration_ms, explicit, added_at, played_at |
| features | acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, valence, tempo, key, mode, time_signature, duration_ms |
| artist | popularity, followers, name |
| album | Не рекомендуется использовать. popularity, name |

Пример 1 - Сортировка по убывающей популярности исполнителей
```js
Order.sort(tracks, 'artist.popularity', 'desc');
```

Пример 2 - Сортировка по возрастающей энергичности
```js
Order.sort(tracks, 'features.energy', 'asc');
```

### shuffle

Перемешивает элементы массива случайным образом.

Аргументы
- (массив) `array` - массив, чьи элементы необходимо перемешать.

Пример 1 - Случайное перемешивание
```js
let array = [1, 2, 3, 4, 5, 6];

Order.shuffle(array);
// результат 3, 5, 4, 6, 2, 1

Order.shuffle(array);
// результат 6, 1, 2, 3, 5, 4

Order.shuffle(array);
// результат 6, 5, 2, 3, 1, 4
```

Пример 2 - Перемешать треки
```js
let tracks = Source.getTracks(playlistArray);
Order.shuffle(tracks);
```

### reverse

Обратная сортировка. Первый элемент станет последним и наоборот.

Аргументы
- (массив) `array` - массив, чьи элементы необходимо отсортировать в обратном направлении.

Пример 1 - Обратная сортировка
```js
let array = [1, 2, 3, 4, 5, 6];

Order.reverse(array);
// результат 6, 5, 4, 3, 2, 1

Order.reverse(array);
// результат 1, 2, 3, 4, 5, 6
```

Пример 2 - Обратная сортировка треков плейлиста
```js
let tracks = Source.getTracks(playlistArray);
Order.reverse(tracks);
```

### separateArtists

Сортировка, при которой соблюдается минимальный отступ между одним и тем же исполнителем. Треки, которые не удалось разместить будут исключены.

Аргументы
- (массив) `tracks` - массив треков, который нужно отсортировать.
- (число) `space` - значение минимального отступа.
- (булево) `isRandom` - влияет на сортировку. Если `true` выполняется случайная сортировка оригинального массива, что повлияет на порядок при разделении исполнителей. Если `false` без случайной сортировки. Тогда результат при одинаковых входных треках будет тоже одинаковыми. По умолчанию `false`.

Пример 1 - Условный пример разделения
```js
let array = ['cat', 'cat', 'dog', 'lion']
Order.separateArtists(array, 1, false);
// результат cat, dog, cat, lion

array = ['cat', 'cat', 'dog', 'lion']
Order.separateArtists(array, 1, false);
// повторный вызов, результат тот же: cat, dog, cat, lion

array = ['cat', 'cat', 'dog', 'lion']
Order.separateArtists(array, 1, true);
// повторный вызов и случайная сортировка: cat, lion, dog, cat
```

Пример 2 - Разделить одного и того же исполнителя минимум двумя другими.
```js
let tracks = Source.getTracks(playlistArray);
Order.separateArtists(tracks, 2);
```

## Playlist

Создание или обновление плейлиста

### saveAsNew

Создает плейлист. Каждый раз новый.

Аргументы
- (объект) `data` - данные для создания плейлиста.

Формат данных для создания плейлиста
- (строка) `name` - название плейлиста, обязательно.
- (массив) `tracks` - массив треков, обязательно.
- (строка) `description` - описание плейлиста. До 300 символов.
- (булево) `public` - если `false` плейлист будет приватным. По умолчанию `true`.
- (строка) `randomCover` - добавить случайную обложку при значении `once`. Без использования, стандартная мозайка от Spotify.

Пример 1 - Создать публичный плейлист с любимыми треками без описания со случайной обложкой
```js
let tracks = Source.getSavedTracks();
Playlist.saveAsNew({
  name: 'Копия любимых треков',
  tracks: tracks,
  randomCover: 'once',
});
```

Пример 2 - Создать приватный плейлист с недавней историей прослушиваний и описанием без обложки.
```js
let tracks = Source.getRecentTracks(200);
Playlist.saveAsNew({
  name: 'История прослушиваний',
  description: '200 недавно прослушанных треков'
  public: false,
  tracks: tracks,
});
```

### saveWithReplace

Заменяет треки плейлиста. Обновляет остальные данные (название, описание). Если плейлиста еще нет, создает новый.

Аргументы
- (объект) `data` - данные о плейлисте.

Формат данных о плейлисте
- (строка) `id` - [идентификационный номер плейлиста](#идентификатор).
- (строка) `name` - название плейлиста, обязательно.
- (массив) `tracks` - массив треков, обязательно.
- (строка) `description` - описание плейлиста. До 300 символов.
- (булево) `public` - если `false` плейлист будет приватным. По умолчанию `true`.
- (строка) `randomCover` - если `once` добавит случайную обложку. При `update` каждый раз обновляет обложку. Без использования, стандартная мозайка от Spotify.

> 💡 Рекомендуется всегда указывать `id`. Если `id` не указано, поиск по названию. Если такого плейлиста нет, создается новый.

Пример 1 - Обновить содержимое плейлиста и обложку
```js
let tracks = Source.getTracks(playlistArray);
Playlist.saveWithReplace({
    id: 'fewf4t34tfwf4',
    name: 'Микс дня',
    description: 'Описание плейлиста',
    tracks: tracks,
    randomCover: 'update',
});
```

Пример 2 - Обновить содержимое плейлиста из примера 1. Поиск по названию.
```js
let tracks = Source.getRecentTracks();
Playlist.saveWithReplace({
    name: 'Микс дня',
    description: 'Новое описание плейлиста',
    tracks: tracks,
    randomCover: 'update',
});
```

### saveWithAppend

Добавляет треки к уже имеющимся в плейлисте. Обновляет остальные данные (название, описание). Если плейлиста еще нет, создает новый.

Аргументы
- (объект) `data` - данные о плейлисте. Формат данных о плейлисте согласно описанию [saveWithReplace](/func?id=savewithreplace).
- (булево) `toEnd` - если `true`, добавляет треки в конец списка. Если `false`, в начало. По умолчанию `false`.

Пример 1 - Добавить треки в начало плейлиста.
```js
let tracks = Source.getTracks(playlistArray);
Playlist.saveWithAppend({
    id: 'fewf4t34tfwf4',
    name: 'Микс дня',
    tracks: tracks
});
```

Пример 2 - Добавить треки в конец плейлиста, обновить название и описание.
```js
let tracks = Source.getTracks(playlistArray);
Playlist.saveWithAppend({
    id: 'fewf4t34tfwf4',
    name: 'Новое название',
    description: 'Новое описание',
    tracks: tracks,
    toEnd: true,
});
```

> ❗️ Если обновить название плейлиста без указания `id` будет создан новый плейлист. Потому что поиск не найден плейлист с новым названием.

### getDescription

Возвращает строку вида: `Исполнитель 1, Исполнитель 2... и не только`.

Аргументы
- (массив) `tracks` - треки, из которых случайно выбираются исполнители.
- (число) `limit` - количество случайно выбираемых исполнителей. По умолчанию 5.

Пример 1 - Создать плейлист с описанием
```js
let tracks = Source.getTracks(playlistArray);
Playlist.saveWithReplace({
    id: 'abcd',
    name: 'Большой микс дня',
    tracks: tracks,
    description: Playlist.getDescription(tracks),
});
```

## Library

Действия над любимыми треками и подписками на исполнителей

### followArtists

Подписаться на исполнителей

Аргументы
- (массив) `artists` - перечень исполнителей. Значимо только `id`.

Пример в [Yandex.getArtists](/func?id=getartists)

### unfollowArtists

Отписаться от исполнителей

Аргументы
- (массив) `artists` - перечень исполнителей. Значимо только `id`.

Пример аналогичен [Yandex.getArtists](/func?id=getartists). Только использовать `unfollowArtists`.

### saveFavoriteTracks

Добавить треки в любимые (поставить лайк)

Аргументы
- (массив) `tracks` - перечень треков. Значимо только `id`.

Пример 1 - Добавить последние 50 лайков из Яндекс в Spotify
```js
let yandexTracks = Yandex.getTracks('owner', '3', 50);
let savedTracks = Source.getSavedTracks();
Filter.removeTracks(yandexTracks, savedTracks);
Library.saveFavoriteTracks(yandexTracks);
```

### deleteFavoriteTracks

Удалить треки из любимых (снять лайки)

Аргументы
- (массив) `tracks` - перечень треков. Значимо только `id`.

Пример 1 - Очистить все лайки Spotify
```js
let savedTracks = Source.getSavedTracks();
Library.deleteFavoriteTracks(savedTracks);
```

## Lastfm

Модуль по работе с сервисом Last fm

### getRecentTracks

Возвращает массив недавно прослушанных треков пользователя `user`, ограниченного количеством `limit`. 

> ❗️ Источником треков является lastfm. Эквивалент трека находится поиском Spotify по наилучшему совпадению. Если совпадения нет, трек игнорируется. 
> 
> Один трек lastfm равен одному запросу поиска. Будьте внимательны с [ограничениями](/desc?id=Ограничения) по количеству запросов в день и времени выполнения.

Аргументы
- (строка) `user` - логин пользователя Last.fm, чью историю прослушиваний нужно искать.
- (число) `limit` - предельное количество треков.

Пример 1 - Получить 200 недавно прослушанных треков
```js
let tracks = Lastfm.getRecentTracks('login', 200);
```

### getSimilarTracks

Возвращает массив треков, которые похожи на входные треки согласно данным Lastfm.

Аргументы
- (массив) `tracks` - треки, для которых нужно найти похожие.
- (число) `match` - минимальное значение похожести на оригинальный трек в границе от `0.0` до `1.0`. 
- (число) `limit` - количество запрашиваемых похожих треков на один оригинальный трек.

Пример 1 - Получить треки, похожие на плейлист
```js
let playlistTracks = Source.getPlaylistTracks('name', 'id');
let similarTracks = Lastfm.getSimilarTracks(playlistTracks, 0.65, 30);
```

### getLovedTracks

Возвращает массив любимых треков пользователя `user`, ограниченного количеством `limit`. Внимание на предупреждение из [getRecentTracks](/func?id=getrecenttracks-1).

Аргументы
- (строка) `user` - логин пользователя Last.fm, чьи любимые треки нужно искать.
- (число) `limit` - предельное количество треков.

Пример 1 - Получить 200 любимых треков
```js
let tracks = Lastfm.getLovedTracks('login', 200);
```

### getTopTracks

Возвращает массив с топом треков по заданному периоду. Внимание на предупреждение из [getRecentTracks](/func?id=getrecenttracks-1).

Аргументы
- (объект) `params` - параметры для выбора топа треков.

Допустимые значения `params`
```js
{
  user: 'login', // логин пользователя last.fm
  period: 'overall', // период, допустимо: overall | 7day | 1month | 3month | 6month | 12month
  limit: 50 // предельное количество треков
}
```

Пример 1 - Получить топ-40 треков за полгода
```js
let tracks = Lastfm.getTopTracks({
  user: 'ваш логин',
  period: '6month',
  limit: 40
});
```

### getTopArtists

Возвращает массив с топом исполнителей по заданному периоду.

Аргументы
- (объект) `params` - параметры для выбора топа исполнителей. Аналогично параметрам [getTopTracks](/func?id=gettoptracks-1).

Пример 1 - Получить топ-10 исполнителей за полгода
```js
let artists = Lastfm.getTopArtists({
  user: 'ваш логин',
  period: '6month',
  limit: 10
});
```

### getTopAlbums

Возвращает массив с топом альбомов по заданному периоду.

Аргументы
- (объект) `params` - параметры для выбора топа альбома. Аналогично параметрам [getTopTracks](/func?id=gettoptracks-1).

Пример 1 - Получить топ-10 альбомов за полгода
```js
let artists = Lastfm.getTopAlbums({
  user: 'ваш логин',
  period: '6month',
  limit: 10
});
```

### getMixStation

Возвращает массив треков из радио last fm `Микс`. Содержит ранее заскроббленные треки и рекомендации last fm. Внимание на предупреждение из [getRecentTracks](/func?id=getrecenttracks-1).

Аргументы
- (строка) `user` - логин пользователя, чье радио является источником.
- (число) `countRequest` - количество запросов к last fm. Один запрос дает примерно от 20 до 30 треков.

Пример использования
```js
let tracks = Lastfm.getMixStation('login', 2);
```

### getLibraryStation

Возвращает массив треков из радио last fm `Библиотека`. Содержит только заскроббленные ранее треки. Внимание на предупреждение из [getRecentTracks](/func?id=getrecenttracks-1).

Аргументы
- (строка) `user` - логин пользователя, чье радио является источником.
- (число) `countRequest` - количество запросов к last fm. Один запрос дает примерно от 20 до 30 треков.

Пример использования
```js
let tracks = Lastfm.getLibraryStation('login', 2);
```

### getRecomStation

Возвращает массив треков из радио last fm `Рекомендации`. Содержит только рекомендации last fm. Внимание на предупреждение из [getRecentTracks](/func?id=getrecenttracks-1).

Аргументы
- (строка) `user` - логин пользователя, чье радио является источником.
- (число) `countRequest` - количество запросов к last fm. Один запрос дает примерно от 20 до 30 треков.

Пример использования
```js
let tracks = Lastfm.getRecomStation('login', 2);
```


### getNeighboursStation

Возвращает массив треков из радио last fm `Соседи`. Содержит треки, которые слушают пользователи last fm со схожими вам музыкальными вкусами. Внимание на предупреждение из [getRecentTracks](/func?id=getrecenttracks-1).

Аргументы
- (строка) `user` - логин пользователя, чье радио является источником.
- (число) `countRequest` - количество запросов к last fm. Один запрос дает примерно от 20 до 30 треков.

Пример использования
```js
let tracks = Lastfm.getNeighboursStation('login', 2);
```

### removeRecentTracks

Удаляет из массива треков `sourceArray` историю недавно прослушанных `limit` треков пользователя `lastfmUser`. Совпадение определяется по названию трека и исполнителя. Требуется [дополнительная настройка](/install?id=Настройка-lastfm).

Аргументы
- (массив) `sourceArray` - массив треков, в котором нужно удалить треки.
- (строка) `lastfmUser` - логин пользователя Last.fm, чью историю прослушиваний нужно исключить.
- (число) `limit` - предельное количество треков истории прослушиваний. По умолчанию 600.

Пример 1 - Создать плейлист с любимыми треками, которые не были прослушаны за последние 5 тысяч скробблов Last.fm пользователя `login`
```js
let savedTracks = Source.getSavedTracks();
Lastfm.removeRecentTracks(savedTracks, 'login', 5000)
Playlist.saveAsNew({
  name: 'Давно не слушал',
  tracks: savedTracks,
});
```

### removeRecentArtists
Удаляет из массива треков `sourceArray` историю недавно прослушанных `limit` треков пользователя `lastfmUser`. Совпадение определяется только по имени исполнителя. Требуется [дополнительная настройка](/install?id=Настройка-lastfm).

Аргументы
- (массив) `sourceArray` - массив треков, в котором нужно удалить треки.
- (строка) `lastfmUser` - логин пользователя Last.fm, чью историю прослушиваний нужно исключить.
- (число) `limit` - предельное количество треков истории прослушиваний. По умолчанию 600.

Пример как у [removeRecentTracks](/func?id=removerecenttracks)

## Yandex

Модуль по работе с Яндекс.Музыкой

### getTracks

Возвращает массив треков плейлиста Яндекс.Музыки. Поиск аналога в базе Spotify по имени исполнителя и названию трека. Внимание на [ограничения](/desc?id=Ограничения). Один трек = один запрос поиска. Указанный пользователь должен иметь публично доступную библиотеку. Настройка находится [здесь](https://music.yandex.ru/settings/other). Кроме того, сам плейлист должен быть публичным (у них есть локальная приватность).

> ❗️ Поиск осуществляется по наилучшему первому совпадению. Поэтому могут появляться "артефакты". Например, треки, которые являются полными синонимами или попытка найти трек, которого нет в базе.

Обязательные аргументы
- (строка) `owner` - логин пользователя Яндекс.Музыки
- (строка) `kinds` - номер плейлиста
- (число) `limit` - количество выбираемых треков. Если не указано, все.
- (число) `offset` - смещение от первого трека. Например, `limit` = 50 и `offset` = 50 вернут треки от 50-го до 100-го.

Аргументы берутся из ссылки на плейлист. Например, для ссылки `https://music.yandex.ru/users/yamusic-daily/playlists/46484894`: логин это `yamusic-daily`, номер это `46484894`.

Пример 1 - Создать Плейлист дня из треков Яндекс.Музыки
```js
 Playlist.saveWithReplace({
     // id: 'ваше id', // после первого создания
     name: 'Плейлист дня',
     tracks: Yandex.getTracks('yamusic-daily', 'ваше id плейлиста дня'),
     randomCover: 'update',
 });
```

### getArtists

Возвращает массив исполнителей из подписок Яндекс.Музыки указанного пользователя. Поиск аналога в базе Spotify по имени исполнителя. Внимание на [ограничения](/desc?id=Ограничения). Один исполнитель = один запрос поиска. Указанный пользователь должен иметь публично доступную библиотеку. Настройка находится [здесь](https://music.yandex.ru/settings/other).

> ❗️ Поиск осуществляется по наилучшему первому совпадению. Поэтому могут появляться "артефакты". Например, вместо исполнителя [Shura](https://open.spotify.com/artist/1qpR5mURxk3d8f6mww6uKT) найдется [Шура](https://open.spotify.com/artist/03JHGoUoM1LQmuXqknBi5P).

Аргументы
- (строка) `owner` - логин пользователя Яндекс.Музыки
- (число) `limit` - количество выбираемых исполнителей. Если не указано, все.
- (число) `offset` - смещение от первого исполнителя. Например, `limit` = 50 и `offset` = 50 вернут исполнителей от 50-го до 100-го.

Пример 1 - Подписаться на 50 последних исполнителей с Яндекса в Spotify. Можно запускать через триггер. Таким образом получить одностороннюю синхронизацию.
```js
let artists = Yandex.getArtists('owner', 50);
Library.followArtists(artists);
```

### getAlbums

Возвращает массив альбомов из подписко Яндекс.Музыки указзаного пользователя. Примечание смотреть в [getTracks](/func?id=gettracks-1).

Аргументы
- (строка) `owner` - логин пользователя Яндекс.Музыки
- (число) `limit` - количество выбираемых альбомов. Если не указано, все.
- (число) `offset` - смещение от первого альбома. Например, `limit` = 50 и `offset` = 50 вернут альбомы от 50-го до 100-го.

Пример 1 - Получить все альбомы из подписок пользователя
```js
let albums = Yandex.getAlbums('owner');
```

## Cache

Модуль для сохранения массивов на Google Диск

> В случае отсутствия требуемой функциональности, можете реализовать свои функции через [DriveApp](https://developers.google.com/apps-script/reference/drive).

### read

Возвращает массив из файла. 

Аргументы
- (строка) `filename` - имя файла

Пример 1 - Добавить треки из файла в плейлист
```js
let tracks = Cache.read('file.json');
Playlist.saveAsNew({
    name: 'Треки из файла',
    tracks: tracks,
});
```

### write

Записывает данные в файл. Если файла не существует, создает его. Если файл есть, перезаписывает содержимое.

Аргументы
- (строка) `filename` - имя файла
- (массив) `content` - массив данных для записи

Пример 1 - Записать любимые треки в файл
```js
let tracks = Sourct.getSavedTracks();
Cache.write('liked.json', tracks);
```

### append

Записывает данные в файл, добавляя новые данные. Если файла не существует, создает его. 

Аргументы
- (строка) `filename` - имя файла
- (массив) `content` - массив данных для добавления
- (строка) `place` - место присоединения. При `begin` в начало файла. При `end` в конец файла. По умолчанию `end`.
- (число) `limit` - ограничить число элементов массива **после** присоединения новых данных. По умолчанию, выбор **первых** 100 тысяч (sliceFirst). Для постоянного обновления потребуется `place` равный 'begin'.

Пример 1 - Добавить новые треки в начало файла. Ограничить массив 5 тысячами треков.
```js
let tracks = Source.getPlaylistTracks('playlist name', 'id');
Cache.append('myfile.json', tracks, 'begin', 5000);
```

Пример 2 - Добавить треки в конец файла. Лимит 100 тысяч. Значения по умолчанию.
```js
let tracks = Source.getPlaylistTracks('playlist name', 'id');
Cache.append('myfile.json', tracks);
```

### clear

Перезаписывает содержимое файла пустым массивом.

Аргументы
- (строка) `filename` - имя файла

Пример 1 - Очистить файл
```js
Cache.clear('filename.json');
```

### copy

Создает копию файла. Возвращает имя созданной копии.

Аргументы
- (строка) `filename` - имя файла

Пример 1 - Создать копию файла и получить его данные
```js
let filename = 'myfile.json';
filename = Cache.copy(filename);
let tracks = Cache.read(filename);
```

### remove

Переносит файл в корзину. По правилам Google Диска, объекты в корзине удаляются через 30 дней.

Аргументы
- (строка) `filename` - имя файла

Пример 1 - Поместить файл в корзину
```js
Cache.remove('filename.json');
```

### rename

Переименовывает файл.

Аргументы
- (строка) `oldFilename` - текущее имя файла
- (строка) `newFilename` - новое имя файла

> ❗️ Не используйте имена `SpotifyRecentTracks`, 'LastfmRecentTracks', 'BothRecentTracks'. Они используются в механизме накопления [истории прослушиваний](/desc?id=История-прослушиваний).

Пример 1 - Переименовать файл
```js
Cache.rename('filename.json', 'newname.json');
```

### compressTracks

Удаляет излишние данные о треках. Позволяет существенно сократить объем файла.

Аргументы
- (массив) `tracks` - массив треков.

Пример 1 - Сжать треки и сохранить в файл
```js
let tracks = Source.getPlaylistTracks('playlist name', 'id');
Cache.compressTracks(tracks);
Cache.write('myfile.json', tracks);
```

### compressArtists

Удаляет излишние данные о исполнителе.

Аргументы
- (массив) `artists` - массив исполнителей.

Пример 1 - Сжать данные о исполнителях и сохранить в файл
```js
let artists = Yandex.getArtists('login');
Cache.compressArtists(artists);
Cache.write('yandex-artists.json', artists);
```