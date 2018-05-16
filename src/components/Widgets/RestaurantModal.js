import React from 'react';
import TextField from 'material-ui/TextField';
import { Card } from 'material-ui/Card';
import ReactStars from 'react-stars';
import FlatButton from 'material-ui/FlatButton';
import {setRestaurantInfo} from '../../store/actions/widgetAction/foodwidget.actions';
import {connect} from 'react-redux';

export  class RestaurantsModal extends React.Component {


  componentDidMount() {
    this.props.fetchRestaurants();
  }

  handleChooseRestaurant = restaurantId => {

    const cr = this.props.restaurantOptions.filter(restaurant => restaurant.id === restaurantId )[0];

    this.props.dispatch(setRestaurantInfo({
      url:cr.url,
      name:cr.name,
      location:cr.location,
      image_url:cr.image_url,
      price:cr.price,
      rating:cr.rating,
      coordinates:cr.coordinates

    }));
    this.props.cancelSearch();
  };

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
            <b><a href={restaurant.url} target='_blank'>{restaurant.name}</a></b>
          </div>          
          <div className='rm-city'>
            {restaurant.location.city}, {restaurant.location.country === 'US' ? restaurant.location.state : ''} {restaurant.location.country === 'US' ? '' : restaurant.location.country}
          </div>
          <a href={restaurant.url} target='_blank'><img src={restaurant.image_url ? restaurant.image_url : 'img/restaurantvector.png'} /></a>
          <div className='rm-price'>
            <br/>
            <b>Price</b>: {restaurant.price ? restaurant.price : 'No Info'}
          </div>
          <div className='rm-rating'>
            <ReactStars size={20} edit={false} count={5} value={Number(restaurant.rating)} />
          </div>
          <FlatButton onClick={() => this.handleChooseRestaurant(restaurant.id)}primary style={{'marginTop':'.5em'}} labelcolor='green' label="Choose"/>
        </Card>
      );
    };

    const restaurants = this.props.restaurantOptions ?  this.props.restaurantOptions.map(restaurant => {
      return restaurantModule(restaurant);
    }) : '';



    return (
      <section className='food-widget-modal-container'>
        <div className='fw-mc-header'>
          <div className='fw-mc-header-title'>
              Narrow Down Your Results...
          </div>
          <button onClick={() => this.props.cancelSearch()} className='fw-mc-cancel-button'>
            Cancel
          </button>
        </div>
        <div className='fw-mc-search-options'>
          {this.props.loading? spinner(): ''}
          <label htmlFor='search-input'>
                Search Restaurants:
          </label>
          <br/>
          <TextField
            id='search-input'
            onChange={e => this.props.handleSearchInputChange(e)}
            value={this.props.searchTerm}/>
        </div>
        <div className='fw-mc-results-container'>
          {restaurants ? restaurants : this.props.loading ? '' : `No businesses found matching ${this.props.searchTerm}`}
        </div>
      </section> 
    );
  }
}

export default connect()(RestaurantsModal);