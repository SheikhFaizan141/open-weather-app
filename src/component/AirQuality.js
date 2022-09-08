import React, { useState, useEffect } from 'react'
import formatTime from '../global/formatTime'


const arr = ['pm2_5', 'pm10', 'so2', 'no2', 'o3', 'co'];

const range = {
    1: ['Good', 'green'],
    2: ['Fair', 'green'],
    3: ['Moderate', '#2cbf2c'],
    4: ['Poor', 'orangered'],
    5: ['Very Poor', '#ff2f2f']
}
const compElement = {
    pm2_5: <span className='aq-comp-name'>PM2.5</span>,
    pm10: <span className='aq-comp-name'>PM10</span>,
    so2: <span className='aq-comp-name'>SO<sub>2</sub></span>,
    no2: <span className='aq-comp-name'>NO<sub>2</sub></span>,
    o3: <span className='aq-comp-name'>O<sub>3</sub></span>,
    co: <span className='aq-comp-name'>CO</span>,
}

function AirQuality({ lat, lon }) {
    const [airQuality, setAirQuality] = useState(null)
    const [components, setComponents] = useState(null)

    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
            .then(res => res.json())
            .then(data => {
                setAirQuality(data)
                setComponents(Object.keys(data['list'][0]['components']))
            })
    }, [lat, lon])

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

        return Math.max(...res)
    }

    if (!components) {
        return (<h1 className='tc'>wait</h1>)
    }

    return (
        <>
            <div className='rounded-2 aq-container'>
                <h2 className='aq-header'>Air Quality Index</h2>
                <p className='aq-time-location'>
                    Published at
                    <span className='aq-time'> {formatTime.formatAMPM(new Date(airQuality['list'][0]['dt'] * 1000))}</span>
                </p>
                <div
                    style={{ color: range[airQuality['list'][0]['main']['aqi']][1] }}
                    className='aq-aqi-box'
                >
                    <span className='aq-aqi-main'>
                        {Math.trunc(aiqIndex())}
                    </span>
                    <span className='aq-aqi-desc'>
                        {range[airQuality['list'][0]['main']['aqi']][0]}
                    </span>
                </div>
                <div className='mb-2'>
                    <span>Air quality is good. A perfect day for a walk!</span>
                </div>

                <div className='aq-comp-container'>
                    {
                        arr.map(item => airQuality['list'][0]['components'][item])
                            .map((ele, i) => {
                                return (
                                    <div
                                        key={arr[i]}
                                        className='aq-comp-box'
                                    >
                                        <span className='aq-comp-value'>{ele}</span>
                                        {compElement[arr[i]]}
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </>
    )
}

export default AirQuality;