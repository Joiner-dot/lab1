let apiKey = "275483d966e6fd1ad712f36660db4ea6";
let count = 1

window.onload = async function () {
    window.localStorage.setItem("apiKey", "275483d966e6fd1ad712f36660db4ea6")
    //кнопка "обновить геолокацию"
    buttonWidth()
    //текущие координаты
    navigator.geolocation.getCurrentPosition(showLocation, notReceived, {timeout: 10000})
    //остальные города
    printLoader()
    let urls = []
    for (let i = 1; i < window.localStorage.length; i++) {
        let city = window.localStorage.getItem(i)
        urls.push(urlCity(city));
    }
    try {
        let requests = await urls.map(url => fetch(url, {
            "method": "GET",
        }));
        let responces = await Promise.all(requests)
        responces = await Promise.all(responces.map(r => r.json()))
        responces.forEach(responce => printListCities(responce, count++))
    } catch (e) {
        alert(e)
    }
}


//Запрос погоды по геолокации
function showLocation(position) {
    var lat = position.coords.latitude
    var lon = position.coords.longitude
    fetchLatLonCurrentWeather(lat,lon)
}

//Запрос погоды дефолтного города
function notReceived() {
    alert("Ошибка вашего местоположения, поэтому берем дефолтный город")

    let city = "Москва"
    fetchCityCurrentWeather(city)
}


//Обновить геолокацию
function updateCurrentWeather() {
    navigator.geolocation.getCurrentPosition(showLocation, notReceived, {timeout: 10000})
}


function urlLatLon(lat, long) {
    return `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lang=ru&units=metric&lat=${lat}&lon=${long}`
}


function urlCity(city){
   return `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`
}
