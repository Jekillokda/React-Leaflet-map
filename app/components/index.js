import React, { PureComponent  } from "react";
import ReactDOM from "react-dom";
import MapComponent from "./MapComponent";
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import PlaceDetails from './PlaceDetails';
import axios from 'axios'
import "../css/styles.css";
import 'react-sliding-pane/dist/react-sliding-pane.css';

import {MARKS_LOAD_URL, COMMENTS_LOAD_URL} from '../constants'
class App extends PureComponent  {

  componentDidMount() {
    Modal.setAppElement(this.el);
    this.loadMarks(MARKS_LOAD_URL);
    this.loadComments(COMMENTS_LOAD_URL);
  }
  
    constructor(props) {
        super(props)
        this.state = {
            markers: [],
            comments : [],
            isPaneOpen: false,
            paneText : "",
            paneSubtitle : "",
            paneMarkId : 0
        }
    }

    loadMarks(url){
      Modal.setAppElement(this.el);
      console.log("getMarks from", url)
        axios.get(url).then(res => {
          const marks = res.data;
          this.setState({ markers: marks});
        });
    }

    loadComments(url){
      console.log("getComments from", url)
      axios.get(url).then(res => {
        const comms = res.data;
        this.setState({ comments: comms});
      });
    }

    addMarker (e) {
        const {markers} = this.state
        markers.push(e.latlng)
        this.setState({markers})
      }

    openModal = (e, item) =>  {
      console.log("openModal", e, item)
      this.setState({
        isPaneOpen: true,
        paneText : item.text, 
        paneSubtitle : e.latlng.lat + " " + e.latlng.lng,
        paneMarkId : item.id
      })
    }
    
  render() {
    return (
      <div>
      <MapComponent list={this.state.markers} addMarker={this.addMarker} openModal={this.openModal}></MapComponent>
      <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isPaneOpen }
                title={this.state.paneText}
                subtitle={this.state.paneSubtitle}
                width='600px' 
                from='right'
                onRequestClose={ 
                  () => {this.setState({ isPaneOpen: false })
                }}>
                <PlaceDetails comms={this.state.comments} markid={this.state.paneMarkId}></PlaceDetails>
                <br />
            </SlidingPane>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
