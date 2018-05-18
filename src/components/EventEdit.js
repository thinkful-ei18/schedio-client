import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Edit from 'material-ui/svg-icons/image/edit';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { requestEventEdit, fetchUserEvents } from '../store/actions/eventlist.actions';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import LocationSearch from './Utilities/LocationSearch';
import './EventEdit.css';
export class EventEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      starttime: null,
      location: null
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchUserEvents());
  }

  handleOpen = (type) => {
    const { activeEvent } = this.props;
    this.setState({ open: true, type, [type]: activeEvent[type] });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleTitleOnChange = e => {
    const title = e.target.value;
    this.setState({ title });
  }
  handleDateOnChange = date => {
    this.setState({ starttime: date });
  }
  handleTimeOnChange = newDate => {
    let oldDate = moment(Date(this.state.starttime));
    const hours = newDate.getHours();
    const mins = newDate.getMinutes();
    oldDate.hour(hours);
    oldDate.minute(mins);
    this.setState({
      starttime: oldDate.toDate().getTime()
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, activeEvent } = this.props;
    const { type } = this.state;
    return dispatch(requestEventEdit(activeEvent.id, { [type]: this.state[type] }))
      .then(() => {
        return dispatch(fetchUserEvents());
      })
      .then(() => this.handleClose())
      .catch(err => {

      });

  }
  render() {
    const { activeEvent } = this.props;
    if (!activeEvent) return <div>Loading</div>;

    const renderEditIcon = () => {
      return (
        <Edit />
      );
    };
    const renderEventInfo = (event) => {
      return (
        <List>
          <ListItem primaryText="Title" secondaryText={event.title} disabled={false} rightAvatar={renderEditIcon()} onClick={() => this.handleOpen('title')} />
          <Divider />
          <ListItem primaryText="Date" secondaryText={moment(Number(event.starttime)).format('MMMM Do, h:mm a')} disabled={false} rightAvatar={renderEditIcon()} onClick={() => this.handleOpen('starttime')} />
          <Divider />
          <ListItem primaryText='Location' secondaryText={event.location.address} disabled={false} rightAvatar={renderEditIcon()} onClick={() => this.handleOpen('location')} />
        </List>
      );
    };

    const renderDialog = () => {

      const { type } = this.state;
      return (
        <Dialog
          title={`Change ${type}`}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form onSubmit={this.handleSubmit} style={styles.titleContainer}>
            {renderInput(type)}
            <FlatButton type="submit" label="Save" />
          </form>

        </Dialog>
      );
    };

    const renderInput = (type) => {
      const { title, starttime, location } = this.state;
      if (type === 'title') {
        return (
          <input type="text" name='title' id="title" value={title} onChange={e => this.handleTitleOnChange(e)} style={styles.input} />
        );
      }
      if (type === 'starttime') {
        return (
          <section>
            <div>
              <DatePicker name="date" id="date" value={new Date(Number(starttime))} onChange={(err, date) => this.handleDateOnChange(date)} />
            </div>
            <div>
              <TimePicker name="time" id="time" value={new Date(Number(starttime))} onChange={(err, date) => this.handleTimeOnChange(date)} />
            </div>
          </section>

        );
      }
      if (type === 'location') {
        return (
          <LocationSearch address={address => this.setState({ location: { ...this.state.location, address } })} coordinate={coordinate => this.setState({ location: { ...this.state.location, lat: coordinate.lat, long: coordinate.lng } })} />
        );
      }
      return '';
    };

    return (
      <main style={styles.container} className="container">
        {renderDialog()}
        <section style={styles.titleContainer}>
          <h2>Your event info</h2>
          <p style={styles.desc}>Manage your event, change title, date and location with a single tap.</p>
        </section>
        <section style={styles.entryContainer}>
          {this.props.activeEvent ? renderEventInfo(this.props.activeEvent) : ''}
        </section>
      </main>
    );
  }


}

const mapStateToProps = state => ({
  activeEvent: state.events.activeEvent
});

export default connect(mapStateToProps)(EventEdit);

const styles = {
  container: {
    maxWidth: '1080px',
    margin: '0 auto',
    backgroundColor: 'white',
    transition: 'all 0.5s ease',
  },
  titleContainer: {
    width: '300px',
    padding: 10,
    margin: '0 auto'
  },
  desc: {
    color: 'rgba(0,0,0,0.65)',
    fontSize: '18px',
    lineHeight: '30px'
  },
  entryContainer: {
    width: '300px',
    padding: 10,
    margin: '0 auto'
  },
  inputContainer: {
    padding: 16
  },
  label: {
    display: 'block',
    marginBottom: 15,
    fontWeight: 'bold'
  },
  input: {
    boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)',
    padding: 10,
    paddingLeft: 5,
    width: '100%',
    marginBottom: 10,
    border: 0
  },
};