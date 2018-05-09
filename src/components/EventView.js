import React from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import WeatherWidget from './WeatherWidget';
// import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

export class EventView extends React.Component {
  render() {
    let events = this.props.events ? this.props.events : '';
      
    return (
      <Card>
        <div>
          <CardHeader
            title={
              this.props.currentEvent.title ? this.props.currentEvent.title : 'No Event Selected'
            }
            subtitle={
              this.props.currentEvent.title
                ? new Date(Number(this.props.currentEvent.starttime)).toDateString()
                : ''
            }
            showExpandableButton={false}
          />
          <CardText expandable={false}>
            {this.props.currentEvent.address ? this.props.currentEvent.address : ''}
            {this.props.currentEvent.starttime
              ? moment(Number(this.props.currentEvent.starttime)).fromNow()
              : ''}
            <WeatherWidget event= {this.props.currentEvent}/>
          </CardText>
        </div>
        <button
          onClick={() => {
            console.log('click');
            this.props.history.push('/dashboard/widget-manager');
          }}
        >
					Click me
        </button>
				}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  currentEvent: state.events.activeEvent ? state.events.activeEvent : '',
  events: state.events.eventList  
});

export default withRouter(connect(mapStateToProps)(EventView));
