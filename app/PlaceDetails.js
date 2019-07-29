import React, { Component } from 'react'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
export default class MapComponent extends Component{
    render() {
        console.log("props",this.props)
        const arr = this.props.comms.filter(comm => comm.markid === this.props.markid);
        return (
        <div >
        {arr.length>0?arr.map((item) => (
            <div>
            <label>{item.comm}</label>
            <Rater total={5} rating={item.stars} />
            <br></br>
            </div>
        ),this) : <label></label>}
        </div>
        )
      }
} 