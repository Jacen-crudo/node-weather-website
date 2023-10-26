const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value
    const messageImg = document.querySelector('#messageImg')

    if(messageImg) messageImg.remove();

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                const displayImg = document.createElement("img")
                const parentDiv = messageOne.parentNode

                displayImg.id = "messageImg"
                displayImg.src = data.forecastData.descImg
                displayImg.width = 100
                displayImg.style = "margin-top:16px"

                parentDiv.insertBefore(displayImg, messageOne)

                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})