import {createStore, applyMiddleware} from 'redux';
import reducer from '../Reducers/root';
import logger from '../middlewares/logger';
import thunk from 'redux-thunk';

const enhancer = applyMiddleware(thunk, logger);

const store = createStore(reducer, enhancer);
if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
