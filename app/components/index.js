import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import MapComponent from './MapComponent';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import PlaceDetails from './PlaceDetails';
import Flexbox from 'flexbox-react';
import {loadMarkers, saveMarker, deleteMarker} from '../Api/axios/Markers';
import {loadComments, saveComment, deleteComment} from '../Api/axios/Comments';
import ReactNotification from 'react-notifications-component';

import '../css/styles.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import 'react-notifications-component/dist/theme.css';

import {MARKERS_URL, COMMENTS_URL} from '../constants';

class App extends PureComponent {
  componentDidMount() {
    Modal.setAppElement('body');
    this.loadM(MARKERS_URL);
    this.loadComms(COMMENTS_URL);
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
      tmpLng: 0};
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }
  loadM() {
    console.log('getMarkers');
    loadMarkers().then((markers) => {
      console.log('MARKERS', markers);
      this.setState({
        markers: markers});
    }).catch((error) => {
      console.log(error.response);
      this.addNotification('danger', 'ERROR', error.response);
    });
  }

  loadComms() {
    console.log('getComments');
    loadComments().then((comments) => {
      this.setState({comments: comments});
    }).catch((error) => {
      console.log(error.response);
      this.addNotification('danger', 'ERROR', error.response);
    });
  }

  saveM(marker) {
    saveMarker(marker).then((res) => {
      console.log(res);
      this.loadM();
    }).catch((error) => {
      console.log(error.response);
      this.addNotification('danger', 'ERROR', error.response);
    });
  }

  saveComm(comment) {
    saveComment(comment).then((res) => {
      console.log(res);
      this.loadComms();
    }).catch((error) => {
      console.log(error.response);
      this.addNotification('danger', 'ERROR', error.response);
    });
  }

  deleteComm = (e, id) =>{
    deleteComment(id).then((res) => {
      console.log(res);
      this.loadComms();
      this.addNotification('success', 'Comment deleted', ' ');
    }).catch((error) => {
      console.log(error.response);
      this.addNotification('danger', 'ERROR', error.response);
    });
  }

  deleteM = (e) =>{
    const commArr = this.state.comments.
        filter(((c) => c.markid === this.state.paneMarkId));
    console.log('comments', commArr);
    commArr.forEach((comm) => {
      console.log('trDel', comm);
      this.deleteComm(e, comm.id);
    });
    console.log('deleteMark', this.state.paneMarkId);
    deleteMarker(this.state.paneMarkId).then((res) => {
      console.log(res);
      this.loadM();
      this.setState({isPaneOpen: false});
      this.addNotification('success', 'Marker deleted', ' ');
    }).catch((error) => {
      console.log(error.response);
      this.addNotification('danger', 'ERROR', error.response);
    });
  }

  getLatLng = (e) => {
    this.setState({
      tmpLat: e.latlng.lat, tmpLng: e.latlng.lng});
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
      'lat': this.state.tmpLat,
      'lng': this.state.tmpLng,
      'text': this.state.tmpName};
    markers.push(newEl);
    this.saveM(newEl);
    this.setState({
      markers: markers,
      tmpLat: 0,
      tmpLng: 0,
      tmpName: ''});
    this.addNotification('success', 'Marker added', newEl.text);
  }

  openModal = (e, item) => {
    this.setState( {
      isPaneOpen: true,
      paneText: 'id'+ item.id +' '+ item.text,
      paneSubtitle: e.latlng.lat +' '+ e.latlng.lng,
      paneMarkId: item.id});
  }

  addNotification(type, title, text) {
    this.notificationDOMRef.current.addNotification({
      title: title,
      message: text,
      type: type,
      insert: 'top',
      container: 'top-left',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: {duration: 2000},
      dismissable: {click: true}});
  }

  addComm = (e, item) => {
    e.preventDefault();
    this.setState({
      comments: this.state.comments.concat(item),
    });
    const newComm = {
      'markid': item.markid,
      'comm': item.comm,
      'stars': item.stars};
    this.saveComm(newComm);
    this.addNotification('success', 'Comment added', item.comm);
  }

  render() {
    return (
      <div>
        <ReactNotification ref={this.notificationDOMRef}/>
        <Flexbox flexDirection='column' minHeight='100vh'>
          <Flexbox flexGrow={1}>
            <MapComponent list={this.state.markers}
              getLatLng={this.getLatLng} openModal={this.openModal}>
            </MapComponent>
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
          isOpen={this.state.isPaneOpen}
          title={this.state.paneText}
          subtitle={this.state.paneSubtitle}
          width='600px'
          from='right'
          onRequestClose={ () => {
            this.setState({isPaneOpen: false});
          }}>
          <div>
            <input type='submit' value='deleteMarker'
              onClick={this.deleteM}/>
            <PlaceDetails
              comms={this.state.comments}
              id={this.state.paneMarkId}
              addComm={this.addComm}
              delComm={this.deleteComm}>
            </PlaceDetails>
          </div>
          <br/>
        </SlidingPane>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
