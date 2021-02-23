function buttonwith() {

    var width = screen.width

    if (width < 800) {
        document.getElementById("locationburron").innerHTML = "<img id=\"reloadicon\" src=\"image/93638.png\">"
    }
    else {
        document.getElementById("locationburron").innerHTML = "Обновить геолокацию"
    }
}
