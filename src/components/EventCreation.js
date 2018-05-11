import React from 'react';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Calendar from 'react-calendar';
import EventTemplate from './EventTemplate';
import './styles/EventCreation.css';
import LocationSearch from './Utilities/LocationSearch';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { asyncCreateEvent, createEvent } from '../store/actions/eventcreation';
export class EventCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      date: new Date(),
      address: null,
      coordinate: null
    };
  }

	/*============ handle stepper control ===========
	handleNext go to next step
	handlePrev go to prev step
	*/
	handleNext = () => {
	  const { stepIndex } = this.state;
	  if (stepIndex < 2) {
	    this.setState({ stepIndex: stepIndex + 1 });
	  }
	};

	handlePrev = () => {
	  const { stepIndex } = this.state;
	  if (stepIndex > 0) {
	    this.setState({ stepIndex: stepIndex - 1 });
	  }
	};

	/*============== handle picking event date ===========
	pick a date from calendar
	*/
	onChange = date => this.setState({ date });

	/*============== handle picking event location =======
	search location where event is happening
	save location address and coordinate 
	handle error if there is any
	*/
	handleLocation = address => {
	  this.setState({
	    address
	  });
	};
	handleCoordinate = coordinate => {
	  this.setState({ coordinate });
	};
	handleError = error => {
	  alert('no location is returned');
	};
	handleAsyncError = error => {
	  console.log(error);
	  alert('error in selecting template');
	};
	/*===========handle submit and redirect ===========
	
	*/
	onSubmit = template => {
	  if (!templateWidgets[template]) {
	    return alert(`${template} is not defined tempalte`);
	  }
	  const { address, coordinate, date } = this.state;
	  const { userId } = this.props;
	  const newEvent = {
	    title: `new event created on ${new Date()}`,
	    location: {
	      address: address,
	      lat: coordinate.lat,
	      long: coordinate.lng
	    },

	    userId,
	    starttime: date.getTime(),
	    initWidgets: templateWidgets[template]
	  };
	  const { dispatch, history } = this.props;
	  return dispatch(asyncCreateEvent(newEvent))
	    .then(_event => {
	      return dispatch(createEvent(_event));
	    })
	    .then(() => history.push('/dashboard'))
	    .catch(err => this.handleAsyncError(err));
	};
	render() {
	  const renderStepActions = step => {
	    return (
	      <div style={{ margin: '12px 0' }}>
	        <RaisedButton
	          label="Next"
	          primary={true}
	          onClick={this.handleNext}
	          style={{ marginRight: 12 }}
	        />
	        {step > 0 && <FlatButton label="Back" onClick={this.handlePrev} />}
	      </div>
	    );
	  };
	  const { stepIndex } = this.state;
	  return (
	    <div style={{ maxWidth: 380, maxHeight: 400, margin: 'auto' }}>
	      <Stepper activeStep={stepIndex} linear={false} orientation="vertical">
	        <Step>
	          <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
							Select a date for the event
	          </StepButton>
	          <StepContent>
	            <div style={styles.stepContent}>
	              <Calendar
	                onChange={this.onChange}
	                value={this.state.date}
	                className="react-calendar"
	              />
	            </div>
	            {renderStepActions(0)}
	          </StepContent>
	        </Step>
	        <Step>
	          <StepButton onClick={() => this.setState({ stepIndex: 1 })}>
							Where would you like to go?
	          </StepButton>
	          <StepContent>
	            <p>Enter the address for the event.</p>
	            <p>Enter city location if you don't know the detail yet.</p>
	            <div style={styles.stepContent}>
	              <LocationSearch
	                address={this.handleLocation}
	                coordinate={this.handleCoordinate}
	                error={this.handleError}
	              />
	            </div>
	            {renderStepActions(1)}
	          </StepContent>
	        </Step>
	        <Step>
	          <StepButton onClick={() => this.setState({ stepIndex: 2 })}>
							Select the right template for your event:
	          </StepButton>
	          <StepContent>
	            <div style={styles.stepContent}>
	              <EventTemplate onClick={this.onSubmit} />
	            </div>
	          </StepContent>
	        </Step>
	      </Stepper>
	    </div>
	  );
	}
}

const templateWidgets = {
  Basic: ['weather', 'todo'],
  Shopping: ['weather', 'todo']
};
const styles = {
  stepContent: {
    padding: 15,
    width: '100%'
  }
};

const mapStateToProps = state => {
  return {
    userId: state.auth.currentUser.user.id
  };
};
export default connect(mapStateToProps)(withRouter(EventCreation));
