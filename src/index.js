import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import { store } from './redux/logic/';
import { Provider } from 'react-redux';

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));


serviceWorker.unregister();
