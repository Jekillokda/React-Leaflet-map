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
    this.setState({
    markers : this.props.lists})
}
onMarkerClicked(e){
  console.log("onMarkerClickedinMap",e)
  this.props.openModal(e)
}
  render() {
    const startPosition = [this.state.lat, this.state.lng]
    return (
    <div >
      <Map center = {startPosition} zoom = {this.state.zoom} onClick={this.props.addMarker.bind(this)}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.markers.map(function(item,e){
                return (
                    <IntPlace id = {item.id} lat = {item.lat} lng = {item.lng} text = {item.text} openModal = { e =>this.onMarkerClicked(e,item)}></IntPlace>
                )
        },this)}
      </Map>
    </div>
    )
  }
}