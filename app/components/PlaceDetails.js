import React, { Component } from 'react'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import Comment from './Comment'
export default class MapComponent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            newcomments : [],
            tmpComm: '',
            tmpStars: 0,
            tmpID : 0
        }
    }
    onCommChange = (e) =>{
        this.setState({tmpComm : e.target.value})
    }
    onRateChange = (e) =>{
        this.setState({tmpStars : e.rating})
    }
    AddComment = (e)=>{
    e.preventDefault(); 
    console.log('addComm',this.props.markid, this.state.tmpComm, this.state.tmpStars)
    var t = this.state.newcomments;
    const ncomm = {'markid' : this.props.markid, 'comm' : this.state.tmpComm, 'stars' : this.state.tmpStars}
    this.props.addComm(e,ncomm)
    t.push(ncomm)
    this.setState({
        newcomments : t,
        tmpComm : '',
        tmpStars : 0
    })
    console.log('newcomms', this.state.newcomments)
    }
    render() {
        const arr = this.props.comms.filter(comm => comm.markid === this.props.markid);
        console.log("arr",arr)
        const avgMark = arr.length>0? this.getAvg(arr) : 0;
        return (
        <div>
        <label>Average Mark: </label> 
        <Rater total={5} rating={avgMark} interactive={false} />
        <br />
        {arr.length>0?arr.map((item) => (
            <Comment comm = {item.comm} stars = {item.stars}></Comment>
        ),this) : <label>no comments</label>}
        <form>
              <label>
                Комментарий:
                <input  type='text' name='name' value = {this.state.tmpComm} onChange = {e =>this.onCommChange(e)} />
              </label>
              <label>
                Оценка:
                <Rater total={5} rating={this.state.tmpStars} onRate = {e =>this.onRateChange(e)} />
              </label>
              <input type='submit' value='Сохранить' onClick = {this.AddComment}/>
            </form> 
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