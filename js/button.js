//Изменение кнопки при мобильной версии
function buttonWidth() {

    let width = document.documentElement.clientWidth;
    if (width < 1000) {
        document.getElementById("locationburron").innerHTML = "<img id=\"reloadicon\" " +
            "src=\"image/93638.png\">"
    } else {
        document.getElementById("locationburron").innerHTML = "Обновить геолокацию"
    }
}