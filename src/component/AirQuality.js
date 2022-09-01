import React, { useState, useEffect } from 'react'

const range = {
    1: 'Good',
    2: 'Fair',
    3: 'Moderate',
    4: 'Poor',
    5: 'Very Poor'
  }

function AirQuality({ locName, lat, lon }) {
    const [airQuality, setAirQuality] = useState(null)

    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
            .then(res => res.json())
            .then(data => setAirQuality(data))
    }, [lat, lon])

    console.log(airQuality)
    return (
        <> { 
            // airQuality && 
            <div className='rounded-2 aq-container'>
                <h2 className='aq-header'>Air Quality Index</h2>
                <p className='aq-time-location'><span>{locName}</span> Published at PM 3:30</p>
                <div className='aq-aqi-box'>
                    <span className='aq-aqi-main'>32</span>
                    <span className='aq-aqi-desc'>Good</span>
                </div>
                <div className='mb-2'>
                    <p>Air quality is good. A perfect day for a walk!</p>
                </div>
                <div className='aq-comp-container'>
                    <div className='aq-comp-box'>
                        <span className='aq-comp-value'>27.4</span>
                        <span className='aq-comp-name'>PM2.5</span>
                    </div>
                    <div className='aq-comp-box'>
                        <span className='aq-comp-value'>27.4</span>
                        <span className='aq-comp-name'>PM2.5</span>
                    </div>
                    <div className='aq-comp-box'>
                        <span className='aq-comp-value'>27.4</span>
                        <span className='aq-comp-name'>PM2.5</span>
                    </div>
                    <div className='aq-comp-box'>
                        <span className='aq-comp-value'>27.4</span>
                        <span className='aq-comp-name'>PM2.5</span>
                    </div>
                    <div className='aq-comp-box'>
                        <span className='aq-comp-value'>27.4</span>
                        <span className='aq-comp-name'>PM2.5</span>
                    </div>
                    <div className='aq-comp-box'>
                        <span className='aq-comp-value'>27.4</span>
                        <span className='aq-comp-name'>PM2.5</span>
                    </div>
                </div>
            </div>
}
        </>
    )
}

export default AirQuality;