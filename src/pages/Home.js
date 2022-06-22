import React from "react";
import classNames from 'classnames';
import { NavLink } from "react-router-dom";
import { appname, occassionsmenu, widgetsmenu } from "../utils/constants";

function Home({ darkMode }) {
  const isDarkMode = darkMode;

  return(<div className="page-top">
    <div className="widget block block-static-block">
      <div className="banner offset-none">
        <div className="banner-content center text-center">
          <div className="inset-1 top-seller">
            <h1 className="color-white text-bold text-uppercase">{appname}</h1>
            <NavLink to='/shop' className='action primary'>Shop Now</NavLink>
          </div>
        </div>
        <div style={{backgroundImage: `${isDarkMode ? "url('../images/iphone-13-dark.png')" : "url('../images/iphone-13.png')"}`}} className='img'/>
      </div>
    </div>

    <div className="widget block block-static-block">
      <div className="row no-gutter bordered">
        { widgetsmenu.map((item, idx) => {
          return(<div key={idx} className="col-md-6">
            <NavLink to={`/shop?m=${item.catid}`} className="banner hovered">
              <img src={item.image} alt="cover" />
              <div className="banner-content left">
                <div className="hover-content">
                  <h1 className={classNames({"color-white": !isDarkMode, "color-dark": isDarkMode})}>{item.name.split(' ').map((e, idx) => <span key={idx}>{e}{idx === 0 ?<br/> : null}</span>)}</h1>
                  {/* TODO: add locale */}
                  <h4 className={classNames({"text-white": !isDarkMode, "text-dark": isDarkMode})}>from &#8358;{item.pricerange.join(' - ')}K</h4>
                </div>
              </div>
            </NavLink>
          </div>)
        }) }
      </div>
    </div>

    <div className="top-container">
      <div className="widget block block-static-block">
        <div className="block-title"><strong className={classNames({'text-white': isDarkMode})}>Shop By Occassions</strong></div>
        <div className="ordered inset-3 offset-bottom">
          <div className="row justify-content-center text-center">
            {/* TODO: occassions menu */}
            { occassionsmenu.map((item, idx) => {
              return(<div key={idx} className="col-sm-4">
                <NavLink to={`/shop?m=${item.catid}`} className="banner hovered border" style={{margin:0}}>
                  <img src={item.image} alt="cover"/>
                  <div className="banner-content bottom" style={{bottom:0}}>
                    <h3 className="text-dark">{item.name}</h3>
                    <span className="action default">shop now</span>
                  </div>
                </NavLink>
              </div>)
            }) }
          </div>
        </div>
      </div>
    </div>
  </div>)
}

export default Home;