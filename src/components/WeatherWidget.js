//================================== Import Dependencies ====================>
import React from 'react';
import {WEATHER_APIKEY} from '../config';
import './styles/WeatherWidget.css';
import axios from 'axios';
import moment from 'moment';

//================================== Weather Widget Component ====================>
export default class WeatherWidget extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      temperature: null,
      locationName: null,
      conditionImg: 'http://cdn.apixu.com/weather/64x64/day/116.png',
      conditions: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps) {
      if (prevProps.event.starttime === this.props.event.starttime) {
        return null;
      } else {
        this.getWeather();
      }
    }
  }

  componentDidMount(){
    this.getWeather();
  }


  getWeather = () => {
    const daysAhead = moment(Date.now()).diff(Number(this.props.event.starttime), 'days') + 1;
    if (daysAhead <=7) {
      this.setState({loading:true});
      axios({
        'url':`https://api.apixu.com/v1/forecast.json?key=${WEATHER_APIKEY}&q=${this.props.event.location.lat},${this.props.event.location.long}&days=${daysAhead}`,
        'method':'GET',
      })
        .then(response => {
          this.setState({
            locationName: `${response.data.location.name}, ${response.data.location.country}`,
            temperature: response.data.forecast.forecastday[daysAhead < 0 ? 0 : daysAhead-1].day.avgtemp_f,
            conditionImg: response.data.forecast.forecastday[daysAhead < 0 ? 0 : daysAhead-1].day.condition.icon,
            conditions: response.data.forecast.forecastday[daysAhead < 0 ? 0 : daysAhead-1].day.condition.text,
            high: response.data.forecast.forecastday[daysAhead < 0 ? 0 : daysAhead-1].day.maxtemp_f,
            low: response.data.forecast.forecastday[daysAhead < 0 ? 0 : daysAhead-1].day.mintemp_f,
            sunrise:  response.data.forecast.forecastday[daysAhead < 0 ? 0 : daysAhead-1].astro.sunrise,
            sunset: response.data.forecast.forecastday[daysAhead < 0 ? 0 : daysAhead-1].astro.sunset,
            date: response.data.forecast.forecastday[daysAhead < 0 ? 0 : daysAhead-1].date,
            loading:false
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  
  render() {
    console.log(this.props, 'PROPS');
    const weatherSpinner = () => {
      return (
        <div className='weather-spinner'>
          <img src='img/cloud.png' alt='Cloud spinner'/>
        </div>
      );
    };

    return(
      <section className='weather-widget-container'>
        {this.state.loading ? weatherSpinner() : ''}
        <div className='weather-widget-header'>
          Weather in {this.state.locationName ? this.state.locationName: ''}
        </div>
        <div className='weather-widget-temperature'>
          Temperature: {this.state.temperature ? this.state.temperature : ''}
        </div>
        <div className='weather-widget-precipitation'>
          <img src={this.state.conditionImg} alt='weather condition icon' />
          {this.state.conditions}
        </div>
      </section>
    );
  }


}
