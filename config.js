function setProperties() {
    // Апісанне параметраў: chimildic.github.io/goofy/#/config
    UserProperties.setProperty('CLIENT_ID', 'вашаЗначэнне');
    UserProperties.setProperty('CLIENT_SECRET', 'вашаЗначэнне');
    UserProperties.setProperty('PRIVATE_CLIENT_ID', 'вашаЗначэнне');
    UserProperties.setProperty('PRIVATE_CLIENT_SECRET', 'вашаЗначэнне');

    UserProperties.setProperty('LASTFM_API_KEY', 'вашаЗначэнне');
    UserProperties.setProperty('MUSIXMATCH_API_KEY', 'вашаЗначэнне');

    UserProperties.setProperty('ON_SPOTIFY_RECENT_TRACKS', 'true');
    UserProperties.setProperty('ON_LASTFM_RECENT_TRACKS', 'false');
    UserProperties.setProperty('COUNT_RECENT_TRACKS', '60000');

    UserProperties.setProperty('LASTFM_LOGIN', 'вашЛагін');
    UserProperties.setProperty('LASTFM_RANGE_RECENT_TRACKS', '30');

    UserProperties.setProperty('LOG_LEVEL', 'info');
    UserProperties.setProperty('LOCALE', 'RU'); // Лакаль для адказаў ад Spotify (напрыклад, назвы катэгорый)
    UserProperties.setProperty('REQUESTS_IN_ROW', '20');
    UserProperties.setProperty('MIN_DICE_RATING', '0.6005');
}

// Каб паглядзець бягучыя значэнні параметраў
// function logProperties() {
//     console.log(UserProperties.getProperties())
// }

// Каб скінуць аўтарызацыю і параметры
// function reset() {
//     Admin.reset()
//     setProperties()
// }