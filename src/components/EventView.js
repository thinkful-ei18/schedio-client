import React from 'react';
import { connect } from 'react-redux';
import { Moment } from 'react-moment';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import EventActive from './EventActive';

export class EventView extends React.Component {
  render() {
    return (
      <Card>
        {this.props.currentEvent ? (
          <div>
            <CardHeader
              title={this.props.currentEvent.title ? this.props.currentEvent.title : 'No Event Selected'}
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
        {/* <EventActive/> */}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  currentEvent: state.events.activeEvent ? state.events.activeEvent : ''
});

export default connect(mapStateToProps)(EventView);
