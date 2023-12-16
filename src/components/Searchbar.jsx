import React from 'react'
import "./loaderstyle.css"

export default function Searchbar({searchTerm, setSearchTerm}) {
  return (
  
    <div className="search-container">
   
    <input type="text" name="search" placeholder="Search..." className="search-input"  
         value={searchTerm}
         onChange={(e) => {setSearchTerm(e.target.value)
        console.log(searchTerm)}}
    />
    <a href="#" className="search-btn">
            <i className="fas fa-search"></i>      
    </a>
</div>

  );
}


