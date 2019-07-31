import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components
import SideBar from './components/sidebar';
import Cart from './containers/cart';
import ProductList from './containers/product-list';

// CSS
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <h1 className="App-title">My simple shop</h1>
          </header>
          <div className="App-wrapper">
            <SideBar />
            <Route path="/" component={ProductList} />
            <Route path="/cart" component={Cart}/>
          </div>
        </Router>
      </div>
    );
  }
}
