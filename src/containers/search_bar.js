import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCoordinates } from '../store/actions/index';

import './search_bar.css'

/*
set controlled state
*/
class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: ''
    };
  
    this.onInputChange = this.onInputChange.bind(this);        
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({address: event.target.value});
  }


  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchCoordinates(this.state.address);
  }

  render() {
    return (
      <div className='wrap' >
        <div className='search' >
          <form onSubmit={this.onFormSubmit} className='input-group'>
            <input 
              placeholder='Address or location...'
              className='searchTerm'
              value={this.state.address}
              onChange={this.onInputChange}
            />
            <span className='input-group-btn'>
              <button type='submit' className='searchButton'>
                <i className="fa fa-search"></i>
              </button>
            </span>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCoordinates }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);