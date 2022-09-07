import React from 'react'
import formatTime from '../global/formatTime';


const WeatherCard = ({ temp, realFeel, icon, desc, sunrise, sunset, humidity, windSpeed, pressure, uvi, unit }) => {
    return (
        <div className='cw-container rounded-2' >
            <div>
                <div className='cw-heading'>
                    <h4>Weather</h4>
                    <p>What's the weather.</p>
                </div>


                <div className='cw-info'>
                    <img
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`} width="100px" height="100px" alt="icon"
                    >
                    </img>
                    <div>
                        <p className='cw-desc'>
                            {desc}
                        </p>
                        <div className='cw-temp'>
                            <span>
                                {formatTime.formatKalvin(unit, temp)}
                            </span>
                            <span className='cw-feels-like'>
                                {formatTime.formatKalvin(unit, realFeel)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            <div className='cw-addinfo'>

                <div className='sun-info'>
                    <h5>Sunrise </h5>
                    <span className='sun-text sun-rise'>{formatTime.formatAMPM(new Date(sunrise * 1000))}</span>
                    <h5>Sunset </h5>
                    <span className='sun-text sun-set'>{formatTime.formatAMPM(new Date(sunset * 1000))}</span>
                </div>

                <div className="cw-add-container">
                    <div className='cw-add-box'>
                        <div>
                            <span className='cw-add-box-heading'>Humadity </span>
                            <span className='cw-add-box-value'>{humidity}%</span>
                        </div>
                        <div>
                            <span className='cw-add-box-heading'>Wind speed </span>
                            <span className='cw-add-box-value'>{windSpeed}km/h</span>
                        </div>
                    </div>
                    <div className='cw-add-box'>
                        <div>
                            <span className='cw-add-box-heading'>Pressure </span>
                            <span className='cw-add-box-value'>{pressure}hPa</span>
                        </div>
                        <div>
                            <span className='cw-add-box-heading'>UV index</span>
                            <span className='cw-add-box-value'>{uvi}</span>
                        </div>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default WeatherCard