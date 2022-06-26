import React from 'react';
import './App.css';
import AirQulityIndex from './component/AirQulityIndex';
import Header from './component/Header'
import WeatherCard from './component/WeatherCard'
import WeatherForecast from './component/WeatherForecast';
import WeatherIndicator from './component/WeatherIndicator';

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
      loaded: false
    }
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
          .then(res => res.json())
        const pollution = fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
          .then(res => res.json())
        const oneCall = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=d5cf16c9a343a988a0ba9ec47620dc88`)
        .then(res => res.json())

        const allData = Promise.all([weather, pollution, oneCall]);
        allData.then(res => {
          const [weather, pollution, oneCall] = res;
          this.setState({
            weather: weather,
            pollution: pollution,
            oneCall: oneCall,
            loaded: true
          })
        })
      });
    } else {
      console.log("Not Available");
    }
  }

  render() {
    if (!this.state.loaded) {
     return <h1>Loading</h1> 
    }

    return (
      <div className='container'>
        <Header
        />
        {this.state.weather &&
          <div id='weather-info'>
            <WeatherCard
              icon='fa-cloud-sun'
              cardName='Weather'
              dis="What's the weather."
              main={`${Math.floor(this.state.weather['main']['temp'] - 273.15)}°C`}
              mainFel={`${Math.floor(this.state.weather['main']['feels_like'] - 273.15)}°C`}
              cardDis={this.state.weather['weather'][0]['description']}
            >
              <WeatherIndicator
                visibility={this.state.weather['visibility']}
                pressure={this.state.weather['main']['pressure']}
                humidity={this.state.weather['main']['humidity']}
              />

            </WeatherCard>

            <WeatherCard
              icon='fa-wind'
              cardName='Air Quality'
              dis='Main pollutan : PM 2.5'
              main={this.state.pollution['list'][0]['components']['pm2_5']}
              mainFel="AQI"
              cardDis={`Air Quality is ${airQuality[this.state.pollution['list'][0]['main']['aqi']]}`}
            >
              <AirQulityIndex
                main={this.state.pollution['list'][0]['components']}
              />
            </WeatherCard>
          </div>}
          <WeatherForecast data={this.state.oneCall['daily']} />
      </div>
    );
  }
}

export default App;
