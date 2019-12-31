const weatherForm = document.querySelector('form')
const address = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const weatherIcon = document.querySelector('#weather-icon')
weatherIcon.style.display = 'none'

weatherForm.addEventListener('submit', e => {
    e.preventDefault() //Prevents page refresh
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    weatherIcon.src = ''
    weatherIcon.style.display = 'none'
    
    fetch(`/weather?address=${address.value}`).then(res => {
        res.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                weatherIcon.style.display = 'none'
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.data.summary
                weatherIcon.src = data.data.icon
                weatherIcon.style.display = 'block'
            }
        })
    }).catch(err => {
        messageOne.textContent = err
        messageTwo.textContent = ''
        weatherIcon.style.display = 'none'
    })
})