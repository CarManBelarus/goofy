function setProperties() {
    // Апісанне параметраў: chimildic.github.io/goofy/#/config
    UserProperties.setProperty('CLIENT_ID', 'вашаЗначэнне');
    UserProperties.setProperty('CLIENT_SECRET', 'вашаЗначэнне');
    UserProperties.setProperty('PRIVATE_CLIENT_ID', 'вашаЗначэнне');
    UserProperties.setProperty('PRIVATE_CLIENT_SECRET', 'вашаЗначэнне');

<<<<<<< HEAD
    UserProperties.setProperty('LASTFM_API_KEY', 'вашаЗначэнне');
=======
    UserProperties.setProperty('LASTFM_API_KEY', 'вашеЗначение');
>>>>>>> upstream/main

    UserProperties.setProperty('ON_SPOTIFY_RECENT_TRACKS', 'true');
    UserProperties.setProperty('ON_LASTFM_RECENT_TRACKS', 'false');
    UserProperties.setProperty('COUNT_RECENT_TRACKS', '60000');

    UserProperties.setProperty('LASTFM_LOGIN', 'вашЛагін');
    UserProperties.setProperty('LASTFM_RANGE_RECENT_TRACKS', '30');

    UserProperties.setProperty('LOG_LEVEL', 'info');
<<<<<<< HEAD
    UserProperties.setProperty('LOCALE', 'RU'); // Лакаль для адказаў ад Spotify (напрыклад, назвы катэгорый)
    
    // ЗМЯНЕННЕ 3.0.0: Ліміт запытаў строга 10 для стабільнасці
=======
    UserProperties.setProperty('LOCALE', 'RU');
>>>>>>> upstream/main
    UserProperties.setProperty('REQUESTS_IN_ROW', '10');
    UserProperties.setProperty('MIN_DICE_RATING', '0.6005');
}

<<<<<<< HEAD
// Каб паглядзець бягучыя значэнні параметраў
function logProperties() {
    console.log(UserProperties.getProperties());
}

// Каб скінуць аўтарызацыю і параметры
function reset() {
    Admin.reset();
    setProperties();
}
=======
// Чтобы посмотреть текущие значения параметров
function logProperties() {
    console.log(UserProperties.getProperties())
}

// Чтобы сбросить авторизацию и параметры
function reset() {
    Admin.reset()
    setProperties()
}
>>>>>>> upstream/main
