import React from 'react';
import {Map, TileLayer} from 'react-leaflet';
import IntPlace from './IntPlace';
import PropTypes from 'prop-types';

import {START_POSITION, START_ZOOM, TILE_URL} from '../constants';

export default function MapComponent(props) {
  return (
    <div>
      <Map center={START_POSITION} zoom={START_ZOOM}
        onClick={ (e) => props.getLatLng(e)}>
        <TileLayer url={TILE_URL}/>
        {props.list?props.list.map((item) => (
          <IntPlace key={item.id} id={item.id} lat={item.lat}
            lng={item.lng} text={item.text}
            openModal={(e) => props.openModal(e, item)}>
          </IntPlace>
        )) : null}
      </Map>
    </div>
  );
}
MapComponent.propTypes = {
  openModal: PropTypes.func,
  getLatLng: PropTypes.func,
  list: PropTypes.array,
  id: PropTypes.number,
  text: PropTypes.string,
};
