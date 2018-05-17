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
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
export class EventCreation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stepIndex: 0,
			date: new Date(),
			address: null,
			coordinate: null,
			error: null
		};
	}

	/*============ handle stepper control ===========
	handleNext go to next step
	handlePrev go to prev step
	*/
	handleNext = () => {
		const { stepIndex } = this.state;
		if (stepIndex < 3) {
			this.setState({ stepIndex: stepIndex + 1, error: null });
		}
	};

	handlePrev = () => {
		const { stepIndex } = this.state;
		if (stepIndex > 0) {
			this.setState({ stepIndex: stepIndex - 1, error: null });
		}
	};

	/*============== handle picking event date ===========
	pick a date from calendar
	*/
	onChange = date => this.setState({ date });
	handleHours = newDate => {
		const oldDate = this.state.date;
		const hours = newDate.getHours();
		const mins = newDate.getMinutes();

		this.setState({
			date: moment(oldDate).add(hours * 60 + mins, 'm').toDate()
		});
	}

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
		alert('error in selecting template');
	};
	handleErrorSubmit = () => {
		this.setState({
			stepIndex: 2,
			error: 'No location is defined'
		})
	}
	/*===========handle submit and redirect ===========
	
	*/
	onSubmit = template => {
		const { address, coordinate, date } = this.state;
		if (!address || !coordinate) return this.handleErrorSubmit()
		if (!templateWidgets[template]) {
			return alert(`${template} is not defined tempalte`);
		}
		const { userId } = this.props;
		const newEvent = {
			title: `new event created on ${new Date().toDateString()}`,
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
			<div style={{ maxWidth: 400, margin: 'auto', background: 'white', boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)' }}>
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
							When does it start?
	          </StepButton>
						<StepContent>
							<div style={styles.stepContent}>
								<div style={styles.input}>
									<TimePicker
										hintText="  select a time"
										autoOk={true}
										minutesStep={5}
										onChange={(err, time) => this.handleHours(time)}
										underlineStyle={{ display: 'none' }}
										textFieldStyle={{ paddingLeft: 10 }} />

								</div>
							</div>
							{renderStepActions(1)}
						</StepContent>
					</Step>
					<Step>
						<StepButton onClick={() => this.setState({ stepIndex: 2 })}>
							Where would you like to go?
	          </StepButton>
						<StepContent>
							<div style={styles.stepContent}>

								<p style={{ color: 'grey', fontSize: '14px' }}>{this.state.error ? `${this.state.error}` : `Enter the address for the event.`}</p>
								<LocationSearch
									address={this.handleLocation}
									coordinate={this.handleCoordinate}
									error={this.handleError}
								/>
							</div>
							{renderStepActions(2)}
						</StepContent>
					</Step>
					<Step>
						<StepButton onClick={() => this.setState({ stepIndex: 3 })}>
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
	Basic: ['weather', 'todo', 'map', 'foodanddining'],
	Shopping: ['weather', 'todo', 'map', 'foodanddining'],
	Hiking: ['weather', 'todo', 'map', 'foodanddining', 'outdooractivities']
};
const styles = {
	stepContent: {
		padding: 5,
		width: '100%',
		margin: 10,
		marginLeft: 2,
		paddingLeft: 0
	},
	input: {
		boxShadow: '0 3px 6px 0 rgba(16, 36, 94, 0.2)',
		display: 'flex',
		justifyContent: 'center',
		marginTop: 10
	}
};

const mapStateToProps = state => {
	return {
		userId: state.auth.currentUser.user.id
	};
};
export default connect(mapStateToProps)(withRouter(EventCreation));
