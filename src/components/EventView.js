import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Weather from './Widgets/WeatherWidget';
import Todo from './Widgets/TodoWidget';
import Map from './Widgets/MapWidget';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import MediaQuery from 'react-responsive';
import FoodWidget from './Widgets/FoodWidget';

export class EventView extends React.Component {
  render() {
    const { currentEvent, history } = this.props;
    let widgetsForShow = [];
    if (currentEvent.id) {
      widgetsForShow = getWidgetRender(currentEvent, history);
    }

    return (
      <main>
        <Card>
          <Header
            title={
              currentEvent.title ? currentEvent.title : 'No Upcoming Events'
            }
            date={
              currentEvent.title
                ? moment(Number(currentEvent.starttime)).format('MMMM Do, h:mm a')
                : ''
            }
            location={
              currentEvent.location.address ? currentEvent.location.address : ''
            }
            countdown={
              currentEvent.starttime
                ? moment(Number(currentEvent.starttime)).fromNow()
                : ''
            }
            history={history}
          />
        </Card>
        <br />
        <section style={styles.widgetContainer}>{widgetsForShow}</section>
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
function getWidgetRender(event, history) {
  const widgets = event.widgets;
  const arr = [];
  for (let widget in widgets) {
    if (widgets[widget].displayed === true) {
      if (widget === 'weather') {
        arr.push(
          <CardItem key={'weather'}>
            <Card>
              <header style={styles.widgetTitle}>
                {widgets[widget].info ? widgets[widget].info.title : 'Weather Information'}
              </header>
              <Weather event={event} />
            </Card>
          </CardItem>
        );
      }
      if (widget === 'map') {
        arr.push(
          <CardItem key={'map'}>
            <Card>

              <header style={styles.widgetTitle}>
                {widgets[widget].info ? widgets[widget].info.title : 'Map'}
<<<<<<< HEAD
                <div style={styles.gearIcon}>
                  <IconButton
                    tooltip="map setting"
                    onClick={() => history.push('/dashboard/mapconfig')}
                  >
                    <ActionSettings color="white" />
                  </IconButton>
                </div>
=======
>>>>>>> 1af52796787c898ec737485f0e50b9b26e9b8f22
              </header>
              <Map event={event} />
            </Card>
          </CardItem>
        );
      }
      if (widget === 'todo') {
        arr.push(
          <CardItem key={'todo'}>
            <Card>
              <header style={styles.widgetTitle}>
                {widgets[widget].info
                  ? widgets[widget].info.title
                  : 'Things to Remember'}
              </header>
              <Todo event={event} />
            </Card>
          </CardItem>
        );
      }
      if (widget === 'foodanddining') {
        arr.push(
          <CardItem key={'foodanddining'}>
            <Card>
              <header style={styles.widgetTitle}>
                {widgets[widget].info
                  ? widgets[widget].info.title
                  : 'Find Food Nearby'}
              </header>
              <FoodWidget event={event} />
            </Card>
          </CardItem>
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
          <main
            style={
              matches ? styles.headerContainer : styles.headerContainerDesk
            }
          >
            <div style={styles.gearIcon}>
              <IconButton
                tooltip="setting"
                onClick={() => history.push('/dashboard/eventsetting')}
              >
                <ActionSettings color="rgb(0, 151, 167)" />
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

/*=============== CardItem Component for Widgets==================

*/
function CardItem(props) {
  return (
    <MediaQuery maxWidth={700}>
      {matches => {
        return (
          <div style={matches ? styles.cardItem : styles.cardItemDesk}>
            {props.children}
          </div>
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
    flexWrap: 'wrap',
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
  cardItem: {
    boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)',
    marginBottom: 10,
    width: '100%'
  },
  cardItemDesk: {
    boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)',
    marginBottom: 10,
    width: '49%'
  },
  widgetContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  widgetTitle: {
    position: 'relative',
    boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)',
    marginBottom: 8,
    padding: 10,
    textAlign: 'left',
    backgroundColor: '#0097A7',
    color: 'white'
  },
  gearIcon: {
    position: 'absolute',
    right: 0,
    top: -5

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
