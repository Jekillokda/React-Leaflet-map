import React, {Component} from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Comment from './Comment';
import PropTypes from 'prop-types';
export default class PlaceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newcomments: [],
      tmpComm: '',
      tmpStars: 0,
      nextID: this.props.comms.length,
    };
  }
  onCommChange(e) {
    this.setState({tmpComm: e.target.value});
  }
  onRateChange(e) {
    this.setState({tmpStars: e.rating});
  }
  AddComment = (e) => {
    e.preventDefault();
    const t = this.state.newcomments;
    const ncomm = {
      'id': this.state.nextID,
      'markid': this.props.id,
      'comm': this.state.tmpComm,
      'stars': this.state.tmpStars};
    this.props.addComm(e, ncomm);
    t.push(ncomm);
    this.setState({
      newcomments: t,
      tmpComm: '',
      tmpStars: 0,
      nextID: this.state.nextID+1,
    });
  }
  render() {
    const arr = this.props.comms.filter((c) => c.markid === this.props.id);
    const avgMark = arr.length>0? this.getAvg(arr) : 0;
    return (
      <div>
        <label>Average Mark: </label>
        <Rater total={5} rating={avgMark} interactive={false} />
        <br />
        {arr.length>0?arr.map((item) => (
          <Comment key={item.id} comm={item.comm}
            stars = {item.stars}></Comment>
        ), this) : <label>no comments</label>}
        <form>
          <label>Комментарий:
            <input type='text' name='name'
              value = {this.state.tmpComm}
              onChange = {(e) =>this.onCommChange(e)} />
          </label>
          <label>Оценка:
            <Rater total={5} rating={this.state.tmpStars}
              onRate = {(e) =>this.onRateChange(e)} />
          </label>
          <input type='submit' value='Сохранить' onClick = {this.AddComment}/>
        </form>
      </div>
    );
  }
  getAvg(arr) {
    let sum = 0;
    for (let i=0; i<arr.length; i++) {
      sum+= arr[i].stars;
    }
    sum/= arr.length;
    return sum;
  }
}
PlaceDetails.propTypes = {
  id: PropTypes.number,
  addComm: PropTypes.func,
  comms: PropTypes.array,
  markid: PropTypes.number,
  text: PropTypes.string,
};
