import React, {Component} from 'react';
import Rater from 'react-rater';
import PropTypes from 'prop-types';

export default class Comment extends Component {
  render() {
    return (
      <div>
        <label>{this.props.comm}</label>
        <Rater total={5} rating={this.props.stars} interactive={false}/>
        <br></br>
      </div>
    );
  }
}
Comment.propTypes = {
  comm: PropTypes.string,
  stars: PropTypes.number,
};
