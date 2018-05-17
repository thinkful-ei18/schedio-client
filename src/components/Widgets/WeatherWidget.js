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
      conditions: null,
      showingCurrentWeather: false
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
    const calculatedDiff = moment(Number(this.props.event.starttime)).diff(
      Date.now(),
      'days'
    );

    const daysAhead = calculatedDiff > 0 ? calculatedDiff + 1 : calculatedDiff;
    axios({
      url: `https://api.apixu.com/v1/forecast.json?key=${WEATHER_APIKEY}&q=${
        this.props.event.location.lat
      },${this.props.event.location.long}&days=${daysAhead + 1}`,
      method: 'GET'
    })
      .then(response => {
        let country = response.data.location.country;
        if (country === 'United States of America') {
          country = `${response.data.location.region}, USA`;
        }

        if (daysAhead < 7 && daysAhead > 0) {
          this.setState({
            showingCurrentWeather: false,
            locationName: `${response.data.location.name}, ${country}`,
            temperature:
              response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead]
                .day.avgtemp_f,
            conditionImg:
              response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead]
                .day.condition.icon,
            conditions:
              response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead]
                .day.condition.text,
            high:
              response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead]
                .day.maxtemp_f,
            low:
              response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead]
                .day.mintemp_f,
            sunrise:
              response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead]
                .astro.sunrise,
            sunset:
              response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead]
                .astro.sunset,
            date:
              response.data.forecast.forecastday[daysAhead <= 0 ? 0 : daysAhead]
                .date,
            loading: false
          });
        } else {
          this.setState({
            showingCurrentWeather: true,
            locationName: `${response.data.location.name}, ${country}`,
            temperature: response.data.forecast.forecastday[0].day.avgtemp_f,
            conditionImg:
              response.data.forecast.forecastday[0].day.condition.icon,
            conditions:
              response.data.forecast.forecastday[0].day.condition.text,
            high: response.data.forecast.forecastday[0].day.maxtemp_f,
            low: response.data.forecast.forecastday[0].day.mintemp_f,
            sunrise: response.data.forecast.forecastday[0].astro.sunrise,
            sunset: response.data.forecast.forecastday[0].astro.sunset,
            date: response.data.forecast.forecastday[0].date,
            loading: false
          });
        }
      })
      .catch(err => {
      });
  };

  render() {
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
        <div className="weather-widget-header-alert-cont">
          <div className="weather-widget-header">
            Weather in {this.state.locationName ? this.state.locationName : ''}
          </div>
          <div className="weather-alert-container">
            <div className="weather-alert-message">
              {this.state.showingCurrentWeather
                ? 'Displaying Current weather'
                : `On ${this.state.date}`}
            </div>
          </div>
        </div>
        <div className="weather-flex-container">
          <div className="weather-widget-temperature weatherunit">
            Temperature: {this.state.temperature ? this.state.temperature : ''}
            <br />
            High: {this.state.high}
            <br />
            Low: {this.state.low}
          </div>
          <div className="weather-widget-precipitation weatherunit">
            <img src={this.state.conditionImg} alt="weather condition icon" />
            {this.state.conditions}
          </div>
          <div className="astro weatherunit">
            Sunrise: {this.state.sunrise}
            <br />
            Sunset: {this.state.sunset}
          </div>
        </div>
      </section>
    );
  }
}
