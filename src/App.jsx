import React, { useState, useEffect } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import ContactList from "./components/ContactList";


function App() {
  const [contacts, setContacts] = useState([]);
  const [favContacts, setFavContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterContacts, setFilterContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://reqres.in/api/users?page=1&delay=1");
      const data = await result.json();
      setContacts(data.data);
      setFilterContacts(data.data);
    };
    fetchData();
  }, []);

  const searchMore = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      const result = await fetch("https://reqres.in/api/users?page=2&delay=1");
      const data = await result.json();
      setContacts([...contacts, ...data.data]);
      setFilterContacts([...contacts, ...data.data]);
    };
    fetchData();
  };

  const handleSearch = (search) => {
    setSearch(search);
    const filterContacts = contacts.filter((contact) => {
      return contact.first_name.toLowerCase().includes(search.toLowerCase());
    }
    );
    setFilterContacts(filterContacts);
  }


  const handleFav = (contact) => {
    const newFavContacts = [...favContacts, contact];
    contact.isFav = true;
    setFavContacts(newFavContacts);
    localStorage.setItem("favContacts", JSON.stringify(favContacts));
  }

  const handleUnfav = (contact) => {
    const unfavContacts = favContacts.filter(
      (favContact) => favContact.id !== contact.id
    );
    setFavContacts(unfavContacts);
    contact.isFav = false;
    localStorage.setItem("favContacts", JSON.stringify(unfavContacts));
  };

  return (
    <>
      <header></header>
      <div className="App container">
        <h1>My contacts</h1>
        <div className="row">
          <div className="col">
            <div className="d-flex">
              <SearchBar search={search} handleSearch={handleSearch} />
              <p className="mx-2">Total : {filterContacts.length} </p>
            </div>
            <ContactList contacts={filterContacts} handleFav={handleFav} handleUnfav={handleUnfav} />
            <div className="text-center">
              {contacts.length > 0 && contacts.length <= 6 && (
                <button onClick={searchMore} className="btn btn-primary">
                  Load more
                </button>
              )}
            </div>
          </div>

          <div className="col">
            <h2>Favorites</h2>
            <ContactList contacts={favContacts} handleFav={handleFav} handleUnfav={handleUnfav} />
          </div>
        </div>
      </div>
      <footer></footer>
    </>
  );
}

export default App;
