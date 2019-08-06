import {COMMENTS_URL} from '../../constants';
import axios from 'axios';

export function loadComments() {
  return axios.get(COMMENTS_URL).then((comments) => {
    return comments.data;
  });
}

export function saveComment(comment) {
  return axios.post(COMMENTS_URL, comment);
}

export function deleteComment(id) {
  console.log('DELETECOMM', COMMENTS_URL+'/'+id);
  return axios.delete(COMMENTS_URL+'/'+id).then((res) => {
    return res.message;
  });
}
