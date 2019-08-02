import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import MapComponent from './MapComponent';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import PlaceDetails from './PlaceDetails';
import Flexbox from 'flexbox-react';
import {axiosGet, axiosPost, axiosDelete} from '../Api/axios';
import ReactNotification from 'react-notifications-component';

import '../css/styles.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import 'react-notifications-component/dist/theme.css';

import {MARKERS_URL, COMMENTS_URL} from '../constants';

class App extends PureComponent {
  componentDidMount() {
    Modal.setAppElement('body');
    this.loadMarkers(MARKERS_URL);
    this.loadComments(COMMENTS_URL);
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
    };
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  loadMarkers(url) {
    console.log('getMarks from', url);
    axiosGet(url).then((res) => {
      this.setState({
        markers: res.data});
    }).catch((error) => {
      console.log(error.response);
      this.addNotification('danger', 'ERROR', error.response);
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
      this.addNotification('danger', 'ERROR', error.response);
    });
  }

  saveMarkers(url, marker) {
    axiosPost(url, marker).then((res) => {
      console.log(res);
      this.loadMarkers(url);
    }).catch((error) => {
      console.log(error.response);
      this.addNotification('danger', 'ERROR', error.response);
    });
  }

  saveComments(url, comm) {
    axiosPost(url, comm).then((res) => {
      console.log(res);
      this.loadComments(COMMENTS_URL);
    }).catch((error) => {
      console.log(error.response);
      this.addNotification('danger', 'ERROR', error.response);
    });
  }

  deleteComment = (e, id) =>{
    axiosDelete(COMMENTS_URL, id).then((res) => {
      console.log(res);
      this.loadComments(COMMENTS_URL);
    }).catch((error) => {
      console.log(error.response);
      this.addNotification('danger', 'ERROR', error.response);
    });
  }

  deleteMark = (e) =>{
    const commArr = this.state.comments.
        filter(((c) => c.markid === this.state.paneMarkId));
    console.log('comments', commArr);
    commArr.forEach((comm) => {
      this.deleteComment(e, comm.id);
    });
    console.log('deleteMark', this.state.paneMarkId);
    axiosDelete(MARKERS_URL, this.state.paneMarkId).then((res) => {
      console.log(res);
      this.loadMarkers(MARKERS_URL);
      this.setState({
        isPaneOpen: false,
      });
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
    this.saveMarkers(MARKERS_URL, newEl);
    this.setState({
      markers: markers,
      tmpLat: 0,
      tmpLng: 0,
      tmpName: ''});
    this.addNotification(
        'success', 'Marker added', 'id'+newEl.id+' '+newEl.text
    );
  }

  openModal = (e, item) => {
    this.setState( {
      isPaneOpen: true,
      paneText: 'id'+ item.id +' '+ item.text,
      paneSubtitle: e.latlng.lat +' '+ e.latlng.lng,
      paneMarkId: item.id,
    });
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
      dismissable: {click: true},
    });
  }

  addComm = (e, item) => {
    e.preventDefault();
    this.setState({
      comments: this.state.comments.concat(item),
    });
    console.log('commID', this.state.nextCommId);
    const newComm = {
      'markid': item.markid,
      'comm': item.comm,
      'stars': item.stars};
    this.saveComments(COMMENTS_URL, newComm);
    this.addNotification('success', 'Comment added', item.comm);
    this.setState({
      nextCommId: this.state.nextCommId+1,
    });
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
              onClick={this.deleteMark}/>
            <PlaceDetails
              comms={this.state.comments}
              id={this.state.paneMarkId}
              addComm={this.addComm}
              delComm={this.deleteComment}>
            </PlaceDetails>
          </div>
          <br/>
        </SlidingPane>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
