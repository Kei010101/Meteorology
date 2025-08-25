const searchBox = document.querySelector('input') // input type search
let countryName = document.querySelector('.countryName')

new Notification(" hey, How's the Weather Today? ")
///////////////////////////////////////////////////////////////////////////////////////////////////
let apiData = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=iran&appid=96d925fbab426db62b2f2fbc8b466335',
    key: '96d925fbab426db62b2f2fbc8b466335'
}

var countryValue = searchBox.value
function fetchData() {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchBox.value}&appid=${apiData.key}`) //set data
        .then(res => res.json())
        .then(data => {

            console.log(data);

            frontEnd__display(data)

        })
        .catch(err => {
            console.log("خطایی رخ داده است", err)
            searchBox.placeholder = "please check your inputs"
            searchBox.classList.add('ErrorInput')

        })

}

let cityName = document.querySelector('.cityName')

function frontEnd__display(data) {

    countryName.innerHTML = `${data.sys.country}`
    //////////////////////////////////////////////////////
    cityName.innerHTML = `${data.name}`

    ///////////////////////////////////////////////////////////////
    const skyMood = document.querySelector('.skyMood')
    skyMood.innerHTML = `${data.weather[0].main}`


    let resultBoxState = document.querySelector('.resultBox')

    if (`${data.weather[0].main}` === "Clouds") {
        resultBoxState.classList.toggle('CloudsPic')

    } else if (`${data.weather[0].main}` === "Rain") {
        resultBoxState.classList.toggle('RainPic')

    } else if (`${data.weather[0].main}` === "Snow") {
        resultBoxState.classList.toggle('SnowPic')

    } else if (`${data.weather[0].main}` === "Mist") {
        resultBoxState.classList.toggle('MistPic')

    } else if (`${data.weather[0].main}` === "Clear") {
        resultBoxState.classList.toggle('ClearPic')

    } else {
        resultBoxState.classList.toggle('resultBox')
    }

    //////////////////////////////////////////////////////////////////////////////
    const Fspan = document.querySelector('.Fspan')

    if (`${data.main.temp_min - 273.15}` < 10) {
        Fspan.innerHTML = "0" + Math.floor(`${data.main.temp_min - 273.15}`) + "  ℃"
    } else if (`${data.main.temp_min - 273.15}` > 10) {
        Fspan.innerHTML = Math.floor(`${data.main.temp_min - 273.15}`) + "  ℃"
    }

    const Lspan = document.querySelector('.Lspan')
    if (`${data.main.temp_max - 273.15}` <= 10) {
        Lspan.innerHTML = "0" + Math.floor(`${data.main.temp_max - 273.15}`) + "  ℃"

    } else {
        Lspan.innerHTML = Math.floor(`${data.main.temp_max - 273.15}`) + "  ℃"
    }

    const avgTempElem = document.querySelector('.avgTemp')
    avgTempElem.innerHTML = "Avg Temp " + Math.floor(`${data.main.temp - 273.15}`)

    const weatherDescribtionElem = document.querySelector('.weatherDescribtion')
    weatherDescribtionElem.innerHTML = "Describtion: " + `${data.weather[0].description}`

    const humidityElem = document.querySelector('.humidity')
    humidityElem.innerHTML = "humidity " + `${data.main.humidity}`

    const pressureElem = document.querySelector('.pressure')
    pressureElem.innerHTML = "pressure " + `${data.main.pressure}`

    const windSpeedElem = document.querySelector('.windSpeed')
    windSpeedElem.innerHTML = "wind Speed " + `${data.wind.speed}`

}

function showDate() {

    let months = ['January ', 'February ', 'March ', 'April ', 'May ', 'June '
        , 'July ', 'August ', 'September', 'October', 'November', 'December']

    let weekDays = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'friday']

    const RNdate = new Date()
    console.log(RNdate);

    let day = weekDays[RNdate.getDay()]
    let month = months[RNdate.getMonth()]
    let year = RNdate.getFullYear()
    let dateNumber = RNdate.getDate()

    return `${day} ${dateNumber} ${month} ${year}`

}
let dateForToday = document.querySelector('.date')

searchBox.addEventListener('keypress', (event) => {

    searchBox.placeholder = " Which City ... "
    searchBox.classList.remove('ErrorInput')
    // on press Enter function fetchData get called
    if (event.keyCode === 13) {
        fetchData()
        cityName.innerHTML = searchBox.value
        searchBox.value = ''
        dateForToday.innerHTML = showDate()
    }

})

// axios.get('https://api.openweathermap.org/data/2.5/weather?q=3ee20d11963859247dc367090e259f75')
//     .then(res => console.log(res))
//     .catch(err => console.log(err));

////////////////////////////////////////////////////////////////////// dark mood methods
let moonSun = document.querySelector('.moonMood')

moonSun.addEventListener('click', function () {
    document.body.classList.toggle('dark')
    document.body.style.transitionDuration = '1.2s'
    moonSun.classList.toggle('moonToSun')

})

//////////////////////////////////////////////////////////////////////////// Details

const detailsBtn = document.querySelector('.details')
const DetailsBox = document.querySelector('.detailsDiv')

detailsBtn.addEventListener('click', () => {

    DetailsBox.classList.toggle('openClose')

})