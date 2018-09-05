import React, { Component } from 'react';
// import logo from './../logo.svg';
import './Header.css';
import {debounce} from 'throttle-debounce';
import Cart from './../Cart/Cart';

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHidden: true,
      typeingOn: false,
      hideCart:true,
      suggestions:[],
      // cart: props.cart,
      types:[]
    }
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  sortArray(arr, param, flag){
    var sortParam;
    if(flag){
      sortParam = function(a,b){return b[param] - a[param]};
    } else {
      sortParam = function(a,b){return a[param] - b[param]};
    }
    arr = arr.sort(sortParam);
    return arr;
  }

  filterArr(arr, param){
    arr = arr.filter(function (el){
      return el.style.indexOf(param) > -1;
    })
    return arr;
  }

  searchArrayByName(searchString){
    this.props.handler(this.props.allBeers);
    let result = this.props.beers.filter(function (el){
      return el.name.indexOf(searchString) > -1;
    })
    this.props.handler(result);
  }

  typeFilter(e){
    this.state.types.push(e.target.value);
    let result = [];
    for(let param of this.state.types){
      this.props.handler(this.props.allBeers);
      console.log(param + " Parma");
      console.log(this.props.beers);
      result = result.concat(this.filterArr(this.props.beers, param));
      console.log(result);
    }
    this.props.handler(result);
  }

  decreasingSortCall(){
    let result = this.sortArray(this.props.beers, 'abv', true);
    this.props.handler(result);
  }

  increasingSortCall(){
    let result = this.sortArray(this.props.beers, 'abv', false);
    this.props.handler(result);
  }

  fetchSuggestions(e){
    e.persist();
    debounce(500, () => {
      if(e.which == 13){
        this.searchArrayByName(e.target.value);
      }
    })()
  }

  showCart(){
    this.setState({
      hideCart: !this.state.hideCart
    })
  }

  close(){
    this.setState({
      hideCart: !this.state.hideCart
    })
  }

  successResponse(){
    document.getElementById("cart-modal").innerHTML =
    `<div className = "success-div" style = "padding: 30px;text-align: center;">
          <img src = "images/success.png" alt = "" style = "height: 40px;"/>
          <span>Your order has been placed successfully.</span>
        </div>`;
    let that = this;
    setTimeout(function(){
      that.setState({
        hideCart: !that.state.hideCart
      })
    }, 1500);
    this.props.emptyCart();
  }

  render() {
    let key = 0;
    let keyValue = function(){
      return key++;
    }

    return (
      <div className="top-header">
        <div className = "logo-container">
          <img src="images/logo.png" alt=""/>
        </div>

        <div className = "search-container">
          <input type = "text" id = "search-input" placeholder = "Search Happiness" onKeyUp = {this.fetchSuggestions.bind(this)}/>
          {this.state.typeingOn &&
            <div className='pop-list'>
              {this.state.suggestions.map(suggestion => <div className = "each-suggestion">{suggestion}</div>)}
            </div>
          }
        </div>
        <div className = "icon-container">
          <img src="images/filter.png" alt="" onClick={this.toggleHidden.bind(this)}/>
          {!this.state.isHidden &&
            <div className='pop-list'>
              <div className = "filter-item" onClick = {this.increasingSortCall.bind(this)}>Increasing Alcohol Content</div>
              <div className = "filter-item" onClick = {this.decreasingSortCall.bind(this)}>Decreasing Alcohol content</div>
              <div className = "filter-item">Beer Style
                <div className=''>
                  <div className = "beer-item"><input type="checkbox" value = "Lager" onChange = {this.typeFilter.bind(this)}/>Lager</div>
                  <div className = "beer-item"><input type="checkbox" value = "Ale" onChange = {this.typeFilter.bind(this)}/>Ale</div>
                  <div className = "beer-item"><input type="checkbox" value = "IPA" onChange = {this.typeFilter.bind(this)}/>IPA</div>
                  <div className = "beer-item"><input type="checkbox" value = "Mead" onChange = {this.typeFilter.bind(this)}/>Mead</div>
                  <div className = "beer-item"><input type="checkbox" value = "Stout" onChange = {this.typeFilter.bind(this)}/>Stout</div>
                  <div className = "beer-item"><input type="checkbox" value = "Porter" onChange = {this.typeFilter.bind(this)}/>Porter</div>
                  <div className = "beer-item"><input type="checkbox" value = "Cider" onChange = {this.typeFilter.bind(this)}/>Cider</div>
                  <div className = "beer-item"><input type="checkbox" value = "Barleywine" onChange = {this.typeFilter.bind(this)}/>Barleywine</div>
                  <div className = "beer-item"><input type="checkbox" value = "Weissbier" onChange = {this.typeFilter.bind(this)}/>Weissbier</div>
                </div>
              </div>
            </div>
          }
          <img src="images/cart.png" alt="" onClick = {this.showCart.bind(this)}/>
          {(this.props.cart && this.props.cart.length > 0) && <span className = "cart-badge"> {this.props.cart.length}</span>}
          {!this.state.hideCart &&
            <div className='cart-modal' id = "cart-modal">
              <div className = "cart-header"> Cart <span onClick = {this.close.bind(this)}> x </span></div>
              <div>
                <Cart cart = {this.props.cart} beers = {this.props.allBeers}/>
                {(!this.props.cart || !this.props.cart.length) && <div className = "no-data"> No items in your cart </div>}
              </div>
              <div>
                <button onClick = {this.successResponse.bind(this)}>Checkout</button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}




export default Header;
