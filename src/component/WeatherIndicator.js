import React from 'react'

const WeatherIndicator = (props) => {
  return (
    <div className='indicator'>
        <div className="ind-box">
            <small>Pressure</small>
            <p><strong>{props.pressure}mb</strong></p>
        </div>
        <div className="ind-box">
            <small>Visibility</small>
            <p><strong>{Math.round(props.visibility / 1000)}km</strong></p>
        </div>
        <div className="ind-box">
            <small>Humadity</small>
            <p><strong>{props.humidity}%</strong></p>
        </div>
    </div>
  )
}

export default WeatherIndicator