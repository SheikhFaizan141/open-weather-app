import React from 'react';
import './App.css';
import AirQuality from './component/AirQuality';
import Header from './component/Header'
import WeatherCard from './component/WeatherCard'
import WeatherForecast from './component/WeatherForecast';


const apiKey = "d5cf16c9a343a988a0ba9ec47620dc88";



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: null,
      pollution: null,
      oneCall: '',
      lat: '28.7041',
      lon: '77.1025',
      loaded: false,
      unit: 'c'
    }

    this.handleFormat = this.handleFormat.bind(this);
    this.formatKalvin = this.formatKalvin.bind(this);
    this.handleCoordinates = this.handleCoordinates.bind(this);
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.setState({
          lat: lat,
          lon: lon
        })

        const weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
          .then(res => res.json())
        const oneCall = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&exclude=minutely&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
          .then(res => res.json())

        const allData = Promise.all([weather, oneCall]);
        allData.then(res => {
          const [weather, oneCall] = res;
          this.setState({
            weather: weather,
            oneCall: oneCall,
            loaded: true
          })
        })
      });

    } else {
      console.lon("Not Available");
    }
  }


  // componentDidUpdate() {
  //   console.log('ff')
  // }

  handleCoordinates(e) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(navigator)
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.setState({
          lat: lat,
          lon: lon
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
            <div className='container'>

              <Header
                name={this.state.weather['name']}
                dataTime={this.state.weather['dt']}
                unit={this.state.unit}
                onClick={this.handleFormat}
                locationClick={this.handleCoordinates}
              />
              <WeatherCard
                temp={this.formatKalvin(this.state.weather['main']['temp'])}
                feel={this.formatKalvin(this.state.weather['main']['feels_like'])}
                description={this.state.weather['weather'][0]['description']}
                icon={this.state.weather['weather'][0]['icon']}

                visibility={this.state.weather['visibility']}
                pressure={this.state.weather['main']['pressure']}
                humidity={this.state.weather['main']['humidity']}

                sunrise={this.state.weather['sys']['sunrise']}
                sunset={this.state.weather['sys']['sunset']}


              />
              <WeatherForecast
                data={this.state.oneCall['daily']}
                unit={this.state.unit}
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