import React from 'react';
import './App.css';
import AirQuality from './component/AirQuality';
import Header from './component/Header'
import WeatherCard from './component/WeatherCard'
import WeatherForecast from './component/WeatherForecast';

let latitude = '';
let longitude = '';

if (window.localStorage.getItem('coords')) {
  const cord = JSON.parse(window.localStorage.getItem('coords'))
  latitude = cord['lat']
  longitude = cord['lon']
}

const fetchCoordinates = async (latitude, longitude) => {
  const res = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=d5cf16c9a343a988a0ba9ec47620dc88`)

  return res.json()
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      country: '',
      place: '', // geo location place
      lat: latitude,
      lon: longitude,
      loaded: false,
      unit: 'c',
      temp: '',
      realFeel: '',
      desc: '',
      sunrise: '',
      sunset: '',
      humidity: '',
      windSpeed: '',
      pressure: '',
      uvi: '',
      geoLoc: null,
      pollution: null,
      currentWeather: null,

      oneCall: ''
    }

    this.handleFormat = this.handleFormat.bind(this);
    this.handleCoordinates = this.handleCoordinates.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.handleWeather = this.handleWeather.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.state.lon !== '' || this.state.lat !== '') {
      this.fetchWeather()
      fetchCoordinates(this.state.lat, this.state.lon)
        .then(geo => {
          this.setState({
            city: geo[0]['name'],
            country: geo[0]['country']
          })
        })
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.lat !== this.state.lat || prevState.lon !== this.state.lon) {
      this.fetchWeather()
    }
  }


  fetchWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=minutely&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
      .then(res => res.json())
      .then(oneCall => {
        this.setState({
          oneCall: oneCall,
          currentWeather: oneCall['current'],
          temp: oneCall['current']['temp'],
          realFeel: oneCall['current']['feels_like'],
          icon: oneCall['current']['weather'][0]['icon'],
          desc: oneCall['current']['weather'][0]['description'],
          sunrise: oneCall['current']['sunrise'],
          sunset: oneCall['current']['sunset'],
          humidity: oneCall['current']['humidity'],
          windSpeed: oneCall['current']['wind_speed'],
          pressure: oneCall['current']['pressure'],
          uvi: oneCall['current']['uvi'],

          loaded: true
        })
      })
  }

  handleCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {

        fetchCoordinates(position.coords.latitude, position.coords.longitude)
          .then(geo => {
            this.setState({
              city: geo[0]['name'],
              country: geo[0]['country'],
              lat: position.coords.latitude,
              lon: position.coords.longitude
            })
          })

        window.localStorage.setItem('coords', JSON.stringify({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }))

      })
    } else {
      console.log('Error ')
    }
  }

  handleFormat(e) {
    if (e.target.id === 'fahrenheit') {
      this.setState({ unit: 'f' })
    } else {
      this.setState({ unit: 'c' })
    }
  }

  handleWeather(e, forecast) {
    this.setState({
      temp: forecast['temp']['day'],
      realFeel: forecast['feels_like']['day'],
      icon: forecast['weather'][0]['icon'],
      desc: forecast['weather'][0]['description'],
      sunrise: forecast['sunrise'],
      sunset: forecast['sunset'],
      humidity: forecast['humidity'],
      windSpeed: forecast['wind_speed'],
      pressure: forecast['pressure'],
      uvi: forecast['uvi'],
    })
  }

  handleChange(e) {
    this.setState({ place: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${this.state.place}&limit=1&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          this.setState({
            country: data[0]['country'],
            city: data[0]['name'],
            lat: data[0]['lat'],
            lon: data[0]['lon']
          })
        } else {
          alert(this.state.place + " is not valid city name")
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='app-container'>

        {
          !this.state.loaded
            ?
            <Header
              loaded={this.state.loaded}
              unit={this.state.unit}
              onClick={this.handleFormat}
              locationClick={this.handleCoordinates}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              value={this.state.place}
            />
            :
            <>

              <Header
                loaded={this.state.loaded}
                city={this.state.city}
                country={this.state.country}
                dateTime={this.state.currentWeather['dt']}
                unit={this.state.unit}
                onClick={this.handleFormat}
                locationClick={this.handleCoordinates}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                value={this.state.place}
              />

              <WeatherCard
                temp={this.state.temp}
                realFeel={this.state.realFeel}
                icon={this.state.icon}
                desc={this.state.desc}
                sunrise={this.state.sunrise}
                sunset={this.state.sunset}
                humidity={this.state.humidity}
                windSpeed={this.state.windSpeed}
                pressure={this.state.pressure}
                uvi={this.state.uvi}
                unit={this.state.unit}
              />

              <WeatherForecast
                data={this.state.oneCall['daily']}
                unit={this.state.unit}
                onClick={this.handleWeather}
              />

              <AirQuality
                lat={this.state.lat}
                lon={this.state.lon}
              />
            </>
        }
      </div>
    )
  }
}

export default App;