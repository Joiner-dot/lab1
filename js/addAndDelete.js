//Добавление нового города
let onSuccess = (data) => {
    let cities = fetchGetFavourites()
    cities.then(list => {
        if (data === false){
            alert("Город уже есть в списке")
        }
        else {
            let template = document.getElementById("loader")
            var section = document.createElement("section")
            let count = list.favouriteCities.length - 1
            section.setAttribute("id", "city" + count)
            var clone = document.importNode(template.content, true);
            section.appendChild(clone)
            document.getElementById("othercities").appendChild(section)
            fetchByName(data.name, count)
        }
    })
}

let onFail = (e) => {
    alert(e)
}

async function addCity() {
    if (document.getElementById("add").value !== "") {
        try {
            let city = document.getElementById("add").value
            fetchAddCity(city).then(onSuccess).catch(onFail)

        } catch (e) {
            alert(e)
        }
    }
}

//Удаление города из избранного
function deleteCity(id) {
    let element = id.closest("section")
    let city = element.getElementsByTagName("div").item(0).getElementsByTagName("h3").item(0).textContent
    fetchDeleteCity(city)
    element.remove()
}