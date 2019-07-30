import React, { Component  } from 'react'
import Rater from 'react-rater'

export default class Comment extends Component {
  render() {
    return (
    <div>
        <label>{this.props.comm}</label>
        <Rater total={5} rating={this.props.stars} interactive={false}/>
        <br></br>
    </div>
    )
  }
}