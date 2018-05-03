import React from 'react';
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Calendar from 'react-calendar';
import SearchBar from '../containers/search_bar';
import EventTemplate from './EventTemplate';
import './css/EventCreation.css';
export default class EventCreation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stepIndex: 0,
			date: new Date()
		};
	}
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
	onChange = date => this.setState({ date });

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
							Enter location for the event
						</StepButton>
						<StepContent>
							<p>
								Enter the address where event is held. Enter city location if you don't know the
								detail yet.
							</p>
							<div style={styles.stepContent}>
								<SearchBar />
							</div>
							{renderStepActions(1)}
						</StepContent>
					</Step>
					<Step>
						<StepButton onClick={() => this.setState({ stepIndex: 2 })}>
							Select a template that best suit for your event
						</StepButton>
						<StepContent>
							<div style={styles.stepContent}>
								<EventTemplate />
							</div>
						</StepContent>
					</Step>
				</Stepper>
			</div>
		);
	}
}

const styles = {
	stepContent: {
		padding: 15,
		width: '100%'
	}
};
