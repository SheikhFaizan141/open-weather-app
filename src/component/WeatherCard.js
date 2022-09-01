import React from 'react'



const WeatherCard = (props) => {

    function formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    // console.log(props.sunrise)
    return (
        <div className='cw-container rounded-2' >
            <div>
                <div className='cw-heading'>
                    <h4>Weather</h4>
                    <p>What's the weather.</p>
                </div>


                <div className='cw-info'>
                    <i className='cw-icon fa fa-cloud-sun'></i>

                    <div>
                        <p className='cw-desc'>{props.description}</p>
                        <div className='cw-temp'>
                            <span>{props.temp}</span>
                            <span className='cw-feels-like'>{props.feel}</span>
                        </div>
                    </div>
                </div>
            </div>


            <div className='cw-addinfo'>

                <div className="cw-addinfo-box">
                    <p>Humadity: {props.humidity}%</p>

                    <p>Wind: 3km/h</p>

                    <p>Pressure: {props.pressure}hPa</p>

                    <p>Visibility: {Math.floor(props.visibility / 1000)}km</p>


                </div>

                <div className='sun-info'>
                    <h4>Sunrise 🌅</h4>
                    <span className='sun-text sun-rise'>{formatAMPM(new Date(props.sunrise * 1000))}</span>
                    <h4>Sunset 🌆</h4>
                    <span className='sun-text sun-set'>{formatAMPM(new Date(props.sunset * 1000))}</span>
                </div>

            </div>

        </div>
    )
}

export default WeatherCard