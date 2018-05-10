import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { BrowserRouter as Router } from 'react-router-dom';
import {StyleRoot} from 'radium';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// leave store as simple as possible
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<MuiThemeProvider>
				<App />
			</MuiThemeProvider>
		</Router>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
