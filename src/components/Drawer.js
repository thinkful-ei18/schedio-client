// import React from 'react';
// import Drawer from 'material-ui/Drawer';
// import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';

// const styles = {
//   Button: {
//     marginLeft: 500
//   },
//   Drawer: {
//     // height: 500
//   }
// }

// export default class DrawerWindow extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {open: false};
//   }

//   handleToggle = () => this.setState({open: !this.state.open});

//   render() {
//     return (
//       <div>
//         <RaisedButton
//           style={styles.Button} 
//           label="Toggle Drawer"
//           onClick={this.handleToggle}
//         />
//         <Drawer open={this.state.open} >
//           <MenuItem>Menu Item</MenuItem>
//           <MenuItem>Menu Item 2</MenuItem>
//           <MenuItem>Menu Item 2</MenuItem>
//         </Drawer>
//       </div>
//     );
//   }
// }

import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  Button: {
    // marginLeft: 500
  },
  Drawer: {
    // position: 'absolute',
    // height: 300
  }
};

export default class DrawerWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton
          style={styles.Button}
          label="Toggle Drawer"
          onClick={this.handleToggle}
        />
        <Drawer width={300} openSecondary={true} open={this.state.open} style={styles.Drawer} >
          <AppBar title="AppBar" />
        </Drawer>
      </div>
    );
  }
}