//================================== Import React Dependencies ====================>
import React from 'react';
import Moment from 'react-moment';
import {setCurrentEvent} from '../store/actions/eventlist.actions';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';

/**
 * This represents an individual event in the list of events contained within EventList. Event info will be passed as props by the parent component, which will
 * be looping through the list of events in the state and displaying multiple EventListEvent components.
 */
export class  EventListEvent extends React.Component {
  
  handleViewEvent() {
    this.props.dispatch(setCurrentEvent(this.props.event));
    localStorage.setItem('lastViewedEvent', this.props.event.id);
    localStorage.setItem('lastViewedTimestamp', Number(Date.now()));
  }

  render() {
    
    return (
      
      <div className='event-list-event'>
        <Card style={{'marginTop':'1em'}}>
          <CardHeader style={{'paddingRight':'0 !important'}} title={this.props.event.title} subtitle={<Moment fromNow date={Number(this.props.event.starttime)}></Moment>}/>
          <CardText>
          On <Moment format={'dddd, MMMM Do, h:mm a'}date={Number(this.props.event.starttime)}> </Moment>
          </CardText>
          <CardText>
            {this.props.event.location.address ? this.props.event.location.address : ''}
          </CardText>
          <RaisedButton style={{'marginBottom':'1em'}} secondary label='View Event' onClick={() => this.handleViewEvent()}/>
        </Card>
      </div>
    );
  }
};

export default connect()(EventListEvent);