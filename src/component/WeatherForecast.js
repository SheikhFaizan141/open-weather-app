import React from 'react'
import formatTime from '../global/formatTime';


const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeatherForecast = (props) => {
    return (
        <div className='wf-container rounded-2'>
            {
                props.data.map(forecast => {
                    const day = new Date(parseInt(forecast.dt) * 1000).getDay()

                    return (

                        <div
                            className='wf-box'
                            key={forecast['dt']}
                            id='weather-forecast'
                            onClick={(e) => props.onClick(e, forecast)}
                        >
                            <h5>{weekday[day]}</h5>
                            <div>
                                <img src={`https://openweathermap.org/img/wn/${forecast['weather'][0]['icon']}@2x.png`} width="50px" height="50px" alt=""></img>
                            </div>
                            <div className="wf-temp-box">
                                <span className="wf-max-temp">{formatTime.formatKalvin(props.unit, forecast['temp'][['max']])}</span>
                                <span className="wf-min-temp">{formatTime.formatKalvin(props.unit, forecast['temp'][['min']])}</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default WeatherForecast