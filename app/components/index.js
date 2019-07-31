import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import MapComponent from './MapComponent';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import PlaceDetails from './PlaceDetails';
import Flexbox from 'flexbox-react';
import {axiosGet, axiosPost} from '../Api/axios';

import '../css/styles.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';

import {MARKERS_URL, COMMENTS_URL} from '../constants';

class App extends PureComponent {
  componentDidMount() {
    Modal.setAppElement('body');
    this.loadMarkers(MARKERS_URL);
    this.loadComments(COMMENTS_URL);
    console.log('comms', this.state.comments);
  }
  constructor(props) {
    super(props);
    Modal.setAppElement(this.el);
    this.state = {
      markers: [],
      comments: [],
      isPaneOpen: false,
      paneText: '',
      paneSubtitle: '',
      paneMarkId: 0,
      tmpName: '',
      tmpLat: 0,
      tmpLng: 0,
      nextId: 0,
    };
  }

  loadMarkers(url) {
    console.log('getMarks from', url);
    axiosGet(url).then((res) => {
      this.setState({
        markers: res.data,
        nextId: res.data.length});
    }).catch((error) => {
      console.log(error.response);
    });
  }

  loadComments(url) {
    console.log('getComments from', url);
    axiosGet(url).then((res) => {
      this.setState({
        comments: res.data,
      });
    }).catch((error) => {
      console.log(error.response);
    });
  }

  saveMarkers(url, marker) {
    axiosPost(url, marker).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error.response);
    });
  }

  saveComments(url, comm) {
    console.log('save comm', url, comm);
    axiosPost(url, comm).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error.response);
    });
  }

  getLatLng = (e) => {
    this.setState({
      tmpLat: e.latlng.lat,
      tmpLng: e.latlng.lng});
  }

  onMarkNameChange = (e) => {
    this.setState({tmpName: e.target.value});
  }

  onMarkLatChange = (e) => {
    this.setState({tmpLat: e.target.value});
  }

  onMarkLngChange = (e) => {
    this.setState({tmpLng: e.target.value});
  }

  AddMarker = (e) => {
    e.preventDefault();
    const {markers} = this.state;
    const newEl = {
      'id': this.state.nextId,
      'lat': this.state.tmpLat,
      'lng': this.state.tmpLng,
      'text': this.state.tmpName};
    markers.push(newEl);
    this.saveMarkers(MARKERS_URL, newEl);
    this.setState({
      markers: markers,
      tmpLat: 0,
      tmpLng: 0,
      tmpName: '',
      nextId: this.state.nextId +1});
  }

  openModal = (e, item) => {
    this.setState( {
      isPaneOpen: true,
      paneText: item.text +' ' + item.id,
      paneSubtitle: e.latlng.lat + ' ' + e.latlng.lng,
      paneMarkId: item.id,
    });
  }
  addComm = (e, item) => {
    e.preventDefault();
    console.log('AddCommlItem', item);
    this.setState({
      comments: this.state.comments.concat(item),
    });
    const newComm = {
      'id': item.id,
      'markid': item.markid,
      'comm': item.comm,
      'stars': item.stars};
    this.saveComments(COMMENTS_URL, newComm);
  }
  render() {
    return (
      <div>
        <Flexbox flexDirection='column' minHeight='100vh'>
          <Flexbox flexGrow={1}>
            <MapComponent list={this.state.markers}
              getLatLng={this.getLatLng}
              openModal={this.openModal}></MapComponent>
          </Flexbox>
          <Flexbox flexGrow={1}>
            <form>
              <label>Название:
                <input type='text'
                  name='name'
                  value={this.state.tmpName}
                  onChange={(e) =>this.onMarkNameChange(e)}/>
              </label>
              <label>Широта:
                <input value ={this.state.tmpLat}
                  type='text'
                  name='name'
                  onChange={(e) =>this.onMarkLatChange(e)}/>
              </label>
              <label>Долгота:
                <input value ={this.state.tmpLng}
                  type='text'
                  name='name'
                  onChange={(e) =>this.onMarkLngChange(e)}/>
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
            () => {
              this.setState({isPaneOpen: false});
            }}>
          <PlaceDetails
            comms={this.state.comments}
            id={this.state.paneMarkId}
            addComm={this.addComm}>
          </PlaceDetails>
          <br />
        </SlidingPane>
      </div>
    );
  }
}
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
