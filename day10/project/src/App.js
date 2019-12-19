import React, { Component } from 'react';
import routerlist from "./router/routerlist"
import RouterView from "./router/RouterView"
import {BrowserRouter} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <RouterView  routes={routerlist}>
        </RouterView>
      </BrowserRouter>
    );
  }
}

export default App;