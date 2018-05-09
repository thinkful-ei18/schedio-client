//================================== Import Dependencies ====================>
import React from 'react';
import { WEATHER_APIKEY } from '../../config';
import '../styles/WeatherWidget.css';
import axios from 'axios';
import moment from 'moment';

//================================== Weather Widget Component ====================>
export default class WeatherWidget extends React.Component {
  constructor(props) {
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

  componentDidMount() {
    this.getWeather();
  }

	getWeather = () => {
	  this.setState({ loading: true });
	  const daysAhead = moment(Number(this.props.event.starttime)).diff(Date.now(), 'days') + 1;
	  console.log(daysAhead, 'DAYS AHEAD');
	  axios({
	    url: `https://api.apixu.com/v1/forecast.json?key=${WEATHER_APIKEY}&q=${
	      this.props.event.location.lat
	    },${this.props.event.location.long}&days=${daysAhead}`,
	    method: 'GET'
	  })
	      .then(response => {
					
	      let country = response.data.location.country;
	        if (country === 'United States of America') {
	        country = `${response.data.location.region}, USA`;
	        }
					
	      if (daysAhead < 7 && daysAhead >= 0) {
	        this.setState({
	          locationName: `${response.data.location.name}, ${country}`,
	          temperature:
							response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead - 1].day.avgtemp_f,
	          conditionImg:
							response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead - 1].day.condition
							  .icon,
	          conditions:
							response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead - 1].day.condition
							  .text,
	          high:
							response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead - 1].day.maxtemp_f,
	          low:
							response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead - 1].day.mintemp_f,
	          sunrise:
							response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead - 1].astro.sunrise,
	          sunset:
							response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead - 1].astro.sunset,
	          date: response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead - 1].date,
	          loading: false
	        });
					
	      } else {
	        console.log('THIS RAN');
	        this.setState({
	          locationName: `${response.data.location.name}, ${country}`,
	          temperature:
								response.data.forecast.forecastday[0].day.avgtemp_f,
	          conditionImg:
								response.data.forecast.forecastday[0].day.condition
								  .icon,
	          conditions:
								response.data.forecast.forecastday[0].day.condition
								  .text,
	          high:
								response.data.forecast.forecastday[0].day.maxtemp_f,
	          low:
								response.data.forecast.forecastday[0].day.mintemp_f,
	          sunrise:
								response.data.forecast.forecastday[0].astro.sunrise,
	          sunset:
								response.data.forecast.forecastday[0].astro.sunset,
	          date: response.data.forecast.forecastday[0].date,
	          loading: false
	        });


	      }
	      })
	      .catch(err => {
	        console.log(err);
	      });
	  }

	render() {
	  console.log(this.props, 'PROPS');
	  const weatherSpinner = () => {
	    return (
	      <div className="weather-spinner">
	        <img src="img/cloud.png" alt="Cloud spinner" />
	      </div>
	    );
	  };

	  return (
	    <section className="weather-widget-container">
	        {this.state.loading ? weatherSpinner() : ''}
	        <div className="weather-widget-header">
						Weather in {this.state.locationName ? this.state.locationName : ''}
	        <br/>
						On { this.state.date}
	        </div>
	      <div className='weather-flex-container'>
	        <div className="weather-widget-temperature weatherunit">
						Temperature: {this.state.temperature ? this.state.temperature : ''}
	          <br/>
						High: {this.state.high}
	          <br/>
						Low: {this.state.low}
	        </div>
	        <div className="weather-widget-precipitation weatherunit">
	          <img src={this.state.conditionImg} alt="weather condition icon" />
	          {this.state.conditions}
	        </div>
	        <div className='astro weatherunit'>
						Sunrise: {this.state.sunrise}
	          <br/>
						Sunset: {this.state.sunset}
	        </div>
	      </div>
	    </section>
	  );
	}
}
