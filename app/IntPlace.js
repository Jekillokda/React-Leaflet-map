import React, { PureComponent  } from 'react'
import {Marker, Popup, Tooltip } from 'react-leaflet'

export default class IntPlace extends PureComponent {
constructor(props) {
    super(props)
    this.state = { 
        lat: this.props.lat,
        lng: this.props.lon,
        text: this.props.text,
        text2: this.props.text2
    }
}
  render() {
    return (
    <div >
        <Marker 
        position={this.props.position}>
        <Tooltip>{this.state.text}</Tooltip>
          <Popup>
            {this.state.text2}
          </Popup>
        </Marker>
      </div>
    )
  }
}