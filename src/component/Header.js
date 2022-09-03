import React from 'react'

const Header = ({ onClick, unit, name, dataTime, locationClick }) => {

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

  function formatTime(arg) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let dt = new Date(arg * 1000);
    let day = weekday[dt.getDay()];

    const time = formatAMPM(dt);


    return day + ", " + time;
  }


  return (
    <div id='header'>
      <div className='user-profile ml-1'>
        <div className='user-name'>
          <h1 className='city'>{name}</h1>
          <p className='time'>{formatTime(dataTime)}</p>
        </div>
      </div>

      <div className="search mr-1">

        <div className='sb-search'>
          <form>
            <input className='sb-input' type="text" placeholder="Search" name="search" />
            <button className='sb-input bg-success' type="submit"><i className="fa fa-search"></i></button>
          </form>


        </div>
   
        <div className='sb-location-box'>
          <button 
          className='btn btn-primary'
          onClick={locationClick}
          >
          <i className="fa-solid fa-location-dot"></i>
          </button>
        </div>

        <div className='temp-unit '>
          <span
            id='celsius'
            className={unit === 'c' ? 'temp-unit-text active' : 'temp-unit-text'}
            onClick={onClick}
          >
            °C
          </span>
          <span className="divider"></span>
          <span
            id='fahrenheit'
            className={unit === 'f' ? 'temp-unit-text active' : 'temp-unit-text'}
            onClick={onClick}
          >
            °F
          </span>
        </div>

      </div>
    </div>
  )
}

export default Header