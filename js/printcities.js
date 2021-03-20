function printpreloader () {
    let template = document.getElementById("loader")
    for(let i = 1; i < window.localStorage.length; i++){
        var section = document.createElement("section")
        section.setAttribute("id", "city" + i)
        var clone
        clone = document.importNode(template.content, true);
        section.appendChild(clone)
        document.getElementById("othercities").appendChild(section)
    }
}


function printthisweater(res) {
    let section = document.querySelector("#thisweater")
    section.querySelector("#currentlocation").textContent = res.name
    section.querySelector("#currentgrad").textContent = Math.ceil((res.main.temp) * 10) / 10 + "°C"
    section.querySelector("#currentlocationicon").src = "image/day_"
        + res.weather[0].main.toLowerCase()
        + ".png"
    let ul = document.querySelector("#contain")
    addtolist(ul, res)
}

//Работа с показателями ветра, давления, влажности и координат и добавление их в список
function addtolist(ul, res) {
    ul.innerHTML = ""
    let template = document.querySelector("#template-contain")
    let parameters = template.content.querySelectorAll("p")
    parameters[1].textContent = res.wind.speed + " м/с"
    parameters[3].textContent = res.weather[0].description
    parameters[5].textContent = res.main.pressure + " hpa"
    parameters[7].textContent = res.main.humidity + " %"
    parameters[9].textContent = "[ " + res.coord.lon + ", " + res.coord.lat + " ]"
    var clone
    clone = document.importNode(template.content, true);
    ul.appendChild(clone);
}


//Печать избранного города
function printothercity(res, count3) {
    let name = "city" + count3

    //Определяем значения
    let template = document.querySelector("#template-othercity")
    template.content.querySelector(".graofothercity").textContent
        = Math.ceil((res.main.temp) * 10) / 10 + "°C"
    template.content.querySelector(".nameofothercity").textContent = res.name
    template.content.querySelector(".othercityicon").src = "image/day_"
        + res.weather[0].main.toLowerCase()
        + ".png"

    let ul = template.content.querySelector(".details")
    addtolist(ul, res)
    let section = document.getElementById(name)
    section.innerHTML = ""
    var clone = document.importNode(template.content, true);
    section.appendChild(clone)
    document.getElementById("othercities").appendChild(section)
}