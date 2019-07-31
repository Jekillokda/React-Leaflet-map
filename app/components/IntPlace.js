import React, {PureComponent} from 'react';
import {Marker, Tooltip} from 'react-leaflet';
import PropTypes from 'prop-types';

export default class IntPlace extends PureComponent {
  constructor(props) {
    super(props);
  }
  onMarkerClicked(e) {
    this.props.openModal(e);
  }
  render() {
    return (
      <div>
        <Marker
          position={[this.props.lat, this.props.lng]}
          onClick = {(e) => this.onMarkerClicked(e, this.props.id)}>
          <Tooltip >{this.props.text}</Tooltip>
        </Marker>
      </div>
    );
  }
}
IntPlace.propTypes = {
  openModal: PropTypes.func,
  lat: PropTypes.number,
  lng: PropTypes.number,
  id: PropTypes.number,
  text: PropTypes.string,
};
