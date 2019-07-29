import React, { PureComponent  } from "react";
import ReactDOM from "react-dom";
import MapComponent from "./MapComponent";
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import PlaceDetails from './PlaceDetails';
import axios from 'axios'
import "./styles.css";
import 'react-sliding-pane/dist/react-sliding-pane.css';

import {MARKS_LOAD_URL, COMMENTS_LOAD_URL} from './constants'
class App extends PureComponent  {

  componentDidMount() {
    Modal.setAppElement(this.el);
    console.log("getMarks", MARKS_LOAD_URL)
      axios.get(MARKS_LOAD_URL).then(res => {
        const marks = res.data;
        this.setState({ markers: marks});
      });
    console.log("getComments", COMMENTS_LOAD_URL)
      axios.get(COMMENTS_LOAD_URL).then(res => {
        const comms = res.data;
        this.setState({ comments: comms});
      });
      console.log("comms", this.state.comments)
  }
  
    constructor(props) {
        super(props)
        this.state = {
            markers: [],
            comments : [],
            isPaneOpen: false,
            paneText : "",
            paneSubtitle : "",
            paneMarkId : []
        }
    }

    addMarker (e) {
        const {markers} = this.state
        markers.push(e.latlng)
        this.setState({markers})
      }

    openModal = (e, id) =>  {
      console.log("openModal", e, id)
      this.setState({
        isPaneOpen: true,
        paneText : e.latlng.lat + " " + e.latlng.lng,
        paneMarkId : id
      })
    }
    
  render() {
    return (
      
      <div>
      <MapComponent list = {this.state.markers} addMarker = {this.addMarker} openModal = {this.openModal}></MapComponent>
      <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isPaneOpen }
                title={this.state.paneText}
                subtitle={this.state.paneSubtitle}
                width='600px' 
                from='right'
                onRequestClose={ () => {
                    this.setState({ isPaneOpen: false });
                } }>
                <PlaceDetails comms = {this.state.comments} markid = {this.state.paneMarkId}></PlaceDetails>
                <br />
            </SlidingPane>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
