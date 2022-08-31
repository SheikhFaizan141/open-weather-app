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

    function formatKalvin(kelvin) {
        if (props.unit === 'c') {
    
          return Math.round(kelvin - 273.15) + '°';
        } else {
    
          return Math.round(1.8 * (kelvin - 273.15) + 32) + '°';
        }
      }

    const forecastArr = props.data.map(forecast => {
        const day = new Date(parseInt(forecast.dt) * 1000).getDay()

        // console.log(forecast['temp'][['max']])

        return (

            <div
                className='wf-box'
                key={forecast['dt']} id='weather-forecast'
            >
                <h5>{weekday[day]}</h5>
                <span>
                    <i className='wf-box-icon fa fa-sun'></i>
                </span>
                <div className="wf-temp-box">
                    <span className="wf-max-temp">{formatKalvin(forecast['temp'][['max']])}</span>
                    <span className="wf-min-temp">{formatKalvin(forecast['temp'][['min']])}</span>
                </div>
            </div>
        )
    });

    return (
        <div className='wf-container'>
            {forecastArr}
        </div>
    )
}

export default WeatherForecast