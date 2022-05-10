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
    const favContacts = JSON.parse(localStorage.getItem("favContacts"));
    if (favContacts) setFavContacts(favContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem("favContacts", JSON.stringify(favContacts));
  }, [favContacts]);

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
      return (
        contact.first_name.toLowerCase().includes(search.toLowerCase()) ||
        contact.last_name.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilterContacts(filterContacts);
  };

  const handleFav = (contact) => {
    contact.isFav = true;
    const newFavContacts = [...favContacts, contact];
    setFavContacts(newFavContacts);
  };

  const handleUnfav = (contact) => {
    contact.isFav = false;
    const newFavContacts = favContacts.filter((favContact) => {
      return favContact.id !== contact.id;
    });
    setFavContacts(newFavContacts);
  };

  return (
    <>
      <header></header>
      <div className="App container">
        <h1>My contacts</h1>
        <div className="row">
          <div className="col d-flex flex-column">
            <div className="d-flex align-items-center mb-4">
              <SearchBar search={search} handleSearch={handleSearch} />
              <p className="mx-2 my-0">Total : {filterContacts.length} </p>
            </div>
            <ContactList
              contacts={filterContacts}
              handleFav={handleFav}
              handleUnfav={handleUnfav}
            />
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
            <ContactList
              contacts={favContacts}
              handleFav={handleFav}
              handleUnfav={handleUnfav}
            />
          </div>
        </div>
      </div>
      <footer></footer>
    </>
  );
}

export default App;
