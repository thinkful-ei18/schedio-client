import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const WidgetManager = props => {
  return <div />;
};
const mapStateToProps = state => {
  return {
    currentEvent: state.events.activeEvent.id ? state.events.activeEvent : null
  };
};

export default connect(mapStateToProps)(withRouter(WidgetManager));
