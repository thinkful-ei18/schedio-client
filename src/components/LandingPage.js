import React from 'react';
import { zoomInRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import './LandingPage.css';

const styles = {
  zoomInRight: {
    animation: 'x 1s',
    animationName: Radium.keyframes(zoomInRight, 'zoomInRight')
  }
};

export default function LandingPage(props) {
  return (
    <div className="container landing-page">
      <h1> Schedio</h1>
      <StyleRoot>
        <div className="info-progression" style={styles.zoomInRight}>
          <div className="f-pg">
            <i className="fa fa-book fa-5x" />
            <p>Plan</p>
          </div>

          <div className="f-pg" style={styles.zoomInRight}>
            <i className="fa fa-paper-plane fa-5x" />
            <p>Schedule</p>
          </div>

          <div className="f-pg" style={styles.zoomInRight}>
            <i className="fa fa-calendar fa-5x" />
            <p>Commit</p>
          </div>

          <div className="instructions">
            <h2>"INSERT PICTURE CAROUSEL HERE"</h2>
            <h2>What is Schedio?</h2>            
            <p>
              Schedio is the Greek word for design.  We give users the freedom to design
                their own traveling itineraries.  Plan your next destination by finding 
                nearby restaurants, hiking trails, weather forecast, and sporting events 
                all in one app.  Plan, schedule, and commit!
            </p>
            <h2>Registration and Login Instructions</h2>
            <p>
              If you do not have a user account, please register by first clicking on the 
                top left icon, then click "Register".  You will be brought to a registration
                page.  Then, you will be directed to a login page.
              <br/><br/>
              Alternatively, you could login with a Google account for easier access by
              clicking on the "Login With Google" button.  This will prompt and pop up
              window to provide Google account credentials. 
            </p>
            <h2>"INSERT PICTURE REGISTRATION HERE"</h2>
            <h2>"Dashboard Instructions"</h2>            
            <p>
              On successful login, user is taken to the dashboard page.  The top left 
              navigation icon allows nagivation to the home page to access instructions 
              and the current dashboard page.
            </p>
            <h2>"INSERT PICTURE LOGIN NAVIGATION HERE"</h2>
            <p>
              The Events window contains three subsection including View Event, 
              Upcoming Event, and Past Events.  By default, View Event is active on the
              display window.  The current date is calculated and associates upcoming and 
              past events in their respective tabs.  
            </p>
            <h2>"INSERT PICTURE EVENT TABS HERE"</h2>
            
          </div>
        </div>
      </StyleRoot>
    </div>
  );
}
