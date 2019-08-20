import {ADD_COMMENT, LOAD_COMMENTS} from '../constants';

export default function commFunc(state = [], action) {
  const {type, payload} = action;
  switch (type) {
    case LOAD_COMMENTS: {
      return payload;
    }

    case ADD_COMMENT: {
      console.log('state', state);
      return state + {
        markId: payload.markID,
        comm: payload.comm,
        stars: payload.stars,
      };
    }
  }
  return state;
}
