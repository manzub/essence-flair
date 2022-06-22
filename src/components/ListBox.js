import React from "react";
import { NavLink } from "react-router-dom";

function ListBox({ isDarkMode, item }) {
  return(<ul role="listbox">
    <li className="search-item">
      <NavLink to={`/single/${item.id}`} className="selected">
        <span className="search-thumb">
          <img src={item.image} alt={item.name} />
        </span>
        <div>
          <span className="qs-option-name"> {item ? item.name.substring(0,15)+'...' : null} </span>
          <div className="price-box">
            <span className="price">N{item ? Math.round(item.price/1000)*1000 : null}</span>
          </div>
          <span>Qauntity: {item ? item.qty : null }</span>
        </div>
      </NavLink>
    </li>
  </ul>)
}

export default ListBox;