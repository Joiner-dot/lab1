//отправка запроса и печать погоды по геолокации
async function fetchCityCurrentWeather(city) {
    let url = urlCity(city)
    try {
        let response = await fetch(url, {
            "method": "GET",
        });
        printCurrentWeather(await response.json())
    } catch (e) {
        alert(e)
    }
}

async function fetchLatLonCurrentWeather(lat, lon) {
    let url = urlLatLon(lat,lon)
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
async function fetchCityWeather(city, i) {
    try {
        let response = await fetch(url, {
            "method": "GET",
        });
        printListCities(await response.json(), i)
    } catch (e) {
        alert(e)
    }
}

