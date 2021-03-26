//отправка запроса и печать погоды по геолокации
async function fetchCurrentWeather(url) {
    try {
        let response = await fetch(url, {
            "method": "GET",
        });
        printCurrentWeather(await response.json())
    } catch (e) {
        alert(e)
    }
}

//отправка запроса и печать погоды избранных городов
async function fetchCityWeather(url, i) {
    try {
        let response = await fetch(url, {
            "method": "GET",
        });
        printListCities(await response.json(), i)
    } catch (e) {
        alert(e)
    }
}

