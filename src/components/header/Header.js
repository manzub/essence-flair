import React from "react";
import { NavLink } from "react-router-dom";
import classNames from 'classnames';
import logo from '../../static/logo.png';
import { appname } from "../../utils/constants";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../utils/ThemeContext";
import ListBox from "../ListBox";

function Header({ isDarkMode }) {
  const { user, shop, shoppingCart } = useSelector(state => state);
  const { setTheme } = React.useContext(ThemeContext);


  const [searchItem, setSearchItem] = React.useState(null);
  const [cartMenu, toggleCartMenu] = React.useState(false);
  const [mobileNav, toggleMobileNav] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);

  const darkModeTextStyles = {
    color: 'white',
    fontWeight: '500'
  }

  React.useEffect(() => {
    if(searchItem) {
      let products = shop.shop.products.filter(x => {
        if (String(x.category).includes(searchItem)) return true
        if (String(x.filter).includes(searchItem)) return true
        if (String(x.name).includes(searchItem)) return true
        return false;
      })
      setSearchResults(products);
    }
  }, [searchItem, shop.shop.products])

  function redirectWhatsApp() {
    let message = `Hello, I saw a product on your site and i want to place an order`
    let redirectUrl = `https://api.whatsapp.com/send?phone=${user?.phone}&text=${encodeURI(message)}`
    window.open(redirectUrl, '_blank')
  }

  return(<React.Fragment>
    <div className="header content">
      <div className="panel-left">
        <div className="block-search">
          <form className="mini-search">
              <div className="field search">
                <div className="control d-flex align-items-center justify-content-center">
                  <ion-icon name="search-outline" style={isDarkMode ? darkModeTextStyles : null}></ion-icon>
                  {/* TODO: search input */}
                  <input  style={isDarkMode ? darkModeTextStyles : null} onChange={(event) => setSearchItem(event.target.value)} placeholder="Search Product Name..." className="input-text"></input>
                </div>
              </div>
              <div className={classNames("search-autocomplete", {"hide": !searchItem})}>
                {/* TODO: search results */}
                { searchResults.length > 0 ? searchResults.map((item, idx) => <ListBox key={idx} item={item} />) : <p>No Products Found</p> }
              </div>
          </form>
        </div>
      </div>
      <span onClick={() => toggleMobileNav(!mobileNav)} className="action nav-toggle">
        { !mobileNav ? <ion-icon name="menu-outline"></ion-icon> : <ion-icon name="close-outline"></ion-icon>}
      </span>
      <NavLink className="logo d-flex justify-content-center align-items-center gap-2" to='/'>
        <img width={40} src={logo} alt="logo" />
        <h3 style={{fontWeight:'700',margin:0}} className="text-uppercase">{appname}</h3>
      </NavLink>
      <div className="panel-right align-items-center">
        <span onClick={() => setTheme(isDarkMode ? 'light' : 'dark')} className="action theme-toggle" style={{fontSize:'30px'}}>
          {!isDarkMode ?  <ion-icon class={classNames({'text-white': isDarkMode})} name="sunny-outline"></ion-icon> : <ion-icon class={classNames({'text-white': isDarkMode})} name="moon-outline"></ion-icon>}
        </span>

        <div className={classNames("minicart-wrapper", {'active': cartMenu})}>
          <span onClick={() => toggleCartMenu(!cartMenu)} className="action showcart">
            {!cartMenu ?  <ion-icon class={classNames({'text-white': isDarkMode})} name="cart-outline"></ion-icon> : <ion-icon class={classNames({'text-white': isDarkMode})} name="close-outline"></ion-icon>}
            <span className="counter qty">
              <span className={classNames("counter-number", { 'text-white': isDarkMode })}>{shoppingCart?.items.length}</span>
            </span>
          </span>

          <div className={classNames("ui-dialog d-block", {'bg-dark-600': isDarkMode})}>
            <div className={classNames("block block-minicart",{'bg-dark-600':isDarkMode, 'bg-gray-100': !isDarkMode})}>
              <div id='minicart-content-wrapper'>
                <div className="block-title">
                  <span className="text text-bold">My Cart</span>
                  <span className={classNames("qty text-bold", { 'text-white': isDarkMode })}>{shoppingCart?.items.length}</span>
                </div>

                <div className="block-content cartlist">
                  {/* TODO: map cart items */}
                  { shoppingCart?.items.length > 0 ? shoppingCart?.items.map((item, idx) => <ListBox key={idx} item={item} />) : <p style={{fontSize:'20px'}}>0 Product(s) in cart</p> }
                  <div style={{marginTop:'20px'}}>
                    <h6 style={{fontSize:'15px'}}>Actions:</h6>
                    <div className="actions d-flex align-items-center gap-2">
                      <button onClick={()=>{window.open(`tell://1000`,'_blank')}} title="Call to Place your Order" className="action primary bg-dark border-0 text-info">
                        <ion-icon name="call-outline"></ion-icon>
                      </button>
                      <button onClick={user?.phone && redirectWhatsApp} title="Order VIA WhatsApp" className="action primary bg-dark border-0 text-success">
                        <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                      </button>
                      {/* TODO: if cart items */}
                      { shoppingCart?.items.length > 0 && <React.Fragment>
                        <NavLink to="/checkout" title="Checkout" className="action primary bg-dark border-0 text-success d-flex align-items-center">
                          <small style={{fontSize:'9px'}}>Checkout</small>
                          <ion-icon name="arrow-forward-outline"></ion-icon>
                        </NavLink>
                      </React.Fragment> }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="nav-sections">
      <nav className={classNames("navigation tm-navigation", { 'bg-dark-600': isDarkMode, 'bg-white': !isDarkMode })} style={{transform: mobileNav ? 'none' : null}} role="navigation">
        <ul className="ui-menu">
          {/* TODO: menus from api */}
          {shop.categories?.map((el, idx) => {
            return(<li key={idx} className="ui-menu-item">
              <NavLink to={`/shop?m=${el.id}`} className={classNames("ui-menu-link", { 'text-white': isDarkMode })}>
                <span>{el.name}</span>
              </NavLink>
            </li>)
          })}
        </ul>
      </nav>
    </div>
  </React.Fragment>)
}

export default Header;