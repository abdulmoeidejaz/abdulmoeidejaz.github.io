const city = document.getElementById("city-el")
const searchBtn = document.getElementById("search-btn")
const cityTitle = document.getElementById("city-title")
const skyEl = document.getElementById("sky-el")
const tempEl = document.getElementById("temp-el")
const minTempEl = document.getElementById("min-temp-el")
const maxTempEl = document.getElementById("max-temp-el")
const timeEl = document.getElementById("time")

const apiKey = "eeccf137789c6df5effe34534a5b2e8c"
const url = "https://api.openweathermap.org/data/2.5/weather?q="

const getTimeZone = async (country) => {
    const response = await fetch(`https://api.timezonedb.com/v2.1/list-time-zone?key=IYV1N8O6KN5E&format=json&country=${country}`);
    const data = await response.json();

    zoneName = data.zones[0].zoneName

    setInterval(() => {
        getTime(zoneName)
    }, 1000);
}
const getTime = (timeZoneInfo) => {
    // const timeZoneName = timeZoneInfo
    const date = new Date();

    const dateString = date.toLocaleDateString('en-US', { timeZone: timeZoneInfo });
    const timeString = date.toLocaleTimeString('en-US', { timeZone: timeZoneInfo });
    timeEl.innerHTML = "Time: " + timeString;

    // return timeZoneInfo;
}

const getWeather = async (value) => {

    let response = await fetch(`${url}${value}&appid=${apiKey}&units=metric`)
    let data = await response.json()

    cityTitle.innerText = value

    skyEl.innerText = `${data.weather[0].main}`
    tempEl.innerText = `Temp: ${data.main.temp}°C`
    minTempEl.innerText = `Min Temp: ${data.main.temp_min}°C`
    maxTempEl.innerText = `Max Temp: ${data.main.temp_max} °C`
    getTimeZone(data.sys.country)
}


const search = () => {

    let value = city.value
    if (value == "") {
        value = "----"
    }
    getWeather(value)
    getBackground(value)
    getTimeZone()
}

searchBtn.addEventListener("click", search)
let value = ""
document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        search()
    } else {
        value += e.key
    }

})
const getlocation = async () => {
    let response = await fetch('https://get.geojs.io/v1/ip/geo.json')
    let data = await response.json()

    getWeather(data.city)
    getBackground(data.city)
}

getlocation()

const bodyEl = document.getElementById("body")

const getBackground = async (city) => {


    if (city === "Faisalabad") {
        let response = await fetch(`https://api.unsplash.com//search/photos?client_id=8Uzk2af1CnbW9ecswytWcW5-qxHL2AF2Czlup00frwA&query=${city}+clock+tower`)
        let data = await response.json()
        bodyEl.style.backgroundImage = `url('${data.results[0].urls.full}')`
    } else {
        let response = await fetch(`https://api.unsplash.com//search/photos?client_id=8Uzk2af1CnbW9ecswytWcW5-qxHL2AF2Czlup00frwA&query=${city}`)
        let data = await response.json()
        bodyEl.style.backgroundImage = `url('${data.results[0].urls.full}')`
    }

}

const timeEl01 = document.getElementById("time01")
const timeEl02 = document.getElementById("time02")
const timeEl03 = document.getElementById("time03")

const updateTime = () => {
    const pkTime = () => {
        const date = new Date()
        const dateString = date.toLocaleDateString('en-US', { timeZone: "Asia/Karachi" });
        const timeString = date.toLocaleTimeString('en-US', { timeZone: "Asia/Karachi" });
        timeEl01.innerHTML = "Time PK: " + timeString;
    }

    const inTime = () => {
        const date = new Date()
        const dateString = date.toLocaleDateString('en-US', { timeZone: "Asia/Kolkata" });
        const timeString = date.toLocaleTimeString('en-US', { timeZone: "Asia/Kolkata" });
        timeEl02.innerHTML = "Time IN: " + timeString;
    }
    const dbTime = (country) => {
        const date = new Date()
        const dateString = date.toLocaleDateString('en-US', { timeZone: country });
        const timeString = date.toLocaleTimeString('en-US', { timeZone: country });
        timeEl03.innerHTML = "Time DB: " + timeString;
    }
    pkTime()
    inTime()
    dbTime("Asia/Dubai")
}
