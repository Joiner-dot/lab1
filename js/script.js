let apiKey = "275483d966e6fd1ad712f36660db4ea6";
let count = 0

function buttonwith() {

    var width = document.documentElement.clientWidth
    console.log(width)
    if (width < 1000) {
        document.getElementById("locationburron").innerHTML = "<img id=\"reloadicon\" src=\"image/93638.png\">"
    } else {
        document.getElementById("locationburron").innerHTML = "Обновить геолокацию"
    }
}

function printthisweater(res) {
    document.querySelector('#thisweater').innerHTML =
        "<h2 id=\"currentlocation\">" + res.data.name + "</h2>\n" +
        "                <img id=\"currentlocationicon\" src=\"image/day_" + res.data.weather[0].main.toLowerCase() + ".png\">\n" +
        "                <p id=\"currentgrad\">" + Math.ceil((res.data.main.temp) * 10) / 10 + "°C</p>\n" +
        "                <ul id=\"contain\">\n" +
        "                    <li class=\"wind\">\n" +
        "                        <p class=\"hh\">Ветер</p>\n" +
        "                        <p>" + res.data.wind.speed + " км/ч</p>\n" +
        "                    </li>\n" +
        "                    <li class=\"wind\">\n" +
        "                        <p class=\"hh\">Облачность</p>\n" +
        "                        <p>" + res.data.weather[0].description + "</p>\n" +
        "                    </li>\n" +
        "                    <li class=\"wind\">\n" +
        "                        <p class=\"hh\">Давление</p>\n" +
        "                        <p>" + res.data.main.pressure + " hpa</p>\n" +
        "                    </li>\n" +
        "                    <li class=\"wind\">\n" +
        "                        <p class=\"hh\">Влажность</p>\n" +
        "                        <p>" + res.data.main.humidity + "%</p>\n" +
        "                    </li>\n" +
        "                    <li class=\"wind\">\n" +
        "                        <p class=\"hh\">Координаты</p>\n" +
        "                        <p>[" + res.data.coord.lon + ", " + res.data.coord.lat + "]</p>\n" +
        "                    </li>\n" +
        "                </ul>"
}

function showlocation(position) {
    var lat = position.coords.latitude
    var lon = position.coords.longitude

    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lang=ru&units=metric&lat=${lat}&lon=${lon}`;
    try {
        axios.get(url).then(res => {
            printthisweater(res)
        })
    } catch (e) {
        alert(e)
    }
}

function printothercity(res, count3) {
    let name = "#city" + count3
    console.log(name)
    document.querySelector(name).innerHTML =
        "            <h3 class=\"nameofothercity\">" + res.data.name + "</h3>\n" +
        "            <p class=\"graofothercity\">" + Math.ceil((res.data.main.temp) * 10) / 10 + "°C</p>\n" +
        "            <img class=\"othercityicon\" src=\"image/day_" + res.data.weather[0].main.toLowerCase() + ".png\">\n" +
        "            <button class=\"x\">×</button>\n" +
        "            <ul class=\"details\">\n" +
        "                <li class=\"wind\">\n" +
        "                    <p class=\"hh\">Ветер</p>\n" +
        "                    <p>" + res.data.wind.speed + " км/ч</p>\n" +
        "                </li>\n" +
        "                <li class=\"wind\">\n" +
        "                    <p class=\"hh\">Облачность</p>\n" +
        "                    <p>" + res.data.weather[0].description + "</p>\n" +
        "                </li>\n" +
        "                <li class=\"wind\">\n" +
        "                    <p class=\"hh\">Давление</p>\n" +
        "                    <p>" + res.data.main.pressure + " hpa</p>\n" +
        "                </li>\n" +
        "                <li class=\"wind\">\n" +
        "                    <p class=\"hh\">Влажность</p>\n" +
        "                    <p>" + res.data.main.humidity + "%</p>\n" +
        "                </li>\n" +
        "                <li class=\"wind\">\n" +
        "                    <p class=\"hh\">Координаты</p>\n" +
        "                    <p>[" + res.data.coord.lon + ", " + res.data.coord.lat + "]</p>\n" +
        "                </li>\n" +
        "            </ul>\n"
}

function notReceived() {
    alert("Ошибка вашего местоположения, поэтому берем дефолтный город")

    city = "Москва"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
    try {
        axios.get(url).then(res => {
            printthisweater(res)
        })
    } catch (e) {
        alert(e)
    }
}

window.onload = function () {
    //кнопка
    var width = document.documentElement.clientWidth
    if (width < 1000) {
        document.getElementById("locationburron").innerHTML = "<img id=\"reloadicon\" src=\"image/93638.png\">"
    } else {
        document.getElementById("locationburron").innerHTML = "Обновить геолокацию"
    }
    //текущие координаты
    if (navigator.geolocation) {
        console.log("123")
        navigator.geolocation.getCurrentPosition(showlocation, notReceived, {timeout: 10000})
    } else {
        city = "Москва"
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
        axios.get(url).then(res => {
            printthisweater(res)
        })
    }
    //отсальные города
    for (let i = 0; i < window.localStorage.length; i++) {
        let city = window.localStorage.getItem(i)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
        axios.get(url).then(res => {
            printothercity(res, i)
        })
    }
}

function updatethisweather() {
    let city = document.getElementById("currentlocation").textContent
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
    try {
        axios.get(url).then(res => {
            printthisweater(res)
        })
    } catch (e) {
        alert(e)
    }
}

//новый город
function addcity() {
    if (document.getElementById("add").value !== "")
        window.localStorage.setItem(window.localStorage.length, document.getElementById("add").value)
    count++
    console.log(window.localStorage)
    let city = document.getElementById("add").value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
    try {
        axios.get(url).then(res => {
            count2 = window.localStorage.length - 1
            console.log(count2)
            document.querySelector("#othercities").innerHTML += "<section id=\"city" + count2 + "\">\n" +
                "            <h3>Загрузка</h3>\n" +
                "        </section>"
            printothercity(res, count2)
        })
    } catch (e) {
        alert(e)
    }
}
