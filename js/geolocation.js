let apiKey = window.localStorage.getItem("apiKey");

window.onload = function () {
    window.localStorage.setItem("apiKey", "275483d966e6fd1ad712f36660db4ea6")
    //кнопка "обновить геолокацию"
    buttonwith()
    //текущие координаты
    navigator.geolocation.getCurrentPosition(showlocation, notReceived, {timeout: 10000})
    //остальные города
    printpreloader()
    let urls = []
    for (let i = 1; i < window.localStorage.length; i++) {
        let city = window.localStorage.getItem(i)
        urls.push(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`);
    }
    fetchallcities(urls)
}

//Запрос погоды по геолокации
function showlocation(position) {
    var lat = position.coords.latitude
    var lon = position.coords.longitude
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lang=ru&units=metric&lat=${lat}&lon=${lon}`
    fetchthisweather(url)
}

//Запрос погоды дефолтного города
function notReceived() {
    alert("Ошибка вашего местоположения, поэтому берем дефолтный город")

    let city = "Москва"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
    fetchthisweather(url)
}


//Обновить геолокацию
function updatethisweather() {
    navigator.geolocation.getCurrentPosition(showlocation, notReceived, {timeout: 10000})
}


