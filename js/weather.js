// api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

$(() => {

    fetch('api.openweathermap.org/data/2.5/weather?q={},{state code},{country code}&appid={API key}')

    let cityName = ('')
    let countryCode = ('')
    let stateCode = ('')
    
    .then(response => response.json())
    .then(data => {
        // needs to obj for map api

    })

    .catch((error)=>{
        console.log(error)

    })

})