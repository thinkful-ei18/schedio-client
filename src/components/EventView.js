import React from 'react';
import { connect } from 'react-redux';
import { Moment } from 'react-moment';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';

export class EventView extends React.Component {
  render() {
    let events = this.props.events ? this.props.events : '';
      
    return (
      <Card>
        {this.props.currentEvent ? (
          <div>
            <CardHeader
              title={this.props.currentEvent.title ? this.props.currentEvent.title : ''}
              subtitle={ this.props.currentEvent.starttime ? new Date(this.props.currentEvent.starttime).toDateString() : ''}
              showExpandableButton={false}
            />
            <CardText expandable={false}>
              {this.props.currentEvent.address ? this.props.currentEvent.address : ''}
              {this.props.currentEvent.starttime ? moment(Number(this.props.currentEvent.starttime)).fromNow() : ''}
            </CardText>
          </div>
        ) : (
          'No Event Selected'
        )}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  currentEvent: state.events.activeEvent ? state.events.activeEvent : '',
  events: state.events.eventList  
});

export default connect(mapStateToProps)(EventView);
