import React from "react";
import classNames from 'classnames';
import { NavLink } from "react-router-dom";
import { appname } from "../utils/constants";
import Product from "../components/Product";

function Home({ darkMode }) {
  const isDarkMode = darkMode;

  return (<div className="page-top">
    <div className="widget block block-static-block">
      <div className="banner offset-none">
        <div className="mt-5 text-center">
          <div className="inset-1 top-seller">
            <h1 className="text-bold text-uppercase">{appname}</h1>
            <div className="d-flex align-items-center justify-content-center">
              <p style={{ width: '50%' }} className="mt-3 text-center">Lifelong companions for bold, luminous personalities in perpetual movement, each CHANEL fragrance for women is inspired by the world of Mademoiselle and composes its own imaginative and feminine olfactory experience. For a complete beauty ritual, prolong the fragrance trail with other expressions of the scent.</p>
            </div>
            <NavLink to='/shop' className={classNames('mt-3 action primary', { ' bg-dark text-white': !isDarkMode })}>Shop Now</NavLink>
          </div>
        </div>
      </div>
    </div>
    {/* new contents */}
    <div className="my-auto container">
      <hr />
      <div className="top-container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex gap-2 align-items-center" style={{ fontSize: 30 }}>
            <ion-icon name="options-outline"></ion-icon>
            Filter
          </div>
          <div className="text-right">
            <p className="text-bold">20 Products</p>
            <p className="text-muted">Image Credits: Chanel</p>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <Product item={{ id: '1', image: 'images/1.jpg', name: 'CHANCE EAU TRENDE', price: 90 }} />
        </div>
        <div className="col-md-4 mb-3">
          <Product item={{ id: '2', image: 'images/2.jpg', name: 'COCO MADEMOISELLE', price: 95 }} />
        </div>
        <div className="col-md-4 mb-3">
          <Product item={{ id: '3', image: 'images/gabrielle-chanel.jpg', name: 'GABRIELLE CHANEL', price: 1122 }} />
        </div>
        <div className="col-md-4 mb-3">
          <Product item={{ id: '5', image: 'images/3.jpg', name: 'GABRIELLE CHANEL PERFUME SPRAY', price: 1122 }} />
        </div>
        <div className="col-md-4 mb-3">
          <Product item={{ id: '5', image: 'images/4.jpg', name: 'CHANEL N\'5 PERFUME SPRAY', price: 1122 }} />
        </div>
        <div className="col-md-4 mb-3">
          <Product item={{ id: '5', image: 'images/6.webp', name: 'J\'ADORE PERFUME ROLLER-PEARL', price: 1122 }} />
        </div>
        <div className="col-md-4 mb-3">
          <Product item={{ id: '5', image: 'images/7.jpg', name: 'CHANEL N\'5 SOAPS', price: 1122 }} />
        </div>
        <div className="col-md-4 mb-3">
          <Product item={{ id: '5', image: 'images/8.webp', name: 'MISS DIOR MOISTURIZING BODY MILK', price: 1122 }} />
        </div>
        <div className="col-md-4 mb-3">
          <Product item={{ id: '5', image: 'images/9.webp', name: 'J\'ADORE GALEE D\'OR BODY GEL', price: 1122 }} />
        </div>
        <div className="col-md-4 mb-3">
          <Product item={{ id: '5', image: 'images/10.webp', name: 'HYPNOTIC POISON', price: 1122 }} />
        </div>
        <div className="col-md-4 mb-3">
          <Product item={{ id: '5', image: 'images/11.webp', name: 'MISS DIOR PERFUME SPRAY', price: 1122 }} />
        </div>
      </div>
    </div>
  </div>)
}

export default Home;