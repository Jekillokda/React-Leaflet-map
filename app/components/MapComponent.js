import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import IntPlace from './IntPlace';

export default class MapComponent extends Component{
constructor(props) {
    super(props)
    this.state = {
        markers: [], 
        lat: 53.8882647,
        lng: 27.5483184,
        zoom: 12
    }
    this.onMarkerClicked = this.onMarkerClicked.bind(this);
}
onMarkerClicked(e, item){
  this.props.openModal(e,item.item)
}
  render() {
    const startPosition = [this.state.lat, this.state.lng]
    return (
    <div >
      <Map center = {startPosition} zoom={this.state.zoom} onClick={ e => this.props.getLatLng(e)}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {this.props.list?this.props.list.map((item) => (
                    <IntPlace key={item.id} id={item.id} lat={item.lat} lng={item.lng} text={item.text} openModal={(e) => this.onMarkerClicked(e, {item})}></IntPlace>
                ),this) : null}
      </Map>
    </div>
    )
  }
}