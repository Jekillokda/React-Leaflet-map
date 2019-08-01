import React from 'react';
import {Marker, Tooltip} from 'react-leaflet';
import PropTypes from 'prop-types';

export default function IntPlace(props) {
  return (
    <div>
      <Marker
        position={[props.lat, props.lng]}
        onClick = {(e) => props.openModal(e, props.id)}>
        <Tooltip>
          {props.text}
        </Tooltip>
      </Marker>
    </div>
  );
}
IntPlace.propTypes = {
  openModal: PropTypes.func,
  lat: PropTypes.number,
  lng: PropTypes.number,
  id: PropTypes.number,
  text: PropTypes.string,
};
