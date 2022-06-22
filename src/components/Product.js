import React from "react";
import { NavLink } from "react-router-dom";
import classNames from 'classnames';
import actionTypes from "../redux/types";
import { useDispatch } from "react-redux";
import Snackbar from "./Snackbar";

function Product({ darkMode, item }) {
  const dispatch = useDispatch();
  const isDarkMode = darkMode;

  const [alert, setAlert] = React.useState(false);

  function addToCart() {
    setAlert('Product Added To Cart');
    dispatch({ type: actionTypes.addToCart, payload: {...item, qty: 1} })
    setTimeout(() => setAlert('Product Added To Cart'), 1000)
  }

  return(<li className="item product product-item">
    <div className="product-item-info">
      <div className="product-img">
        <NavLink to={`/single/${item.id}`} className={"product photo product-item-photo"}>
          <span style={{width:'345px'}} className="product-image-container">
            <span style={{paddingBottom:'125.14124293785%'}} className="product-image-wrapper">
              <img className="product-image-photo" src={item.image} alt={item.name} />
            </span>
          </span>
        </NavLink>
      </div>
      <div className="product details product-item-details">
        <strong className="product name product-item-name">
          <NavLink to={`/single/${item.id}`} className={classNames("product-item-link", { "text-white": isDarkMode })}>{item.name}</NavLink>
        </strong>
        <div className="price-box price-final_price">
          <span className="normal-price">
            <span className="price-container price-final_price">
              <span className="price-wrapper">
                <span className={classNames("price", { 'text-white': isDarkMode })}>N{Intl.NumberFormat('en-Us').format(Math.round(item.price/1000)*1000)}K</span>
              </span>
            </span>
          </span>
        </div>

        <div className="product-item-inner">
          <div className="product actions product-item-actions">
            <div className="actions-secondary d-flex align-items-center justify-content-evenly">
              {/* add to cart action */}
              <button onClick={addToCart} className="action tocart">
                <ion-icon name="add-outline"></ion-icon>
              </button>

              <NavLink to={"/single/"+item?.id} className="action btn-secondary rounded-0 btn">Read More</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    {alert && <Snackbar message={alert} />}
  </li>)
}

export default Product;