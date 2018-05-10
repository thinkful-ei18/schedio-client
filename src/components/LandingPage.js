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
    <div className="container">
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
        </div>
      </StyleRoot>
    </div>
  );
}
