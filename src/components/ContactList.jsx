import React from "react";

import Contact from "./Contact";

function ContactList(props) {
    const { contacts, handleFav, handleUnfav } = props;


    return (
        <ul className="contact-list">
            {contacts.map(contact => (
                <li key={contact.id}>
                    <Contact contact={contact} isFav={contact.isFav} handleFav={handleFav} handleUnfav={handleUnfav} />
                </li>
            ))}
        </ul>
    )
}

export default ContactList;