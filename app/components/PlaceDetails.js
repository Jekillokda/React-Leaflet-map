import React, {useState} from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Comment from './Comment';
import PropTypes from 'prop-types';

export default function PlaceDetails(props) {
  const [newcomments, addNewComment] = useState([]);
  const [tmpComm, editComm] = useState('');
  const [tmpStars, editStars] = useState(0);
  const [nextID, changeNextId] = useState(props.comms.length+1);
  const getAvg = (arr) => {
    let sum = 0;
    for (let i=0; i<arr.length; i++) {
      sum+= arr[i].stars;
    }
    sum/= arr.length;
    return sum;
  };
  const AddComment = (e) => {
    e.preventDefault();
    const ncomm = {
      'id': nextID,
      'markid': props.id,
      'comm': tmpComm,
      'stars': tmpStars};
    props.addComm(e, ncomm);
    addNewComment(newcomments.push(ncomm));
    editComm('');
    editStars(0);
    changeNextId(nextID+1);
  };
  const arr = props.comms.filter((c) => c.markid === props.id);
  return (
    <div>
      <label>Average Mark: </label>
      <Rater total={5}
        rating={arr.length>0? getAvg(arr) : 0}
        interactive={false}/>
      <br/>
      {arr.length>0?arr.map((item) => (
        <Comment key={item.id} comm={item.comm}
          stars = {item.stars}></Comment>
      )) : <label>no comments</label>}
      <form>
        <label>Комментарий:
          <input type='text' name='name'
            value = {tmpComm}
            onChange = {(e) =>editComm(e.target.value)}/>
        </label>
        <label>Оценка:
          <Rater total={5} rating={tmpStars}
            onRate = {(e) =>editStars(e.rating)}/>
        </label>
        <input type='submit' value='Сохранить' onClick = {AddComment}/>
      </form>
    </div>
  );
}
PlaceDetails.propTypes = {
  id: PropTypes.number,
  addComm: PropTypes.func,
  comms: PropTypes.array,
  markid: PropTypes.number,
  text: PropTypes.string,
};
