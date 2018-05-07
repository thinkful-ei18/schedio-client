import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
const WidgetManager = props => {
  const { currentEvent } = props;

  return (
    <div style={styles.root}>
      <List>
        <Subheader>General Setting</Subheader>
        <ListItem
          primaryText="Edit event"
          secondaryText="Change title, date or location of the event"
        />
        <ListItem primaryText="Delete event" secondaryText="You want to remove my existence?" />
      </List>
      <Divider />
      <List>
        <Subheader>Widget Manager</Subheader>
        <ListItem primaryText="Weather" rightToggle={<Toggle />} />
        <ListItem primaryText="Checklist" rightToggle={<Toggle />} />
        <ListItem primaryText="Messages" rightToggle={<Toggle />} />
      </List>
    </div>
  );
};

const mapStateToProps = state => {
  return {
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
        },
        weather: {
          displayed: true
        },
        todo: {
          displayed: false
        }
      }
    }
  };
};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default connect(mapStateToProps)(withRouter(WidgetManager));
