let apiKey = window.localStorage.getItem("apiKey");

window.onload = function () {
    //кнопка "обновить геолокацию"
    buttonwith()
    //текущие координаты
        navigator.geolocation.getCurrentPosition(showlocation, notReceived, {timeout: 10000})
    //остальные города
    for (let i = 1; i < window.localStorage.length; i++) {
        let city = window.localStorage.getItem(i)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
        getresotherweather(url, i)
    }
}

function showlocation(position) {
    var lat = position.coords.latitude
    var lon = position.coords.longitude

    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lang=ru&units=metric&lat=${lat}&lon=${lon}`
    getresthisweather(url)
}

function notReceived() {
    alert("Ошибка вашего местоположения, поэтому берем дефолтный город")

    let city = "Москва"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
    getresthisweather(url)
}

//отправка запроса и печать погоды по геолокации
async function getresthisweather(url) {
    let res;
    try {
        res = await axios.get(url)
        printthisweater(res)
    } catch (e) {
        alert(e)
    }

}

//отправка запроса и печать погоды избранных городов
async function getresotherweather(url, i) {
    let res;
    try {
        res = await axios.get(url)
        printothercity(res, i)
    } catch (e) {
        alert(e)
    }
}

//Печать города по геолокации
function printthisweater(res) {

//Определяем значения
    document.getElementById("currentgrad").textContent = Math.ceil((res.data.main.temp) * 10) / 10 + "°C"
    document.getElementById("currentlocation").textContent = res.data.name
    document.getElementById("currentlocationicon").src = "image/day_"
        + res.data.weather[0].main.toLowerCase()
        + ".png"

    let ul = document.getElementById("contain")
    ul.innerHTML = ""
    addtolist(ul, res)

}

//Печать избранного города
function printothercity(res, count3) {
    let name = "#city" + count3

    //Определяем значения
    document.querySelector(name + " .graofothercity").textContent
        = Math.ceil((res.data.main.temp) * 10) / 10 + "°C"
    document.querySelector(name + " .nameofothercity").textContent = res.data.name
    document.querySelector(name + " .othercityicon").src = "image/day_"
        + res.data.weather[0].main.toLowerCase()
        + ".png"


    let ul = document.querySelector(name + " .details")
    addtolist(ul, res)
}

//Обновить геолокацию
function updatethisweather() {
    navigator.geolocation.getCurrentPosition(showlocation, notReceived, {timeout: 10000})
}

//Работа с показателями ветра, давления, влажности и координат и добавление их в список
function addtolist(ul, res) {

    //Ветер
    let li = document.createElement("li")
    li.setAttribute("class", "wind")
    li.innerHTML = "<p class=\"hh\">Ветер</p>\n" +
        "               <p>" + res.data.wind.speed + " м/с</p>\n"
    ul.appendChild(li)

    //Облачность
    li = document.createElement("li")
    li.setAttribute("class", "wind")
    li.innerHTML = "<p class=\"hh\">Облачность</p>\n" +
        "           <p>" + res.data.weather[0].description + "</p>\n"
    ul.appendChild(li)

    //Дввление
    li = document.createElement("li")
    li.setAttribute("class", "wind")
    li.innerHTML = "<p class=\"hh\">Давление</p>\n" +
        "           <p>" + res.data.main.pressure + " hpa</p>\n"
    ul.appendChild(li)

    //Влажность
    li = document.createElement("li")
    li.setAttribute("class", "wind")
    li.innerHTML = "<p class=\"hh\">Влажность</p>\n" +
        "           <p>" + res.data.main.humidity + "%</p>\n"
    ul.appendChild(li)

    //Координаты
    li = document.createElement("li")
    li.setAttribute("class", "wind")
    li.innerHTML = "<p class=\"hh\">Координаты</p>\n" +
        "           <p>[" + res.data.coord.lon + ", " + res.data.coord.lat + "]</p>\n"
    ul.appendChild(li)
}

function buttonwith() {

    let width = document.documentElement.clientWidth;
    if (width < 1000) {
        document.getElementById("locationburron").innerHTML = "<img id=\"reloadicon\" " +
            "src=\"image/93638.png\">"
    } else {
        document.getElementById("locationburron").innerHTML = "Обновить геолокацию"
    }
}

//Добавление нового города
async function addcity() {
    let res;
    if (document.getElementById("add").value !== "") {
        try {
            let city = document.getElementById("add").value
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
            res = await axios.get(url)

            //Проверка города на уже существующий город в списке
            for (let i = 1; i < window.localStorage.length; i++) {
                if (res.data.name === document.querySelector("#city" + i + " .nameofothercity").textContent) {
                    throw("Город уже есть")
                }
            }
            window.localStorage.setItem(window.localStorage.length, res.data.name)
            let count = window.localStorage.length - 1
            document.querySelector("#othercities").innerHTML +=
                "<section id=\"city"+ count +"\">            " +
                "<h3 class=\"nameofothercity\">Загрузка</h3>\n" +
                "            <p class=\"graofothercity\"></p>\n" +
                "            <img class=\"othercityicon\">\n" +
                "            <button class=\"x\">×</button>\n" +
                "            <ul class=\"details\">\n" +
                "            </ul>\n" +
                "</section>"

            getresotherweather(url, window.localStorage.length - 1)

        } catch (e) {
            alert(e)
        }
    }
}
