//================================== Import dependencies ====================>
import React from 'react';
import '../styles/FoodWidget.css';
import axios from 'axios';
import {API_BASE_URL} from '../../config';
import {connect} from 'react-redux';
import store from '../../store/configureStore';
import TextField from 'material-ui/TextField';
import { Card } from 'material-ui/Card';

//================================== Food Widget ====================>

export class FoodWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodModal: false,
      searchTerm: '',
      loading:false
    };

    this.timer = null;
    this.widgetTimer = null;
  }

  handleSearchInputChange = (e) => {
    this.setState({searchTerm: e.target.value});
    clearTimeout(this.timer);
    this.timer = setTimeout(this.fetchRestaurants, 1000);
  }

  fetchRestaurants = () => {
    if (!this.props.event || this.state.searchTerm === '' || !this.props.event.location.lat) {
      return;
    }

    this.setState({
      loading:true
    });
    axios({
      'url': `${API_BASE_URL}/api/events/yelphelper?searchTerm=${this.state.searchTerm}&latitude=${this.props.event.location.lat}&longitude=${this.props.event.location.long}`,
      'method': 'GET',
      headers: {
        'Authorization': `Bearer ${store
          .getState()
          .auth
          .authToken}`
      }
    }).then(response => {

      this.setState({
        restaurantOptions: response.data.businesses,
        loading:false
      });
    });
  }


  handleWidgetSearch = (e) => {

    let searchTerm = e.target.value;
    const moduleStateSet = () => {
      this.setState({
        searchTerm
      });
    };

    clearTimeout(this.widgetTimer);
    this.widgetTimer = setTimeout(moduleStateSet, 500);
  }

  render() {

    const spinner = () => {
      return (
        <div className='lds-spinner-container'>
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
    };


    const restaurantModule = restaurant => {
      return (
        <Card className='restaurant-module'>
          <div className='rm-title'>
            <a href={restaurant.url} target='_blank'>{restaurant.name}</a>
          </div>          
          <div className='rm-city'>
            {restaurant.location.city}, {restaurant.location.country}
          </div>
          <img src={restaurant.image_url} />
          <div className='rm-price'>
            <br/>
            <b>Price</b>: {restaurant.price ? restaurant.price : 'No Info'}
          </div>
          <div className='rm-rating'>
            <b>Rating</b>: {restaurant.rating}
          </div>

        </Card>
      );
    };

    const restaurants = this.state.restaurantOptions ?  this.state.restaurantOptions.map(restaurant => {
      return restaurantModule(restaurant);
    }) : '';


    return (
      <section className='food-widget-container'>
        <form className='food-widget-search-form'>
          <label className='fw-search-label'>
            Search for your favorites
          </label>
          <TextField onChange={(e) => this.handleWidgetSearch(e)}className='fw-search-input'/>
        </form>
        {this.state.searchTerm ? (
          <section className='food-widget-modal-container'>
            <div className='fw-mc-header'>
            Narrow Down Your Results...
            </div>
            <div className='fw-mc-search-options'>
              {this.state.loading? spinner(): ''}
              <label htmlFor='search-input'>
              Search Restaurants:
              </label>
              <br/>
              <TextField
                id='search-input'
                onChange={e => this.handleSearchInputChange(e)}
                value={this.state.searchTerm}/>
            </div>
            <div className='fw-mc-results-container'>
              {restaurants ? restaurants : ''}
            </div>
          </section> 
        )  : ''}
        
      </section>
    );
  }
}

export default connect()(FoodWidget);