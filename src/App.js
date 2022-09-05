import React from 'react';
import './App.css';
import AirQuality from './component/AirQuality';
import Header from './component/Header'
import WeatherCard from './component/WeatherCard'
import WeatherForecast from './component/WeatherForecast';

// const apiKey = "d5cf16c9a343a988a0ba9ec47620dc88";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: '',
      realFeel: '',
      desc: '',
      humadity: '',
      windSpeed: '',
      pressure: '',
      uvi: '',
      weather: null,
      pollution: null,
      currentWeather: null,
      oneCall: '',
      lat: '28.7041',
      lon: '77.1025',
      loaded: false,
      unit: 'c'
    }

    this.handleFormat = this.handleFormat.bind(this);
    this.formatKalvin = this.formatKalvin.bind(this);
    this.handleCoordinates = this.handleCoordinates.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
    this.handleWeather = this.handleWeather.bind(this);
  }


  componentDidMount() {
    this.fetchWeather()
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.lat !== this.state.lat || prevState.lon !== this.state.lon) {
      this.fetchWeather()
    }
  }


  fetchWeather() {
    const weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
      .then(res => res.json())

    const oneCall = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=minutely&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
      .then(res => res.json())

    Promise.all([weather, oneCall])
      .then(res => {
        const [weather, oneCall] = res;
        this.setState({
          weather: weather,
          oneCall: oneCall,
          currentWeather: oneCall['current'],
          loaded: true
        })
        console.log(this.state.oneCall)
      })


  }

  handleCoordinates(e) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('loda')
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
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

  formatKalvin(kelvin) {
    if (this.state.unit === 'c') {

      return Math.round(kelvin - 273.15) + '°';
    } else {

      return Math.round(1.8 * (kelvin - 273.15) + 32) + '°';
    }
  }

  handleWeather(e, forecast) {
    console.log(e)
    console.log(forecast)
    this.setState({
      currentWeather: forecast
    })
  }

  render() {
    if (!this.state.loaded) {
      return (
        <div id='header'>
          sb
        </div>
      )
    } else {
      return (
        <>
          {
            this.state.loaded &&
            <div className='app-container'>

              <Header
                name={this.state.weather['name']}
                dataTime={this.state.weather['dt']}
                unit={this.state.unit}
                onClick={this.handleFormat}
                locationClick={this.handleCoordinates}
              />
              <WeatherCard
                current={this.state.currentWeather}
                unit={this.state.unit}
              />
              <WeatherForecast
                data={this.state.oneCall['daily']}
                unit={this.state.unit}
                onClick={this.handleWeather}
              />
              <AirQuality
                locName={this.state.weather['name']}
                lat={this.state.lat}
                lon={this.state.lon}
              />
            </div>
          }
        </>
      )
    }
  }
}

export default App;