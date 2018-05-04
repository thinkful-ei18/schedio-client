import React from 'react';
import {connect} from 'react-redux';

export class EventView extends React.Component {

  render() {

    return (
      <section className='event-view-container'>
        <div className='event-view-header'>
          {this.props.currentEvent.title ? this.props.currentEvent.title : '' }
        </div>
        <div className='event-view-location'>
        </div>
        <div className='event-view-time'>
          {/* We probably want to use Moment.JS here, or something like that. */}
          {this.props.currentEvent.starttime ? this.props.currentEvent.starttime : ''} to {this.props.currentEvent.endtime ? this.props.currentEvent.endttime : ''}
        </div>
        <div className='event-view-widget-container'>
        </div>
      </section>

    );
  }
}

const mapStateToProps = state => ({
  currentEvent: state.currentEvent ? state.currentEvent : ''
});

export default connect(mapStateToProps)(EventView);