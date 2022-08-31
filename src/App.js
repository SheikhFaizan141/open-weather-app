import React from 'react';
import './App.css';
import Header from './component/Header'
import WeatherCard from './component/WeatherCard'
import WeatherForecast from './component/WeatherForecast';


const apiKey = "d5cf16c9a343a988a0ba9ec47620dc88";

const airQuality = {
  1: 'Good',
  2: 'Fair',
  3: 'Moderate',
  4: 'Poor',
  5: 'Very Poor'
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: null,
      pollution: null,
      oneCall: '',
      lat: '',
      log: '',
      loaded: false,
      unit: 'c'
    }

    this.handleFormat = this.handleFormat.bind(this);
    this.formatKalvin = this.formatKalvin.bind(this);
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
          .then(res => res.json())
        const oneCall = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
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
      console.log("Not Available");
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
      return <h1>Loading</h1>
    }

    return (
      <>
        <div className='container'>
          <Header
            name={this.state.weather['name']}
            dataTime={this.state.weather['dt']}
            unit={this.state.unit}
            onClick={this.handleFormat}
          />
          <div id='weather-info'>
            <WeatherCard
              temp={this.formatKalvin(this.state.weather['main']['temp'])}
              feel={this.formatKalvin(this.state.weather['main']['feels_like'])}
              description={this.state.weather['weather'][0]['description']}

              visibility={this.state.weather['visibility']}
              pressure={this.state.weather['main']['pressure']}
              humidity={this.state.weather['main']['humidity']}
            />

          </div>
          <WeatherForecast
            data={this.state.oneCall['daily']}
            unit={this.state.unit}
          />
        </div>
      </>

    );
  }
}

export default App;
