import React from 'react'
import formatTime from '../global/formatTime';

function AboutPlace({city, country, dateTime }) {
  function format(arg) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let dt = new Date(arg * 1000);
    let day = weekday[dt.getDay()];

    // static method
    const time = formatTime.formatAMPM(dt);

    return day + ", " + time;
  }
  
  return (
    <div className='mb-2'>
      <h1 className='city'>{city}, {country}</h1>
      <span className='time'>{format(dateTime)}</span>
    </div>
  )
}


function TempScale({ unit, onClick }) {
  return (
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
  )
}


function SearchBar({ onSubmit, onChange, onClick, value }) {
  return (
    <div>
      <div className='sb-search'>
        <i className="sb-icon fa fa-search"></i>
        <form
          className='sb-form'
          onSubmit={onSubmit}
        >
          <input
            className='sb-input'
            type="search"
            placeholder="Search City"
            autoComplete="off"
            city="search"
            value={value}
            onChange={onChange}
          />
        </form>
        <button
          className='sb-btn'
          onClick={onClick}
        >
          <i className="sb-icon fa-solid fa-location-dot"></i>
        </button>
      </div>
    </div>
  )
}


const Header = ({ loaded, onClick, unit, city, country, dateTime, locationClick, value, onChange, onSubmit }) => {

  const classes = loaded ? ['header flex', 'search'] : ['header', 'search flex-sb']
  return (

    <div className={'rounded ' + classes[0]}>
      {
        loaded && 
        <AboutPlace
         city={city} 
         country={country} 
         dateTime={dateTime}
        />
      }
      <div className={classes[1]}>
        <SearchBar
          onSubmit={onSubmit}
          onChange={onChange}
          onClick={locationClick}
          value={value}
        />

        <TempScale
          unit={unit}
          onClick={onClick}
        />
      </div>
    </div>
  )
}

export default Header