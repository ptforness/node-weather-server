const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const address = document.querySelector('#address')
const summary = document.querySelector('#summary')
const currentTemp = document.querySelector('#current-temperature')
const chanceOfRain = document.querySelector('#chance-of-rain')
const weatherIcon = document.querySelector('#weather-icon')
weatherIcon.style.display = 'none'

weatherForm.addEventListener('submit', e => {
    e.preventDefault() //Prevents page refresh
    address.textContent = 'Loading...'
    summary.textContent = ''
    currentTemp.textContent = ''
    chanceOfRain.textContent = ''
    weatherIcon.src = ''
    weatherIcon.style.display = 'none'
    
    fetch(`/weather?address=${input.value}`).then(res => {
        res.json().then(data => {
            if (data.error) {
                address.textContent = data.error
                summary.textContent = ''
                currentTemp.textContent = ''
                chanceOfRain.textContent = ''
                weatherIcon.style.display = 'none'
            } else {
                address.textContent = data.location
                summary.textContent = data.data.summary
                currentTemp.textContent = `Current Temperature: ${data.data.currentTemp}°F`
                chanceOfRain.textContent = `Chance of Rain: ${data.data.chanceOfRain}`
                weatherIcon.src = data.data.icon
                weatherIcon.style.display = 'block'
            }
        })
    }).catch(err => {
        address.textContent = "Error: Could not retrieve forecast data."
        summary.textContent = ''
        currentTemp.textContent = ''
        chanceOfRain.textContent = ''
        weatherIcon.style.display = 'none'
    })
})