const city = document.getElementById("city-el")
const searchBtn = document.getElementById("search-btn")
const cityTitle = document.getElementById("city-title")
const skyEl = document.getElementById("sky-el")
const tempEl = document.getElementById("temp-el")
const minTempEl = document.getElementById("min-temp-el")
const maxTempEl = document.getElementById("max-temp-el")

const apiKey = "eeccf137789c6df5effe34534a5b2e8c"
const url = "https://api.openweathermap.org/data/2.5/weather?q="


const getWeather = async (value) => {

    let response = await fetch(`${url}${value}&appid=${apiKey}&units=metric`)
    let data = await response.json()

    // console.log(data.weather[0].description)
    cityTitle.innerText = value

    skyEl.innerText = `${data.weather[0].main}`
    tempEl.innerText = `Temp: ${data.main.temp}°C`
    minTempEl.innerText = `Min Temp: ${data.main.temp_min}°C`
    maxTempEl.innerText = `MaxTemp: ${data.main.temp_max} °C`
}


const search = () => {

    let value = city.value
    if (value == "") {
        value = "----"
    }
    getWeather(value)
    getBackground(value)
}

searchBtn.addEventListener("click", search)
let value = ""
document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        search()
    } else {
        value += e.key
        // console.log(value);
    }

})
const getlocation = async () => {
    let response = await fetch('https://get.geojs.io/v1/ip/geo.json')
    let data = await response.json()
    // console.log(data)
    getWeather(data.city)
    getBackground(data.city)
}

getlocation()

const bodyEl = document.getElementById("body")

const getBackground = async (city) => {

    if (city == 'karachi' || 'Karachi') {
        let response = await fetch(`https://api.unsplash.com//search/photos?client_id=8Uzk2af1CnbW9ecswytWcW5-qxHL2AF2Czlup00frwA&query=faisalabad`)
        let data = await response.json()
        bodyEl.style.backgroundImage = `url('${data.results[0].urls.full}')`
    } else {
        let response = await fetch(`https://api.unsplash.com//search/photos?client_id=8Uzk2af1CnbW9ecswytWcW5-qxHL2AF2Czlup00frwA&query=${city}`)
        let data = await response.json()
        bodyEl.style.backgroundImage = `url('${data.results[0].urls.full}')`
    }
    // console.log(data.results[0].urls.full)
   

    // let backgroundUrl = data.results[0].urls.full

    // bodyEl.style.backgroundImage = `url('')`;

}

