//отправка запроса и печать погоды по геолокации
async function fetchthisweather(url) {
    try {
        let response = await fetch(url, {
            "method": "GET",
        });
        printthisweater(await response.json())
    } catch (e) {
        alert(e)
    }
}

//отправка запроса и печать погоды избранных городов
async function fetchotherweather(url, i) {
    try {
        let response = await fetch(url, {
            "method": "GET",
        });
        printothercity(await response.json(), i)
    } catch (e) {
        alert(e)
    }
}