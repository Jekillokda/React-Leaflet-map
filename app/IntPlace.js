import React, { PureComponent  } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'

export default class IntPlace extends PureComponent {
constructor(props) {
    super(props)
    this.state = {
      id : 0,
      coord : [0,0],
      text : "qqq" 
    }
    this.setState({
      id : this.props.id,
      coord : [this.props.lat, this.props.lng],
      text : this.props.text
    })
}
onMarkerClicked(e){
  console.log("onMarkerClicked",e)
  this.props.openModal(e)
}
  render() {
    return (
    <div>
        <Marker 
        position={this.state.coord}
        onClick = {e => this.onMarkerClicked(e).bind(this)}>
        <Tooltip >{this.props.text}</Tooltip>
        </Marker>
      </div>
    )
  }
}