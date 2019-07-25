import React, { PureComponent  } from "react";
import ReactDOM from "react-dom";
import MapComponent from "./map";
import PlaceList from "./PlaceList";
import Flexbox from 'flexbox-react';

import "./styles.css";

class App extends PureComponent  {

  render() {
    const list = [
        {lat : 53.905216, lon : 27.517687, text : "aaa"},
        {lat : 53.932153, lon : 27.582082, text : "bbb"},
        {lat : 53.857516, lon : 27.550375, text : "ccc"},
    ]
    return (
      <div>
        <Flexbox flexDirection="column" minHeight="100vh">
            <Flexbox flexGrow={1}>
                <MapComponent list = {list}></MapComponent>
                <PlaceList list = {list}></PlaceList>
            </Flexbox>
        </Flexbox>
      </div>
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
