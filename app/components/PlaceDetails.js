import React, { Component } from 'react'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
export default class MapComponent extends Component{
    render() {
        const arr = this.props.comms.filter(comm => comm.markid === this.props.markid);
        const avgMark = arr.length>0? this.getAvg(arr) : 0;
        
        return (
        <div >
        <label>Average Mark: </label> 
        <Rater total={5} rating={avgMark} interactive={false} />
        {arr.length>0?arr.map((item) => (
            <div>
            <label>{item.comm}</label>
            <Rater total={5} rating={item.stars} interactive={false} />
            <br></br>
            </div>
        ),this) : <label>no comments</label>}
        </div>
        )
    }
    getAvg(arr){
        var sum = 0;
        for (var i=0;i<arr.length;i++)
        sum+= arr[i].stars;
        sum/= arr.length;
        return sum;
    }
} 