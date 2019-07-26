import React, { PureComponent  } from "react";
import ReactDOM from "react-dom";
import MapComponent from "./MapComponent";
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import PlaceDetails from './PlaceDetails';
import axios from 'axios'
import "./styles.css";
import 'react-sliding-pane/dist/react-sliding-pane.css';

class App extends PureComponent  {

  componentDidMount() {
    Modal.setAppElement(this.el);
  }
  
    constructor(props) {
        super(props)
        this.state = {
            markers: [],
            isPaneOpen: false,
            paneText : "",
            paneSubtitle : ""
        }
          this.openModal = this.openModal.bind(this)
    }
    addMarker (e) {
        const {markers} = this.state
        markers.push(e.latlng)
        this.setState({markers})
      }
    openModal (e){
      this.setState({
        isPaneOpen: true,
        paneText : e.latlng.lat + " " + e.latlng.lng,
        paneSubtitle : e.text
      })
    }
    
    getMarksFromJSON(){
      console.log("getMarks")
      axios.get('http://localhost:3000/marks').then(res => {
        const marks = res.data;
        this.setState({ markers: marks});
      });
    }
    
  render() {
    return (
      <div>
      <button onClick={this.getMarksFromJSON.bind(this) }>
        get
      </button>
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
                <PlaceDetails text = {'112233'}></PlaceDetails>
                <br />
            </SlidingPane>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
