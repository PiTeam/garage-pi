import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';

import Routes from 'routes';
import createAppStore from 'lib/store';

const store = createAppStore();
injectTapEventPlugin();

ReactDOM.render((
  <Provider store={store}>
    <Routes />
  </Provider>
), document.getElementById('app'));
