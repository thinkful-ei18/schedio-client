import React from 'react';
import { AppBar, Toolbar, Typography } from 'material-ui';


export default props => {
  return (
    <div>
      <h1>Hello</h1>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='headline' color='inherit' >
            Exercise Database
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}