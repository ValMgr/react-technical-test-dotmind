import React, { useState, useEffect } from "react";

function SearchBar(props) {
    const [search, setSearch] = useState("");
    const { handleSearch } = props;

    useEffect(() => {
        handleSearch(search);
    }, [search]);


    return (
        <div className="search-bar">
            <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    )

}


export default SearchBar;