import {ADD_MARKER, LOAD_MARKERS} from '../constants';

export default function markerFunc(state = [], action) {
  const {type, payload} = action;
  switch (type) {
    case LOAD_MARKERS: {
      return payload;
    }

    case ADD_MARKER: {
      return state + {
        lat: payload.lat,
        lng: payload.lng,
        text: payload.text,
      };
    }
  }
  return state;
}
