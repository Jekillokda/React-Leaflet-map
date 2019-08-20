import {combineReducers} from 'redux';
import markers from './markers';
import map from './map';
import comments from './comments';

export default combineReducers({
  markers,
  map,
  comments,
});
