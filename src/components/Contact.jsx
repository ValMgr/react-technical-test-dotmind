import React from "react";

import heart from "../assets/svg/heart.svg";
import heartFill from "../assets/svg/heart-fill.svg";

function Contact(props) {
  const { contact, isFav, handleFav, handleUnfav } = props;

  return (
    <div className="contact">
      <img src={contact.avatar} alt="avatar" />
      <div className="contact-info">
        <h3>
          {contact.first_name} {contact.last_name}
        </h3>
        <p>{contact.email}</p>
      </div>
      <div className="contact-actions">
        {isFav ? (
          <img
            src={heartFill}
            alt="heart"
            onClick={() => handleUnfav(contact)}
          />
        ) : (
          <img src={heart} alt="heart" onClick={() => handleFav(contact)} />
        )}
      </div>
    </div>
  );
}

export default Contact;
