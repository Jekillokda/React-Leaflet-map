import {ADD_COMMENT, LOAD_COMMENTS} from '../constants';

export function commentsLoad(data) {
  return {
    type: LOAD_COMMENTS,
    payload: {data},
  };
}

export function commentAdd(markId, comm, stars) {
  return {
    type: ADD_COMMENT,
    payload: {markId, comm, stars},
  };
}
