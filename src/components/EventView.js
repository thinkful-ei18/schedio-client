import React from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import WeatherWidget from './WeatherWidget';
// import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Map from './Widgets/MapWidget';
import Todo from './Widgets/Todo';
import Weather from './Widgets/Weather';
import Trail from './Widgets/trail';

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
          if (widget === 'todo') {
            widgetsForShow.push(<Todo event={currentEvent} key={'todo'} />);
          }
          if (widget === 'trail') {
            widgetsForShow.push(<Trail event={currentEvent} key={'trail'} />);
          }
        }
      }
    }

    return (
      <Card>
<<<<<<< HEAD
        <div>
          <CardHeader
            title={
              this.props.currentEvent.title ? this.props.currentEvent.title : 'No Event Selected'
            }
            subtitle={
              this.props.currentEvent.title
                ? new Date(Number(this.props.currentEvent.starttime)).toDateString()
                : ''
            }
            showExpandableButton={false}
          />
          <CardText expandable={false}>
            {this.props.currentEvent.address ? this.props.currentEvent.address : ''}
            {this.props.currentEvent.starttime
              ? moment(Number(this.props.currentEvent.starttime)).fromNow()
              : ''}
            <WeatherWidget event= {this.props.currentEvent}/>
          </CardText>
        </div>
        <button
          onClick={() => {
            console.log('click');
            this.props.history.push('/dashboard/widget-manager');
          }}
        >
					Click me
        </button>
				}
=======
        <Header
          title={currentEvent.title ? currentEvent.title : 'No Event Selected'}
          date={currentEvent.title ? new Date(Number(currentEvent.starttime)).toDateString() : ''}
          location={currentEvent.location.address ? currentEvent.location.address : ''}
          coundown={currentEvent.starttime ? moment(Number(currentEvent.starttime)).fromNow() : ''}
        />
        <div>{widgetsForShow}</div>
>>>>>>> static eventview
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
    <main>
      <section>
        <header>{title}</header>
        <section>
          <div>
            <header>Location</header>
            <section>{location}</section>
          </div>
          <div>
            <header>Date</header>
            <section>{date}</section>
          </div>
        </section>
      </section>
      <section>
        <header>Event count down</header>
        <div>{countdown}</div>
      </section>
    </main>
  );
}
