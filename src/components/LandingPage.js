import React from 'react';
import './LandingPage.css';
export default function LandingPage(props) {
  return (
    <div className="container">
      <h1> Schedio</h1>
      <div className="info-progression">
        <div className="f-pg">
          <i className="fa fa-book fa-5x"></i>
          <p>Plan</p>
        </div>
   
        <div className="f-pg">
          <i className="fa fa-paper-plane fa-5x">
          </i>
          <p>Schedule</p>
        </div>

        <div className="f-pg">
          <i className="fa fa-calendar fa-5x">
          </i>
          <p>Commit</p>
        </div>
      </div>
    </div>
  );
}
