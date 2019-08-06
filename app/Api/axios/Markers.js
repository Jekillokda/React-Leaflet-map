import {MARKERS_URL} from '../../constants';
import axios from 'axios';

export function loadMarkers() {
  return axios.get(MARKERS_URL).then((markers) => {
    return markers.data;
  });
}

export function saveMarker(data) {
  return axios.post(MARKERS_URL, data);
}

export function deleteMarker(id) {
  return axios.delete(MARKERS_URL+'/'+id).then((res) => {
    return res.message;
  });
}
