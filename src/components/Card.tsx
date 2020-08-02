import React from "react";
import "../assets/App.scss";

import editIcon from '../assets/edit-icon.svg';

function Card() {
  return (
    <div className="Card">
      <img className="Card-edit-button" src={editIcon} alt="Edit User Icon"/>
      <div className="Card-image">
        <img src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e" alt="User Name Avatar" />
      </div>
      <div className="Card-title">
        <h3>Person Name</h3>
        <div className="Card-date">
          created <span>01 FEB 2020</span>
        </div>
      </div>
      <div className="Card-description">
        <p>Person Description truncated when the text is to long to display and gets wrapped.</p>
      </div>
    </div>
  );
}

export default Card;
