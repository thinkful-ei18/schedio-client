//================================== Import dependencies ====================>
import React from 'react';
import '../styles/FoodWidget.css';
import axios from 'axios';
import {API_BASE_URL} from '../../config';
import {connect} from 'react-redux';
import store from '../../store/configureStore';
import TextField from 'material-ui/TextField';
<<<<<<< HEAD
import RestaurantModal from './RestaurantModal';
import FlatButton from 'material-ui/FlatButton';
import ReactStars from 'react-stars';
import {clearRestaurantData} from '../../store/actions/widgetAction/foodwidget.actions';
=======
import { Card } from 'material-ui/Card';
>>>>>>> 1af52796787c898ec737485f0e50b9b26e9b8f22

//================================== Food Widget ====================>

export class FoodWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodModal: false,
      searchTerm: '',
<<<<<<< HEAD
      loading:false,
      searching:false
=======
      loading:false
>>>>>>> 1af52796787c898ec737485f0e50b9b26e9b8f22
    };

    this.timer = null;
    this.widgetTimer = null;
  }

  handleSearchInputChange = (e) => {
<<<<<<< HEAD
    this.setState({
      searchTerm: e.target.value,
      searching:true
    });
=======
    this.setState({searchTerm: e.target.value});
>>>>>>> 1af52796787c898ec737485f0e50b9b26e9b8f22
    clearTimeout(this.timer);
    this.timer = setTimeout(this.fetchRestaurants, 1000);
  }

<<<<<<< HEAD
  cancelSearch = () => {
    this.setState({
      searching:false
    });
  }
  


=======
>>>>>>> 1af52796787c898ec737485f0e50b9b26e9b8f22
  fetchRestaurants = () => {
    if (!this.props.event || this.state.searchTerm === '' || !this.props.event.location.lat) {
      return;
    }
<<<<<<< HEAD
    
=======

>>>>>>> 1af52796787c898ec737485f0e50b9b26e9b8f22
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
<<<<<<< HEAD
        
=======

>>>>>>> 1af52796787c898ec737485f0e50b9b26e9b8f22
      this.setState({
        restaurantOptions: response.data.businesses,
        loading:false
      });
    });
  }
<<<<<<< HEAD
    
    
    handleWidgetSearch = (e) => {
      
      let searchTerm = e.target.value;
      if (!searchTerm || searchTerm === ' ') {
        clearTimeout(this.widgetTimer);
        return;
      }
      const moduleStateSet = () => {
        this.setState({
          searchTerm,
          searching:true
        });
      };
      
      clearTimeout(this.widgetTimer);
      this.widgetTimer = setTimeout(moduleStateSet, 1000);
    }
    
    render() {
      const restrInfo = this.props.event.widgets.foodanddining.info;
      if (restrInfo)
        console.log('COORDINATES', restrInfo.coordinates);
      return (
        <section className='food-widget-container'>
          {restrInfo && Object.keys(restrInfo).length ? 
            <div className='food-widget-chosen-restaurant-container'>
              <div className='rm-title'>
                <b><a href={restrInfo.url} target='_blank'>{restrInfo.name}</a></b>
              </div>          
              <div className='rm-city'>
                {restrInfo.location ? restrInfo.location.city : ''}, {restrInfo.location ?  restrInfo.location.country === 'US' ? restrInfo.location.state : '' : ''} {restrInfo.location ? restrInfo.location.country === 'US' ? '' : restrInfo.location.country : ''}
              </div>
              <a href={restrInfo.url} target='_blank'><img className='chosen-restaurant-image' src={restrInfo.image_url ? restrInfo.image_url : 'img/restaurantvector.png'} /></a>
              <div className='rm-price'>
                <br/>
                <b>Price</b>: {restrInfo.price ? restrInfo.price : 'No Info'}
              </div>
              <FlatButton label='Directions' style={{'background-color':'#EEEEEE'}} href={`https://www.google.com/maps/place/${restrInfo.coordinates.latitude},${restrInfo.coordinates.longitude}`} target='_blank'/>
              <div className='rm-rating chosen-restaurant-stars'>
                <ReactStars size={20} edit={false} count={5} value={Number(restrInfo.rating)} />
              </div>
              <br/>
              <FlatButton style={{'margin':'1em'}} label='Change your Mind?' onClick={() => {
                this.props.dispatch(clearRestaurantData());
              }}/>
                
            </div>
            : 
            (<div>
              <label className='fw-search-label'>
            Search for your Favorite Food:
              </label>
              <br/>
              <TextField onChange={(e) => this.handleWidgetSearch(e)}className='fw-search-input' ref={me => this.widgetSearchInput = me}/>
              <br/>
            </div>)} 
          

          {this.state.searching ? <RestaurantModal cancelSearch={this.cancelSearch} fetchRestaurants={this.fetchRestaurants} restaurantOptions={this.state.restaurantOptions} handleSearchInputChange={this.handleSearchInputChange} loading={this.state.loading} searchTerm={this.state.searchTerm}/> : ''}
        </section>
      );
    }
}


=======


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

>>>>>>> 1af52796787c898ec737485f0e50b9b26e9b8f22
export default connect()(FoodWidget);