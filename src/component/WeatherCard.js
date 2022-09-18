import React from 'react'
import formatTime from '../global/formatTime';

const Weather = ({ imgId, desc, unit, temp, realFeel }) => {
    return (
        <div>
            <div className='cw-heading mb-2'>
                <h4>Weather</h4>
                <p>What's the weather.</p>
            </div>


            <div className='cw-info'>
                <div className='img-div'>
                    <img
                        className='img'
                        src={`https://openweathermap.org/img/wn/${imgId}@2x.png`} width="100px" height="100px" alt="icon"
                    >
                    </img>
                </div>

                <div>
                    <p className='cw-desc'>
                        {desc}
                    </p>
                    <div className='cw-temp' >
                        <span>
                            {formatTime.formatKalvin(unit, temp)}
                            <sup
                                title='Real Feel'
                                className='cw-feels-like'
                            >
                                {formatTime.formatKalvin(unit, realFeel)}
                            </sup>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SunsetSunrise = ({ heading, time, offSet }) => {

    const formatTime = (date) => {
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }



    const fTime = formatTime(new Date((time + offSet) * 1000))
    return (
        <div>
            <h5>{heading}</h5>
            <span className='sun-text sun-rise'>
                {/* {formatTime.formatAMPM(new Date(time * 1000))} */}
                {fTime}
            </span>
        </div>
    )
}

const WeatherCard = ({ temp, realFeel, icon, desc, sunrise, sunset, humidity, windSpeed, pressure, uvi, unit, offSet }) => {
    return (
        <div className='cw-container rounded-2' >

            <Weather
                imgId={icon}
                desc={desc}
                unit={unit}
                temp={temp}
                realFeel={realFeel}
            />

            <div className='cw-addinfo'>

                <div className='sun-info'>
                    <SunsetSunrise
                        heading='Sunrise'
                        time={sunrise}
                        offSet={offSet}
                    />

                    <SunsetSunrise
                        heading='Sunset'
                        time={sunset}
                        offSet={offSet}
                    />
                </div>

                {/* This can be improved in style */}
                <div className="cw-add-container">
                    <div className='cw-add-box  mb-3'>
                        <div className='pe-2'>
                            <span className='cw-add-box-heading'>Humadity </span>
                            <span className='cw-add-box-value'>{humidity}%</span>
                        </div>
                        <div>
                            <span className='cw-add-box-heading'>Wind Speed </span>
                            <span className='cw-add-box-value'>{windSpeed}km/h</span>
                        </div>
                    </div>
                    <div className='cw-add-box'>
                        <div className='pe-2'>
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