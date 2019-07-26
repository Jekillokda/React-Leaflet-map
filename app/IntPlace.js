import React, { PureComponent  } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'

export default class IntPlace extends PureComponent {
constructor(props) {
    super(props)
    this.state = { 
    }
}
onMarkerClicked(e){
  console.log("onMarkerClicked",e)
  this.props.openModal(e)
}
  render() {
    return (
    <div>
        <Marker 
        position={this.props.position}
        onClick = {e => this.onMarkerClicked(e).bind(this)}>
        <Tooltip >{this.props.tooltipText}</Tooltip>
        </Marker>
      </div>
    )
  }
}