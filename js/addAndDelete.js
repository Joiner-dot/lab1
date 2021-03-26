//Добавление нового города
async function addCity() {
    let res;
    if (document.getElementById("add").value !== "") {
        try {
            let city = document.getElementById("add").value
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
            res = await axios.get(url)

            //Проверка города на уже существующий город в списке
            for (let i = 1; i < window.localStorage.length; i++) {
                if (res.data.name === window.localStorage.getItem(i)) {
                    throw("Город уже есть")
                }
            }
            window.localStorage.setItem(window.localStorage.length, res.data.name)
            let template = document.getElementById("loader")
            var section = document.createElement("section")
            let count = window.localStorage.length - 1
            section.setAttribute("id", "city" + count)
            var clone = document.importNode(template.content, true);
            section.appendChild(clone)
            document.getElementById("othercities").appendChild(section)
            fetchCityWeather(city, count)

        } catch (e) {
            alert(e)
        }
    }
}

//Удаление города из избранного
function deleteCity(id) {
    let element = id.closest("section")
    let city = element.getElementsByTagName("div").item(0).getElementsByTagName("h3").item(0).textContent
    for (let i = 1; i < window.localStorage.length; i++) {
        if (city === window.localStorage.getItem(i)) {
            let count = i
            for (let j = i + 1; j < window.localStorage.length; j++) {
                let oldel = window.localStorage.getItem(j)
                document.getElementById("city" + j).setAttribute("id", "city" + count)
                window.localStorage.setItem(count, oldel)
                count++
            }
            window.localStorage.removeItem(window.localStorage.length - 1)
        }
    }
    element.remove()
}