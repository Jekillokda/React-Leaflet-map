import axios from 'axios';
export function axiosGet(url) {
  return axios.get(url);
}
export function axiosPost(url, data) {
  return axios.post(url, data);
}
