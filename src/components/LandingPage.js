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
            <h2>&lt;INSERT PICTURE CAROUSEL HERE&gt;</h2>
            <h2>What is Schedio?</h2>            
            <p>
              Schedio is the Greek word for design.  We give users the freedom to design
                their own traveling itineraries.  Plan your next destination by finding 
                nearby restaurants, hiking trails, weather forecast, and sporting events 
                all in one app.  Plan, schedule, and commit!
            </p>
            <h2>Demo the App</h2>            
            <p>
              Credentials have been created to demo the app.  Simply go to login page and type in "demo"
              for username and "demo" for password.
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
            <h2>&lt;INSERT PICTURE REGISTRATION HERE&gt;</h2>
            <h2>Dashboard Instructions</h2>            
            <p>
              On successful login, user is taken to the dashboard page.  The top left 
              navigation icon allows nagivation to the home page to access instructions 
              and the current dashboard page.
            </p>
            <h2>&lt;INSERT PICTURE LOGIN NAVIGATION HERE&gt;</h2>
            <p>
              The Events window contains three subsection including View Event, 
              Upcoming Event, and Past Events.  By default, View Event is active on the
              display window.  The current date is calculated and associates upcoming and 
              past events in their respective tabs.  To add an event, click on the red "+" 
              tab found at the bottom of each tab.
            </p>
            <h2>&lt;INSERT PICTURE EVENT TABS HERE&gt;</h2>
            <h2>Add Event Instructions</h2>            
            <p>
              After clicking the red "+" icon on the bottom of an Event tab, a window pops
              up, prompting a few inputs.  
            </p>
            <ol>
              <h2>&lt;INSERT PICTURE EVENT CREATION STEP 1 HERE&gt;</h2>            
              <li>
                Select the date by clicking on the calendar.  The year can be cycled
                with the "&lt;&lt;" and "&gt;&gt;" buttons on the top corners.  The month can be cyled through
                with the "&lt;" and "&gt;" buttons on top.  Click "Next" when date has been selected.
              </li>
              <h2>&lt;INSERT PICTURE EVENT CREATION STEP 2 HERE&gt;</h2>                          
              <li>
                The second steps involves setting up a time for the event.  First, set the hour with the
                clock widget.  Then, the set the minute for the start time.  If the hour or minute is
                already set to desired time, press "OK" on the bottom right.  Once the time has been set,
                click "NEXT" to proceed.
              </li>
              <h2>&lt;INSERT PICTURE EVENT CREATION STEP 3 HERE&gt;</h2>                          
              <li>
                Enter the address, national park, or city/town into the "Search Places" input box.
                After typing in the first few characters, Google search pulls down a list of likely
                candidates.  Click your desired location when it appears, then click "Next."
              </li>
              <h2>&lt;INSERT PICTURE EVENT CREATION STEP 4 HERE&gt;</h2>                          
              <li>
                The last step of the event creation process includes selecting which type of event
                is being planned.  Selecting "Basic" as a default to load the weather and 
                things to remember widgets.
              </li>
            </ol>
            <h2>&lt;INSERT PICTURE WIDGET CONFIGURATION BUTTON&gt;</h2>                          
            <h2>Displaying Widgets for Current Event</h2>                          
            <p>
              To add widgets to the event currently on the "View Event" tab, first click on the 
              "gear" on the top right.  A window will pop up and display all available widgets.  
              For basic events, notice the Weather and Checklist widgets have been turned on by default.
              Turn on or off the widgets with the switch buttons on the right-hand-side.
              When done, click on the "Confirm" button on the bottom.
            </p>
            <h2>&lt;INSERT PICTURE WIDGET CONFIGURATION WINDOW&gt;</h2>
            <h2>Weather Widget Instructions</h2>                          
            <h2>&lt;INSERT PICTURE WEATHER WIDGET&gt;</h2>            
            <p>
              The Weather widget is based on the event location and date.  It displays 
              the forecast of the event date if within a seven day time frame.  If the event date is more than 
              seven days away, the Weather widget will default to the forecast of current date.
            </p>
            <h2>Map Widget Instructions</h2>                          
            <h2>&lt;INSERT PICTURE MAP WIDGET&gt;</h2>            
            <p>
              The Map widget is based on the event location and Google Maps.  You can use
              Google maps functionalities including zooming in and out, map and satellite displays, and 
              toggle full screen view.  In addition, the location displayed on the map can be changed by
              first clicking on the gear icon on the top right of thee widget.
            </p>
            <h2>&lt;INSERT PICTURE MAP WIDGET CHANGE SETTINGS&gt;</h2>            
            <p>
              The Map widget settings allows you to change the widget title and location being 
              displayed.  Input the desired title in the "widget title" input.  To change the location,
              input the address or general location and click on the destination on the dropdown menu.
              Once done, click on "SHOW MAP" to proceed.
            </p>
            <h2>&lt;INSERT PICTURE MAP WIDGET CHANGE SETTINGS CONFIRM&gt;</h2>            
            <p>
              Click "Confirm" to save the new title and location on widget.
            </p>
            <h2>Hiking Widget Instructions</h2>                          
            <h2>&lt;INSERT PICTURE HIKING WIDGET BEFORE&gt;</h2>            
            <p>
              The Hiking widget return one of ten most popular hiking trails in the desired location.
              Begin by typing in the location in the search input box.  Click on the correct destination
              on the dropdown list.
            </p>
            <h2>&lt;INSERT PICTURE HIKING WIDGET AFTER&gt;</h2>            
            <p>
              After clicking on the desired location, one of the top ten hiking spots appears on the widget.
            </p>
            <h2>Food Widget Instructions</h2>                          
            <h2>&lt;INSERT PICTURE FOOD WIDGET BEFORE&gt;</h2>            
            <p>
              The Food widget uses the core functionality of the yelp API to return the best rated restaurants
              submitted in the search window.  After submitting a search, you are redirected to a results page.
            </p>
            <h2>&lt;INSERT PICTURE FOOD WIDGET AFTER&gt;</h2>            
            <p>
             To display find more information about the restaurant, click on the picture icon that
             conatins a link to the yelp reviews, pictures, menu, and address.  Once the restaurant decision
             has been made, click "CHOOSE" and the restarant is saved on the Event View display.
            </p>
          </div>
        </div>
      </StyleRoot>
    </div>
  );
}
