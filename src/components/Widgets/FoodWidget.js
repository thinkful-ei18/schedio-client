//================================== Import dependencies ====================>
import React from 'react';
import '../styles/FoodWidget.css';
import axios from 'axios';
import {API_BASE_URL} from '../../config';
import {connect} from 'react-redux';
import store from '../../store/configureStore';
import TextField from 'material-ui/TextField';
import RestaurantModal from './RestaurantModal';
import FlatButton from 'material-ui/FlatButton';
import ReactStars from 'react-stars';
import {clearRestaurantData, clearRestaurantChoice} from '../../store/actions/widgetAction/foodwidget.actions';

//================================== Food Widget ====================>

export class FoodWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodModal: false,
      searchTerm: '',
      loading:false,
      searching:false
    };

    this.timer = null;
    this.widgetTimer = null;
  }

  handleSearchInputChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
      searching:true
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(this.fetchRestaurants, 1000);
  }

  cancelSearch = () => {
    this.setState({
      searching:false
    });
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
    

    handleClearRestaurantData = () => {
      this.props.dispatch(clearRestaurantData());
      this.props.dispatch(clearRestaurantChoice(this.props.event.id));
    }

    render() {
      const restrInfo = this.props.event.widgets.foodanddining.info;
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
                this.handleClearRestaurantData();
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
          

          {this.state.searching ? <RestaurantModal eventId={this.props.event.id} cancelSearch={this.cancelSearch} fetchRestaurants={this.fetchRestaurants} restaurantOptions={this.state.restaurantOptions} handleSearchInputChange={this.handleSearchInputChange} loading={this.state.loading} searchTerm={this.state.searchTerm}/> : ''}
        </section>
      );
    }
}


export default connect()(FoodWidget);