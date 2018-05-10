import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Weather from './Widgets/WeatherWidget';
// import Todo from './Widgets/TodoWidget';
import Map from './Widgets/MapWidget';
// import Todo from './Widgets/Todo';
// import Trail from './Widgets/trail';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import MediaQuery from 'react-responsive';

export class EventView extends React.Component {
  render() {
    const { currentEvent, history } = this.props;
    let widgetsForShow = [];
    if (currentEvent.id) {
      widgetsForShow = getWidgetRender(currentEvent);
    }

    return (
      <main>
        <Card>
          <Header
            title={
              currentEvent.title ? currentEvent.title : 'No Upcoming Events.  Why not create one?'
            }
            date={currentEvent.title ? new Date(Number(currentEvent.starttime)).toDateString() : ''}
            location={currentEvent.location.address ? currentEvent.location.address : ''}
            countdown={
              currentEvent.starttime ? moment(Number(currentEvent.starttime)).fromNow() : ''
            }
            history={history}
          />
        </Card>
        <br />
        <section>{widgetsForShow}</section>
      </main>
    );
  }
}
const mapStateToProps = state => ({
  currentEvent: state.events.activeEvent ? state.events.activeEvent : ''
});

export default withRouter(connect(mapStateToProps)(EventView));

/*=============== helper function for Rendering widgets======
*/
function getWidgetRender(event) {
  const widgets = event.widgets;
  const arr = [];
  for (let widget in widgets) {
    if (widgets[widget].displayed === true) {
      if (widget === 'weather') {
        arr.push(
          <div>
            <Card key={'weather'}>
              <Weather event={event} />
            </Card>
            <br />
          </div>
        );
      }
      if (widget === 'map') {
        arr.push(
          <div>
            <Card key={'map'}>
              <Map event={event} />
            </Card>
            <br />
          </div>
        );
      }
    }
  }
  return arr;
}

/*=============== Header Component for EventView==================
 @props { title, location, date, countdown, history }
*/
function Header(props) {
  const { title, location, date, countdown, history } = props;
  return (
    <MediaQuery maxWidth={700}>
      {matches => {
        return (
          <main style={matches ? styles.headerContainer : styles.headerContainerDesk}>
            <div style={styles.gearIcon}>
              <IconButton tooltip="setting" onClick={() => history.push('/dashboard/eventsetting')}>
                <ActionSettings />
              </IconButton>
            </div>
            {/* Left half div */}
            <section>
              <header style={styles.headerTitle}>
                {title.length > 10 ? title.substring(0, 25) + '...' : title}
              </header>
              <section style={styles.subHeaderContainer}>
                <div style={styles.subHeaderItem}>
                  <header style={styles.headerLabel}>Location</header>
                  <section>{location}</section>
                </div>
                <div style={styles.subHeaderItem}>
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
      }}
    </MediaQuery>
  );
}
/*=============== Styles rules for components ==================
*/
const styles = {
  headerContainerDesk: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '10px 40px 10px 10px',
    boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)'
  },
  headerContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 25px 10px 10px',
    boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)'
  },
  headerTitle: {
    overflow: 'hidden'
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
  subHeaderItem: {
    padding: '10px 10px'
  },
  headerLabel: {
    color: 'rgba(140, 140, 140,0.9)'
  }
};
