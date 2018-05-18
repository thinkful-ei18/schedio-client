//================================== Import dependencies ====================>
import React from 'react';
import '../styles/FoodWidget.css';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { connect } from 'react-redux';
import store from '../../store/configureStore';
import TextField from 'material-ui/TextField';
import RestaurantModal from './RestaurantModal';
import FlatButton from 'material-ui/FlatButton';
import ReactStars from 'react-stars';
import { clearRestaurantData, clearRestaurantChoice } from '../../store/actions/widgetAction/foodwidget.actions';
import Map from 'react-icons/lib/fa/map-o'
//================================== Food Widget ====================>

export class FoodWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodModal: false,
      searchTerm: '',
      loading: false,
      searching: false
    };

    this.timer = null;
    this.widgetTimer = null;
  }

  handleSearchInputChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
      searching: true
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(this.fetchRestaurants, 1000);
  }

  cancelSearch = () => {
    this.setState({
<<<<<<< HEAD
      searching: false
=======
      searching:false,
      restaurantOptions:null
>>>>>>> 06cbc818de8a91b029c35ddfe4a9d9a779484d8d
    });
  }



  fetchRestaurants = () => {
    if (!this.props.event || this.state.searchTerm === '' || !this.props.event.location.lat) {
      return;
    }

    this.setState({
      loading: true
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
        loading: false
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
        searching: true
      });
    };

    clearTimeout(this.widgetTimer);
    this.widgetTimer = setTimeout(moduleStateSet, 1000);
  }

<<<<<<< HEAD

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
            <section style={styles.body}>
              <div style={styles.imgContainer}>
                <a href={restrInfo.url} target='_blank'><img className='chosen-restaurant-image' src={restrInfo.image_url ? restrInfo.image_url : 'img/restaurantvector.png'} /></a>
              </div>
              <section style={styles.descBody}>

                <div style={styles.subDesc}>
                  <div className='rm-title'>
                    <b><a href={restrInfo.url} target='_blank'>{restrInfo.name}</a></b>
                  </div>
                  <section>{restrInfo.price ? restrInfo.price : 'No Info'}</section>
                </div>
                <div style={styles.subDesc}>
                  <ReactStars size={18} edit={false} count={5} value={Number(restrInfo.rating)} />
                </div>
                <div style={styles.subDesc}>
                  <div style={{ fontSize: '16px' }}>
                    {restrInfo.location ? restrInfo.location.city : ''}, {restrInfo.location ? restrInfo.location.country === 'US' ? restrInfo.location.state : '' : ''} {restrInfo.location ? restrInfo.location.country === 'US' ? '' : restrInfo.location.country : ''}
                  </div>
                  <FlatButton icon={<Map />} label='Directions' backgroundColor={'rgb(238, 238, 238)'} href={`https://www.google.com/maps/place/${restrInfo.coordinates.latitude},${restrInfo.coordinates.longitude}`} target='_blank' />
                </div>

              </section>

            </section>
            <FlatButton label='Change your Mind?' onClick={() => {
              this.handleClearRestaurantData();
            }} />

          </div>
          :
          (<div>
            <label className='fw-search-label'>
              Search for your Favorite Food:
              </label>
            <br />
            <TextField onChange={(e) => this.handleWidgetSearch(e)} className='fw-search-input' ref={me => this.widgetSearchInput = me} />
            <br />
          </div>)}


        {this.state.searching ? <RestaurantModal eventId={this.props.event.id} cancelSearch={this.cancelSearch} fetchRestaurants={this.fetchRestaurants} restaurantOptions={this.state.restaurantOptions} handleSearchInputChange={this.handleSearchInputChange} loading={this.state.loading} searchTerm={this.state.searchTerm} /> : ''}
      </section>
    );
  }
=======
    render() {
      const restrInfo = this.props.event.widgets.foodanddining.info;
      return (
        <section className='food-widget-container'>
          {restrInfo && Object.keys(restrInfo).length ? 
            <section className='fw-cr-wrapper'>
              <div className='rm-title'>
                <b><a href={restrInfo.url} target='_blank'>{restrInfo.name}</a></b>
              </div>    
              <div className='food-widget-chosen-restaurant-container'>
                <section className='fw-cr-divider1'> <a href={restrInfo.url} target='_blank'><img alt={'Chosen Restaurant'} className='chosen-restaurant-image' src={restrInfo.image_url ? restrInfo.image_url : 'img/restaurantvector.png'} /></a></section>
              
                <div className='fw-cr-divider2' >
                       
                  <div className='rm-city'>
                    {restrInfo.location ? restrInfo.location.city : ''}, {restrInfo.location ?  restrInfo.location.country === 'US' ? restrInfo.location.state : '' : ''} {restrInfo.location ? restrInfo.location.country === 'US' ? '' : restrInfo.location.country : ''}
                  </div>
              
                  <div className='rm-price'>
                    <b>Price</b>: {restrInfo.price ? restrInfo.price : 'No Info'}
                  </div>
                  <FlatButton style={{backgroundColor:'#EEEEEE'}} label='Directions' href={`https://www.google.com/maps/place/${restrInfo.coordinates.latitude},${restrInfo.coordinates.longitude}`} target='_blank'/>
                  <div className='rm-rating chosen-restaurant-stars'>
                    <ReactStars size={20} edit={false} count={5} value={Number(restrInfo.rating)} />
                  </div>
                  <br/>
                  <FlatButton style={{ backgroundColor:'#3F51B5', color:'white'}} label='Cancel' onClick={() => {
                    this.handleClearRestaurantData();
                  }}/>
                </div>
                
              </div>
            </section>
            : 
            (<div className='food-search-container'>
              <label className='fw-search-label'>
            Search for your Favorite Food:
              </label>
              <br/>
              <TextField inputStyle={{textAlign:'center'}} onChange={(e) => this.handleWidgetSearch(e)}className='fw-search-input' ref={me => this.widgetSearchInput = me}/>
              <br/>
            </div>)} 
          

          {this.state.searching ? <RestaurantModal eventId={this.props.event.id} cancelSearch={this.cancelSearch} fetchRestaurants={this.fetchRestaurants} restaurantOptions={this.state.restaurantOptions} handleSearchInputChange={this.handleSearchInputChange} loading={this.state.loading} searchTerm={this.state.searchTerm}/> : ''}
        </section>
      );
    }
>>>>>>> 06cbc818de8a91b029c35ddfe4a9d9a779484d8d
}


export default connect()(FoodWidget);

const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2
  },
  imgContainer: {
    maxHeight: '200px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    width: '90%'
  },
  descBody: {
    paddingTop: 10,
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  subDesc: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  // headers: {
  //   display: 'block',
  //   fontWeight: 'bold',
  //   padding: 5
  // }

}