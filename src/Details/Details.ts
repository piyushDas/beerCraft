import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';

class Details extends Component {
  render() {
    return (
      <div>
        <div className="detail-item">
          {this.props.showImage && <img src = {"images/img"+ this.props.imageIndex +".jpg"} alt = "preview image of the selected beer"/>}
          {!this.props.showImage && <div className= "no-data">No preview available</div>}
        </div>
        <button type = "button" onClick= {this.props.addItem}>Add to Cart</button>
      </div>
    );
  }
}

export default Details;
