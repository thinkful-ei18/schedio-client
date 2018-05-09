import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Weather from './Widgets/WeatherWidget';
import Map from './Widgets/MapWidget';
// import Todo from './Widgets/Todo';
// import Trail from './Widgets/trail';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

export class EventView extends React.Component {
  render() {
    const { currentEvent } = this.props;
    let widgetsForShow = [];
    if (currentEvent.id) {
      const widgets = currentEvent.widgets;
      for (let widget in widgets) {
        if (widgets[widget].displayed === true) {
          if (widget === 'map') {
            widgetsForShow.push(<Map event={currentEvent} key={'map'} />);
          }
          if (widget === 'weather') {
            widgetsForShow.push(<Weather event={currentEvent} key={'weather'} />);
          }
          // if (widget === 'todo') {
          //   widgetsForShow.push(<Todo event={currentEvent} key={'todo'} />);
          // }
          // if (widget === 'trail') {
          //   widgetsForShow.push(<Trail event={currentEvent} key={'trail'} />);
          // }
        }
      }
    }

    return (
      <Card>
        <Header
          title={currentEvent.title ? currentEvent.title : 'No Event Selected'}
          date={currentEvent.title ? new Date(Number(currentEvent.starttime)).toDateString() : ''}
          location={currentEvent.location.address ? currentEvent.location.address : ''}
          coundown={currentEvent.starttime ? moment(Number(currentEvent.starttime)).fromNow() : ''}
        />
        {/* <div>{widgetsForShow}</div> */}
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  currentEvent: state.events.activeEvent ? state.events.activeEvent : ''
});

export default withRouter(connect(mapStateToProps)(EventView));

function Header(props) {
  const { title, location, date, countdown } = props;
  return (
    <main style={styles.headerContainer}>
      <div style={styles.gearIcon}>
        <IconButton tooltip="setting">
          <ActionHome />
        </IconButton>
      </div>
      {/* Left half div */}
      <section>
        <header>{title}</header>
        <section style={styles.subHeaderContainer}>
          <div>
            <header style={styles.headerLabel}>Location</header>
            <section>{location}</section>
          </div>
          <div>
            <header style={styles.headerLabel}>Date</header>
            <section>{date}</section>
          </div>
        </section>
      </section>
      {/* right half div */}
      <section>
        <header style={styles.headerLabel}>Event count down</header>
        <div>{countdown}</div>
      </section>
    </main>
  );
}

const styles = {
  headerContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 20px 10px 20px'
  },
  gearIcon: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  subHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '10px 0'
  },
  headerLabel: {
    color: 'rgba(140, 140, 140,0.9)'
  }
};
