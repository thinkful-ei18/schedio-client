import React from 'react';
import { connect } from 'react-redux';
import '../styles/SportsWidget.css';
import moment from 'moment';
import Client from 'predicthq';
import axios from 'axios';

class SportsEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localSportingEvents: [],
      address: [],
      generateAddress: false
    };
  }

  getSportsData = () => {
    let phq = new Client({ access_token: 'a9D6hB92LHdrVd4X7rWhItqIqrd8mb' });

    let searchLocation = `25km@${this.props.activeEvent.location.lat},${
      this.props.activeEvent.location.long
    }`;

    phq.events
      .search({
        within: searchLocation,
        category: 'sports',
        'active.gte': this.props.date,
        'start_around.origin': this.props.date
      })
      .then(results => {
        let localSports = results.result.results.slice(0, 5);
        console.log(results);
        this.setState({ localSportingEvents: localSports });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps) {
      if (
        prevProps.activeEvent.location.lat ===
        this.props.activeEvent.location.lat
      ) {
        return null;
      } else {
        return this.getSportsData();
      }
    }
  }

  generateAddress = sport => {
    let addresses = [];
    let currentAddress = '';

    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          sport.location[1]
        },${sport.location[0]}&key=AIzaSyAG3_ZShOEY0OY7ndonNqxbBUE6DqVCSok`
      )
      .then(res => {

        addresses.push(...res.data.results);
        console.log(addresses);
        // this.setState({address: addresses});
        // addresses.forEach(address => {
        //   this.setState({generateAddress: address});
        // });
      });
    
  };

  render() {
    return (
      <div>
        <h1>Sporting Events</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date/Time</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {this.state.localSportingEvents.map((sport, index) => {
              return (
                <tr key={index}>
                  <td>{sport.title}</td>
                  <td>{moment(sport.start).format('YYYY-MM-DD, h:mm a')}</td>
                  <td>{this.generateAddress(sport)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeEvent: state.events.activeEvent
  };
};

export default connect(mapStateToProps)(SportsEvents);
