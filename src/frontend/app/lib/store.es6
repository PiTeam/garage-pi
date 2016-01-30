import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from 'reducers';

export default function createAppStore() {
  const logger = createLogger();
  const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
  const store = createStoreWithMiddleware(reducers);

  return store;
}
