import axios from 'axios';

export function axiosGet(url) {
  return axios.get(url);
}
export function axiosPost(url, data) {
  return axios.post(url, data);
}
export function axiosPut(url, data) {
  return axios.put(url, data);
}
export function axiosDelete(url, id) {
  return axios.delete(url+'/'+id);
}
