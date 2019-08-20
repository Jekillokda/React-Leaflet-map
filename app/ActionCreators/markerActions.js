import {ADD_MARKER, LOAD_MARKERS} from '../constants';

export function markersLoad(data) {
  return {
    type: LOAD_MARKERS,
    payload: {data},
  };
}

export function markerAdd(lat, lng, text) {
  return {
    type: ADD_MARKER,
    payload: {lat, lng, text},
  };
}
