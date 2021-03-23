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

async function fetchallcities(urls) {
    let count = 1
    try {
        let requests = await urls.map(url => fetch(url, {
            "method": "GET",
        }));
        let responces = await Promise.all(requests)
        responces = await Promise.all(responces.map(r => r.json()))
        responces.forEach(responce => printothercity(responce, count++))
    } catch (e) {
        alert(e)
    }
}