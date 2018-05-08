import React from 'react';
import Map from './MapWidget';
import { connect } from 'react-redux';
import { Moment } from 'react-moment';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';

export class EventView extends React.Component {
  render() {
    let widgetsForShow = [];
    const widgets = this.props.currentEvent.widgets;
    for (let widget in widgets) {
      if (widgets[widget].displayed === true) {
        if (widget === 'map') {
          widgetsForShow.push(<Map widget={widgets[widget]} />);
        }
      }
    }

    return (
      <div>
        <Card>
          {this.props.currentEvent ? (
            <div>
              <CardHeader
                title={this.props.currentEvent.title}
                subtitle={new Date(this.props.currentEvent.starttime).toDateString()}
                showExpandableButton={false}
              />
              <CardText expandable={false}>
                {this.props.currentEvent.address ? this.props.currentEvent.address : ''}
                {this.props.currentEvent ? moment(this.props.currentEvent.starttime).fromNow() : ''}
              </CardText>
              {widgetsForShow}
            </div>
          ) : (
            'No Event Selected'
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentEvent: {
    id: '1234456',
    location: {
      address: 'somewhere',
      lat: 12,
      lng: 13
    },
    starttime: '1234124',
    title: '123',
    widgets: {
      map: {
        displayed: true,
        location: {
          address: 'somewhere2',
          lat: 12,
          lng: 13
        }
      }
    }
  }
});

export default connect(mapStateToProps)(EventView);
