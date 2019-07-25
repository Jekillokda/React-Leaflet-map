import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import IntPlace from './IntPlace';

export default class MapComponent extends Component{
constructor(props) {
    super(props)
    this.state = {
        markers: [[53.905216, 27.517687]], 
        lat: 53.8882647,
        lng: 27.5483184,
        zoom: 12
    }
}

addMarker (e) {
    const {markers} = this.state
    markers.push(e.latlng)
    this.setState({markers})
  }

onClickCircle () {
    this.setState(function(state) {
        return {
           clicked: state.clicked + 1
        }
    });
  }

  render() {
    const startPosition = [this.state.lat, this.state.lng]
    return (
    <div >
      <Map center = {startPosition} zoom = {this.state.zoom} onClick={this.addMarker.bind(this)} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.markers.map(function(item){
                return (
                    <IntPlace position = {item} text = {"112233"} text2 = {"AAaa"}></IntPlace>
                )
            
        })}
      </Map>
    </div>
    )
  }
}