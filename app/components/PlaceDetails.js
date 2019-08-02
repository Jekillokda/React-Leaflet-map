import React, {useState} from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Comment from './Comment';
import PropTypes from 'prop-types';

export default function PlaceDetails(props) {
  const [newcomments, addNewComment] = useState([]);
  const [tmpComm, editComm] = useState('');
  const [tmpStars, editStars] = useState(0);
  const [comms, updateComms] = useState([]);
  const getAvg = (arr) => {
    let sum = 0;
    for (let i=0; i<arr.length; i++) {
      sum+= arr[i].stars;
    }
    return sum/= arr.length;
  };
  const addComment = (e) => {
    e.preventDefault();
    if (tmpComm.length>0) {
      const ncomm = {
        'markid': props.id,
        'comm': tmpComm,
        'stars': tmpStars};
      props.addComm(e, ncomm);
      addNewComment(newcomments.concat(ncomm));
      editComm('');
      editStars(0);
    }
  };
  const delComment = (e, item) =>{
    props.delComm(e, item);
  };
  if (comms!==props.comms) {
    updateComms(props.comms);
  }
  const arr = comms.filter((c) => c.markid === props.id);
  return (
    <div>
      <label>Average Mark: </label>
      <Rater total={5}
        rating={arr.length>0? getAvg(arr) : 0} interactive={false}/>
      <br/>
      {arr.length>0?arr.map((item, idx) => (
        <Comment key={idx} comm={item.comm}
          stars = {item.stars}
          delComm = {(e) => delComment(e, item.id)}/>
      )) : <label>no comments</label>}
      <form>
        <label>Комментарий:
          <input type='text' name='name' value={tmpComm}
            onChange = {(e) =>editComm(e.target.value)}/>
        </label>
        <label>Оценка:
          <Rater total={5} rating={tmpStars}
            onRate = {(e) =>editStars(e.rating)}/>
        </label>
        <input type='submit' value='Сохранить' onClick={addComment}/>
      </form>
    </div>
  );
}
PlaceDetails.propTypes = {
  id: PropTypes.number,
  addComm: PropTypes.func,
  delComm: PropTypes.func,
  comms: PropTypes.array,
  markid: PropTypes.number,
  text: PropTypes.string,
};
