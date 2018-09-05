import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './List-item/List-item';
import Header from './Header/Header';
import Details from './Details/Details';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      beers: [],
      allBeers:[],
      cart:[],
      showImage : false,
      imageIndex: 0
    };

    if(sessionStorage.getItem("cart")){
      this.state.cart = JSON.parse(sessionStorage.getItem("cart"));
    }
  }

  componentDidMount() {
    var that = this;
    fetch('beercraft.json').then(function (response) {
        return response.json();
      }).then(function (result) {
        that.setState({ beers: result});
        that.setState({ allBeers: JSON.parse(JSON.stringify(result))});
      });
  }

  handler(data) {
    this.setState({
        beers: data
    });
  }


  handleIndex(id) {
    console.log(id);
    this.setState({
        selectedBeer: id
    });
  }

  addItem(){
    this.setState({
        cart: this.state.cart.concat([this.state.selectedBeer])
    });
    console.log(this.state.cart);
    let that = this;
    setTimeout(function(){
      sessionStorage.setItem("cart", JSON.stringify(that.state.cart));
    }, 1000);
  }

  emptyCart(){
    this.setState({
        cart:[]
    });
    sessionStorage.clear();
  }

  handleImage(flag, index){
    this.setState({
      showImage: true,
      imageIndex: index
    })
  }

  render() {
    let key = 0;
    let keyValue = function(){
      return key++;
    }

    return (
      <div className = "App">
        <Header beers = {this.state.beers} allBeers = {this.state.allBeers} handler = {this.handler.bind(this)} cart = {this.state.cart} emptyCart = {this.emptyCart.bind(this)}/>
        <div className = "details-pane">
          <Details addItem = {this.addItem.bind(this)} showImage = {this.state.showImage} imageIndex = {this.state.imageIndex} />
        </div>
        <div className = "list-pane">
          {this.state.beers.map(beer => <ListItem key = {keyValue()} beer = {beer} handleIndex = {this.handleIndex.bind(this)} handleImage = {this.handleImage.bind(this)}/>)}
          {(!this.state.beers ||  !this.state.beers.length)  && <div className= "no-data">No results found</div>}
        </div>
      </div>
    );
  }
}

export default App;
