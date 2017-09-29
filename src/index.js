import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, hashHistory, browserHistory } from 'react-router-dom'

import store from './store'

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
	<App />
</Provider>, app);
