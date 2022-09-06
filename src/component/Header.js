import React from 'react'
import formatTime from '../global/formatTime';

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


function SearchBar({ onSubmit, onChange, locationClick, value }) {
  return (
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
          name="search"
          value={value}
          onChange={onChange}
        />
      </form>
      <button
        className='sb-btn'
        onClick={locationClick}
      >
        <i className="sb-icon fa-solid fa-location-dot"></i>
      </button>
    </div>
  )
}


const Header = ({ onClick, unit, name, dateTime, locationClick, value, onChange, onSubmit }) => {

  function format(arg) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let dt = new Date(arg * 1000);
    let day = weekday[dt.getDay()];

    // static method
    const time = formatTime.formatAMPM(dt);

    return day + ", " + time;
  }


  return (
    <div id='header'>
      <div>
        <h1 className='city'>{name}</h1>
        <span className='time'>{format(dateTime)}</span>
      </div>

      <div className="search mr-1">
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