
window.onload = async function () {
    //кнопка "обновить геолокацию"
    buttonWidth()
    //текущие координаты
    navigator.geolocation.getCurrentPosition(showLocation, notReceived, {timeout: 10000})
    //остальные города
    fetchGetFavourites().then(onSucess)

}

let onSucess = async (data) => {
    let count = 0
    let cities = data.favouriteCities;
    printLoader(cities)
    try {
        let requests = await cities.map(cityName => fetch(`https://server-apppppp.herokuapp.com/weather/city?q=${cityName}`));
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
    fetchCityByLocation(lat,lon)
}

//Запрос погоды дефолтного города
function notReceived() {
    alert("Ошибка вашего местоположения, поэтому берем дефолтный город")

    let city = "Москва"
    fetchCityByName(city)
}


//Обновить геолокацию
function updateCurrentWeather() {
    loaderIcon()
    navigator.geolocation.getCurrentPosition(showLocation, notReceived, {timeout: 10000})
}

function loaderIcon (){
    document.querySelector("#currentlocationicon").src = "image/14285.png"
    document.querySelector("#currentlocation").textContent = ""
    document.querySelector("#currentgrad").textContent = ""
    document.querySelector("#contain").innerHTML = ""
}
