import React, { PureComponent  } from 'react'
import { Marker, Tooltip } from 'react-leaflet'

export default class IntPlace extends PureComponent {
constructor(props) {
    super(props)
}
onMarkerClicked(e){
  console.log("onMarkerClicked",e)
  this.props.openModal(e)
}
  render() {
    return (
    <div>
        <Marker 
        position={[this.props.lat,this.props.lng]}
        onClick = {e => this.onMarkerClicked(e,this.props.id)}>
        <Tooltip >{this.props.text}</Tooltip>
        </Marker>
      </div>
    )
  }
}