import React from 'react'

const WeatherCard = (props) => {
    // console.log(props.main)
    return (
        <div className='weather-card' >
            <div className='card-heading'>
                <i className={`fa ${props.icon}`}></i>
                <div>
                <h4>{props.cardName}</h4>
                <p>{props.dis}</p>
                </div>
            </div>
            <div>
                {/* <div className='card-info' > */}
                <h2>{props.main} <small className='card-info-ad'>{props.mainFel}</small></h2>
                <p>{props.cardDis}</p>
            </div>
            <div className='indecator'>
                {props.children}
            </div>
        </div>
    )
}

export default WeatherCard