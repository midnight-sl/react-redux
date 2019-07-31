import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

export default function setupStore() {
  const extensions = (window.__REDUX_DEVTOOLS_EXTENSION__  || compose);
  return createStore(rootReducer, extensions( applyMiddleware(thunk) ));
}