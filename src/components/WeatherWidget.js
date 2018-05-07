//================================== Import Dependencies ====================>
import React from 'react';
import {WEATHER_APIKEY} from '../config';
import './styles/WeatherWidget.css';

//================================== Weather Widget Component ====================>
export default class WeatherWidget extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      loading: true,
    };
  }

  render() {
    const weatherSpinner = () => {
      return (
        <div className='weather-spinner'>
          <img src='img/cloud.png' alt='Cloud spinner'/>
        </div>
      );
    };

    return(
      <section className='weather-widget-container'>
        <div className='weather-widget-header'>
          Weather in the area:
        </div>
        <div className='weather-widget-temperature'>
          {weatherSpinner()}
        </div>
        <div className='weather-widget-precipitation'>
        </div>
      </section>
    );
  }


}
