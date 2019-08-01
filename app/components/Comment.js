import React from 'react';
import Rater from 'react-rater';
import PropTypes from 'prop-types';

export default function Comment(props) {
  return (
    <div key={props.key}>
      <label>{props.comm}</label>
      <Rater total={5} rating={props.stars} interactive={false}/>
      <input type = 'submit' value = 'delete' onClick = {props.delComm}></input>
      <br/>
    </div>
  );
}
Comment.propTypes = {
  comm: PropTypes.string,
  stars: PropTypes.number,
  key: PropTypes.number,
  delComm: PropTypes.func,
};
