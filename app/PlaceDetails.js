import React, { Component } from 'react'
export default class MapComponent extends Component{
    render() {
        console.log("props",this.props)
        return (
        <div >
        {this.props.comms?this.props.comms.map((item) => (
            <div>
            <label>{item.markid === this.props.markid? item.comm : ""}</label>
            <br></br>
            </div>
        ),this) : <label></label>}
        </div>
        )
      }
} 