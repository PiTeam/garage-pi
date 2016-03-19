import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import createAppStore from 'lib/store';

const store = createAppStore();
injectTapEventPlugin();

ReactDOM.render((
  <Provider store={store}>
    <Routes />
  </Provider>
), document.getElementById('app'));
