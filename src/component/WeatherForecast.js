import React from 'react'

const WeatherForecast = (props) => {
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const forecastIcon = {
        'Clear': '☀',
        'Clouds': '☁',
        'Thunderstorm': '⛈',
        'Drizzle': '🌦',
        'Rain': '🌧',
        'Snow': '❄',
        'Mist': '🌫'
    }

    console.log(props.data)

    const forecastArr = props.data.map(forecast => {
        const day = new Date(parseInt(forecast.dt) * 1000).getDay()

        console.log(forecast['weather'][0]['main'])
        return (
            <div key={forecast['dt']} id='weather-forecast'>
                <div className='forecast-box'>
                    <div className='icon'>{forecastIcon[forecast['weather'][0]['main']]}</div>
                    <div className='desc'>{forecast['weather'][0]['description']}</div>
                    <p>🌞{Math.floor(forecast.temp.day - 273.15)}° 🌙{Math.floor(forecast.temp.night - 273)}°</p>
                    <h4>{weekday[day]}</h4>
                </div>
            </div>
        )
    });
    // console.log(typeof forecastArr)
    return (
        <div id='weather-forecast'>
            {forecastArr}
        </div>
    )
}

export default WeatherForecast