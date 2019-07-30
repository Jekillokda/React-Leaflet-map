import React, { PureComponent  } from 'react';
import ReactDOM from 'react-dom';
import MapComponent from './MapComponent';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import PlaceDetails from './PlaceDetails';
import axios from 'axios'
import Flexbox from 'flexbox-react';

import '../css/styles.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import {MARKS_LOAD_URL, COMMENTS_LOAD_URL} from '../constants'

class App extends PureComponent  {

  componentDidMount() {
    Modal.setAppElement('body');
    this.loadMarkers(MARKS_LOAD_URL);
    this.loadComments(COMMENTS_LOAD_URL);
    console.log("comms", this.state.comments)
  }
    constructor(props) {
        super(props)
        this.state = {
            markers: [],
            comments : [],
            isPaneOpen: false,
            paneText : '',
            paneSubtitle : '',
            paneMarkId : 0,
            tmpName: '',
            tmpLat : 0,
            tmpLng : 0,
            nextId : 0
        }
    }

    loadMarkers(url){
      Modal.setAppElement(this.el);
      console.log('getMarks from', url)
        axios.get(url).then(res => {
          const marks = res.data;
          this.setState({ markers: marks,
          nextId :marks.length});
        });
    }

    loadComments(url){
      console.log('getComments from', url)
      axios.get(url).then(res => {
        const comms = res.data;
        this.setState({ comments: comms});
      });
    }

    getLatLng = (e) =>{
      this.setState({ 
        tmpLat : e.latlng.lat,
        tmpLng : e.latlng.lng});
      }

      onMarkNameChange = (e) =>{
      this.setState({tmpName : e.target.value})
      }

      onMarkLatChange = (e) =>{
      this.setState({tmpLat : e.target.value})
      }

      onMarkLngChange = (e) =>{
        this.setState({tmpLng : e.target.value})
      }

      AddMarker =(e) =>{
        e.preventDefault(); 
        const {markers} = this.state
        const newEl = {'id' : this.state.nextId,'lat' : this.state.tmpLat, 'lng' : this.state.tmpLng, 'text' : this.state.tmpName}
        markers.push(newEl);

        this.setState({
          markers : markers,
          tmpLat : 0,
          tmpLng : 0,
          tmpName : '',
          nextId : this.state.nextId +1})
      }

    openModal = (e, item) =>  {
      this.setState({
        isPaneOpen: true,
        paneText : item.text +' ' + item.id, 
        paneSubtitle : e.latlng.lat + ' ' + e.latlng.lng,
        paneMarkId : item.id
      })
    }
    addComm = (e, item) =>  {
      console.log("ITMEMEMEMEMEM", item)
      var comms = this.state.comments.concat(item)
      this.setState({
        comments : comms
      })
    }
    
  render() {    console.log("comms", this.state.comments)
    return (
      <div>
        <Flexbox flexDirection='column' minHeight='100vh'>
          <Flexbox flexGrow={1}>
            <MapComponent list={this.state.markers} getLatLng={this.getLatLng} openModal={this.openModal}></MapComponent>
          </Flexbox>
          <Flexbox flexGrow={1}> 
            <form>
              <label>
                 Название:<input  type='text' name='name' value={this.state.tmpName} onChange={e =>this.onMarkNameChange(e)} />
              </label>
              <label>
                 Широта:<input value ={this.state.tmpLat} type='text' name='name' onChange={e =>this.onMarkLatChange(e)} />
              </label>
              <label>Долгота:<input value ={this.state.tmpLng} type='text' name='name' onChange={e =>this.onMarkLngChange(e)} />
              </label>
              <input type='submit' value='Добавить' onClick={this.AddMarker}/>
            </form>   
          </Flexbox> 
        </Flexbox>
        <SlidingPane
          isOpen={ this.state.isPaneOpen }
          title={this.state.paneText}
          subtitle={this.state.paneSubtitle}
          width='600px' 
          from='right'
          onRequestClose={ 
            () => {this.setState({ isPaneOpen: false })
          }}>
            <PlaceDetails comms={this.state.comments} markid={this.state.paneMarkId} addComm={this.addComm}></PlaceDetails>
            <br />
        </SlidingPane> 
      </div>
    )
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
