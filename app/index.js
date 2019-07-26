import React, { PureComponent  } from "react";
import ReactDOM from "react-dom";
import MapComponent from "./MapComponent";
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import PlaceDetails from './PlaceDetails';
import "./styles.css";
import 'react-sliding-pane/dist/react-sliding-pane.css';

class App extends PureComponent  {

  componentDidMount() {
    Modal.setAppElement(this.el);
  }
  
    constructor(props) {
        super(props)
        this.state = {
            markers: [[53.905216, 27.517687]],
            isPaneOpen: false,
        }
    }
    addMarker (e) {
        const {markers} = this.state
        markers.push(e.latlng)
        this.setState({markers})
      }
    openModal (){
      const {isPaneOpen} = this.state
      isPaneOpen = true
      this.setState({isPaneOpen})
    }
    
  render() {
    return (
      <div>
      <button onClick={ () => this.setState({ isPaneOpen: true }) }>
                    Click me to open pane
                </button>
      <MapComponent list = {this.state.markers} addMarker = {this.addMarker} openModal = {this.openModal}></MapComponent>
      <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isPaneOpen }
                title='Hey, it is optional pane title.'
                subtitle='Optional subtitle.'
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
