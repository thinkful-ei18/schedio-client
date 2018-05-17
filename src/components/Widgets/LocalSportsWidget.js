import React from 'react';
import { connect } from 'react-redux';
import '../styles/SportsWidget.css';
import moment from 'moment';
import Client from 'predicthq';
import FlatButton from 'material-ui/FlatButton';
import FontAwesome from 'react-fontawesome';
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
        'active.gte': moment(Number(this.props.activeEvent.starttime)).format('YYYY-MM-DD'),
        'start_around.origin': moment(Number(this.props.activeEvent.starttime)).format('YYYY-MM-DD')
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

  render() {
    return (
      <div>
        <table>
        <caption>Sporting Events</caption>
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
                  <td>  <a  href={`https://www.google.com/maps/place/${sport.location[1]},${sport.location[0]}`} target='_blank'> <FontAwesome name='map'/> </a> </td>
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
