import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';

import App from './App';
import './index.css';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  rootReducer,
  compose(
    process.env.NODE_ENV === 'development' && (window as any).devToolsExtension
      ? (window as any).devToolsExtension()
      : (f: any) => f,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
