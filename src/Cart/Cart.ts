import React, { Component } from 'react';
// import logo from './../logo.svg';
import './../App.css';

class Cart extends Component {

  render() {
    const cart = this.props.cart;
    let allBeers = this.props.beers;
    allBeers = allBeers.filter(function(el){return cart.indexOf((el.id).toString()) > -1})

    let key = 0;
    let keyValue = function(){
      return key++;
    }

    return (
      <div className="cart-list">
         {allBeers.map(el => <div className="cart-item" key = {keyValue()}><div className="cart-item-title">{el.name}</div><div className="quantity">ABV: {el.abv}</div></div>)}

      </div>
    )
  }
}

export default Cart;
