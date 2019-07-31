import axios from 'axios';
export default function axiosGet(url) {
  return axios.get(url);
}
export function axiosPost(url, data) {
  return axios.post(url, data);
}
