import React, { PureComponent  } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'

export default class IntPlace extends PureComponent {
constructor(props) {
    super(props)
    this.state = { 
    }
}
  render() {
    return (
    <div>
        <Marker 
        position={this.props.position}>
        <Tooltip onClick = {this.props.openModal}>{this.props.tooltipText}</Tooltip>
        </Marker>
      </div>
    )
  }
}