async function fetchCityByName(cityName) {
    let data = await fetch(`https://server-apppppp.herokuapp.com/weather/city?q=${cityName}`);
    if (data.status === 200) {
        printCurrentWeather(await data.json())
    } else {
        alert(new Error(`Bad request ${data.status}`));
    }
}

async function fetchCityByLocation(lat, lon) {
    let data = await fetch(`https://server-apppppp.herokuapp.com/weather/coordinates?lat=${lat}&lon=${lon}`);
    if (data.status === 200) {
        printCurrentWeather(await data.json())
    } else {
        alert(new Error(`Bad request ${data.status}`));
    }
}

async function fetchByName(cityName, i) {
    let data = await fetch(`https://server-apppppp.herokuapp.com/weather/city?q=${cityName}`);
    if (data.status === 200) {
        printListCities(await data.json(), i)
    } else {
        alert(new Error(`Bad request ${data.status}`));
    }
}


async function fetchGetFavourites() {
    let data = await fetch("https://server-apppppp.herokuapp.com/favourites", {
        "method": "GET",
    });
    if (data.status === 200) {
        return await data.json();
    }
    throw new Error(`Bad request ${data.status}`);
}

async function fetchAddCity(cityName) {
    let data = await fetch(`https://server-apppppp.herokuapp.com/favourites?q=${cityName}`, {method: "POST"});
    if (data.status === 200) {
        return await data.json();
    } else if (data.status === 600) {
        return false;
    }
    throw new Error(`Bad request ${data.status}`);
}

async function fetchDeleteCity(cityName) {
    let data = await fetch(`https://server-apppppp.herokuapp.com/favourites?q=${cityName}`, {method: "DELETE"});
    if (data.status !== 200) {
        alert(new Error(`Bad request ${data.status}`));
    }
}

