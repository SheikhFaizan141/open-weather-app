import React, { useState, useEffect } from 'react'
import formatTime from '../global/formatTime'

const range = {
    1: 'Good',
    2: 'Fair',
    3: 'Moderate',
    4: 'Poor',
    5: 'Very Poor'
}


console.log()

function AirQuality({ locName, lat, lon }) {
    const [airQuality, setAirQuality] = useState(null)
    const [components, setComponents] = useState(null)
    // const [isLoaded, setIsLoading] = useState(null)

    // console.log(lat, lon)
    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
            .then(res => res.json())
            .then(data => {
                setAirQuality(data)
                setComponents(Object.keys(data['list'][0]['components']))
            })
    }, [lat, lon])


    if (!components) {
        return (<h1>wait</h1>)
    }


    function aiqIndex() {

        function compare(value) {
            let index;
            if (value >= 100) {
                index = value
            } else if (value >= 75 && value < 100) {
                index = value
            } else if (value >= 50 && value < 75) {
                index = value
            } else if (value >= 25 && value < 50) {
                index = value
            } else {
                index = value
            }

            return index;
        }

        let res = ['pm10', 'pm2_5', 'no2', 'o3'].map(comp => {
           return compare(airQuality['list'][0]['components'][comp])

        })

        // console.log(res)
        return Math.max(...res)
    }

    return (
        <>
            <div className='rounded-2 aq-container'>
                <h2 className='aq-header'>Air Quality Index</h2>
                <p className='aq-time-location'>
                    <span>{locName}</span>
                    Published at
                    <span className='aq-time'> {formatTime.formatAMPM(new Date(airQuality['list'][0]['dt'] * 1000))}</span>
                </p>
                <div className='aq-aqi-box'>
                    <span className='aq-aqi-main'>{Math.trunc(aiqIndex())}</span>
                    <span className='aq-aqi-desc'>{range[airQuality['list'][0]['main']['aqi']]}</span>
                </div>
                <div className='mb-2'>
                    <p>Air quality is good. A perfect day for a walk!</p>
                </div>

                <div className='aq-comp-container'>
                    <div className='aq-comp-box'>
                        <span className='aq-comp-value'>{airQuality['list'][0]['components']['pm2_5']}</span>
                        <span className='aq-comp-name'>PM2.5</span>
                    </div>
                    <div className='aq-comp-box'>
                        <span className='aq-comp-value'>{airQuality['list'][0]['components']['pm10']}</span>
                        <span className='aq-comp-name'>PM10</span>
                    </div>
                    <div className='aq-comp-box'>
                        <span className='aq-comp-value'>{airQuality['list'][0]['components']['so2']}</span>
                        <span className='aq-comp-name'>SO<sub>2</sub></span>
                    </div>
                    <div className='aq-comp-box'>
                        <span className='aq-comp-value'>{airQuality['list'][0]['components']['no2']}</span>
                        <span className='aq-comp-name'>NO<sub>2</sub></span>
                    </div>
                    <div className='aq-comp-box'>
                        <span className='aq-comp-value'>{airQuality['list'][0]['components']['o3']}</span>
                        <span className='aq-comp-name'>O<sub>3</sub></span>
                    </div>
                    <div className='aq-comp-box'>
                        <span className='aq-comp-value'>{airQuality['list'][0]['components']['co']}</span>
                        <span className='aq-comp-name'>CO</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AirQuality;