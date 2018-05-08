import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SwipeableViews from 'react-swipeable-views';
import Basic from 'material-ui/svg-icons/action/bookmark-border';
import Home from 'material-ui/svg-icons/action/home';
import Sport from 'material-ui/svg-icons/maps/directions-bike';
import { RaisedButton } from 'material-ui';
import { withRouter } from 'react-router-dom';

let selectedTemplate = null;

export default class EventTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLabel: 0
    };
  }
	/*======= select categories ======
	*/
	handleChange = value => this.setState({ activeLabel: value });
	handleOnActive = activeLabel => {
	  clearTimeout(this.timerId);
	  this.timerId = setTimeout(() => {
	    this.setState({ activeLabel });
	  }, 50);
	};

	/*======= select a template ======
		it will return template name as callback
	*/
	handleOnClick = () => {
	  this.props.onClick(selectedTemplate);
	};
	render() {
	  console.log(this.state);
	  return (
	    <main style={templateStyles.container}>
	      <section>
	        <Label
	          title="Basic"
	          id={0}
	          active={this.state.activeLabel === 0 ? true : false}
	          icon={<Basic />}
	          onActive={this.handleOnActive}
	        />
	        <Label
	          title="In door"
	          id={1}
	          icon={<Home />}
	          active={this.state.activeLabel === 1 ? true : false}
	          onActive={this.handleOnActive}
	        />
	        <Label
	          title="Out door"
	          id={2}
	          icon={<Sport />}
	          active={this.state.activeLabel === 2 ? true : false}
	          onActive={this.handleOnActive}
	        />
	      </section>
	      <section>
	        <SwipeableViews index={this.state.activeLabel} onChangeIndex={this.handleChange}>
	          <ul style={{ paddingLeft: '0' }}>
	            <Choice title="Basic" onClick={this.handleOnClick} />
	          </ul>
	          <ul style={{ paddingLeft: '0' }}>
	            <Choice title="Shopping" onClick={this.handleOnClick} />
	            <Choice title="Party" onClick={this.handleOnClick} />
	            <Choice title="In door sports" onClick={this.handleOnClick} />
	          </ul>
	          <ul style={{ paddingLeft: '0' }}>
	            <Choice title="Hiking" onClick={this.handleOnClick} />
	            <Choice title="Fishing" onClick={this.handleOnClick} />
	          </ul>
	          <div />
	        </SwipeableViews>
	      </section>
	    </main>
	  );
	}
}

function Choice(props) {
  const handleChoice = template => {
    selectedTemplate = template;
    props.onClick();
  };
  return (
    <li style={{ listStyle: 'none', display: 'inline-block', margin: 5 }}>
      <RaisedButton
        label={props.title}
        labelStyle={{ fontSize: '12px' }}
        onClick={() => handleChoice(props.title)}
      />
    </li>
  );
}
function Label(props) {
  const { active, icon, title, onActive, id } = props;
  const setActive = () => onActive(id);
  return (
    <main style={labelStyles.container}>
      <section style={active ? labelStyles.innerActive : labelStyles.inner}>
        <div style={labelStyles.icon}>{icon}</div>
        <button style={active ? labelStyles.btnActive : labelStyles.btn} onClick={setActive}>
          {title}
        </button>
      </section>
    </main>
  );
}

const templateStyles = {
  container: {
    border: 'solid 1px black',
    minHeight: 400
  }
};
const labelStyles = {
  container: {
    padding: 5,
    width: '30%',
    display: 'inline-block',
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center'
  },
  inner: {
    border: 'solid 1px black',
    transition: 'all 0.5s ease',
    transform: 'translateY(-38px)'
  },
  innerActive: {
    border: 'solid 1px black',
    transform: 'translateY(-6px)',
    transition: 'all 0.5s ease',
    backgroundColor: '#009687a4'
  },
  icon: {
    transition: 'all 0.5s ease',
    display: 'flex',
    justifyContent: 'center',
    padding: 5
  },
  btn: {
    border: 0,
    padding: 5,
    backgroundColor: 'inherit',
    outline: 'none'
  },
  btnActive: {
    color: 'white',
    border: 0,
    padding: 5,
    outline: 'none',
    width: '100%',
    backgroundColor: 'inherit'
  }
};
