import React, { Component } from 'react';
// import logo from './../logo.svg';
import './../App.css';

class ListItem extends Component {

  setIndex(event){
    var els = document.getElementsByClassName("list-item");
      for(var el of els){
        el.style = {};
      }
      let index;
      if(event.target.className === "list-item"){
        event.target.style.border = "2px solid #F9A825";
        this.props.handleIndex(event.target.id);
        index = event.target.id;
      } else if (event.target.parentElement.className === "list-item") {
        event.target.parentElement.style.border = "2px solid #F9A825";
        this.props.handleIndex(event.target.parentElement.id);
        index = event.target.parentElement.id;
      } else if (event.target.parentElement.parentElement.className === "list-item") {
        event.target.parentElement.parentElement.style.border = "2px solid #F9A825";
        this.props.handleIndex(event.target.parentElement.parentElement.id);
        index = event.target.parentElement.parentElement.id;
      } else if (event.target.parentElement.parentElement.parentElement.className === "list-item") {
        event.target.parentElement.parentElement.parentElement.style.border = "2px solid #F9A825";
        this.props.handleIndex(event.target.parentElement.parentElement.parentElement.id);
        index = event.target.parentElement.parentElement.parentElement.id
      } else if (event.target.parentElement.parentElement.parentElement.parentElement.className === "list-item") {
        event.target.parentElement.parentElement.parentElement.parentElement.style.border = "2px solid #F9A825";
        this.props.handleIndex(event.target.parentElement.parentElement.parentElement.parentElement.id);
        index = event.target.parentElement.parentElement.parentElement.parentElement.id
      }
      this.props.handleImage(true, parseInt(index%5));
  }

  render() {
    return (
      <div className="list-item" id = {this.props.beer.id} onClick = {this.setIndex.bind(this)}>
        <div className = "indicator-image">
          <span className = "no-data"> List Icon </span>
        </div>
        <div className = "beer-details">
          <div className = "beer-title">
            {this.props.beer.name }
          </div>
          <div className = "beer-info">
            <div className = "beer-style">
              <span>{this.props.beer.style}</span>
            </div>
            <div className = "beer-attributes">
              <span>Ounces: {this.props.beer.ounces}</span>
              <span>ABV : {this.props.beer.abv || "--"}</span>
              <span>IBU: {this.props.beer.ibu || "--"}</span>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default ListItem;
