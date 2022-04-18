import React from 'react'

const AirQulityIndex = (props) => {
    console.log(props.main)
    return (
        <div className='air-quality'>
            <div>
                <p>PM 2.5</p>
                <strong>{props.main['pm2_5']}</strong>
            </div>
            <div>
                <p>PM 10</p>
                <strong>{props.main['pm10']}</strong>
            </div>
            <div>
                <p>SO<sub>2</sub></p>
                <strong>{props.main['so2']}</strong>

            </div>
            <div>
                <p>NO<sub>2</sub></p>
                <strong>{props.main['no2']}</strong>
            </div>
            <div>
                <p>O<sub>3</sub></p>
                <strong>{props.main['o3']}</strong>
            </div>
            <div>
                <p>CO</p>
                <strong>{props.main['co']}</strong>
            </div>
        </div>
    )
}

export default AirQulityIndex