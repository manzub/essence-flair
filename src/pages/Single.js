import React from "react";
import classNames from 'classnames';
import { NavLink, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Loading from "../components/Loading";
import Snackbar from "../components/Snackbar";
import { useQuery } from "react-query";
import apiBackend from "../utils/apiBackend";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../redux/types";

function Single({ darkMode }) {
  const isDarkMode = darkMode;

  const dispatch = useDispatch();
  const { user } = useSelector(state => state);
  const { id: productId } = useParams();

  const [product, setProduct] = React.useState(null);
  const [async, inAsync] = React.useState(false)
  const [alert, setAlert] = React.useState(null)

  const { isLoading } = useQuery('product', () => {
    return apiBackend.getProduct(productId)
  }, { onSuccess: (data) => setProduct(data), enabled: !!productId })

  function addToCart() {
    inAsync(true)
    setAlert('Product Added To Cart')
    dispatch({ type: actionTypes.addToCart, payload: {...product, qty: 1} })
    setTimeout(() => {
      inAsync(false)
      setAlert(null)
    }, 1000);
  }

  function whatsappMessage() {
    let message = `Hello, I saw a product on your site and i want to place an order: - \t Name: ${product?.title}\r Price: ${product?.price}\r Quantity: ${product?.qty}`
    let redirectUrl = `https://api.whatsapp.com/send?phone=${user?.phone}&text=${encodeURI(message)}`
    window.open(redirectUrl, '_blank')
  }

  return(<React.Fragment>
    <div className="page-top">
      {/* TODO: product name */}
      <Breadcrumb thumbs={['Shop', `Product ${product?.name}`]} />
    </div>
    <main id="maincontent" className="page-main">
      <div className="columns">
        <div className="columns left"></div>
        <div className="columns main">
          <div className="product-wrap">
            <div className="product media">
              <div className="gallery-placeholder">
                <div className="fotorama-item fotorama" style={{position:'relative'}}>
                  <div className="fotorama__wrap">
                    <div className="fotorama__stage" style={{width:345,height:432}}>
                      <div className="fotorama__stage__shaft fotorama__wrap--slide">
                        <div className="fotorama__stage__frame fotoroma__active">
                          <img src={product?.image} className="fotorama__img" alt="cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-info-main">
              <div className="page-title-wrapper product">
                <h1 className={classNames("page-title", {'text-white': isDarkMode})}><span className="base">{product?.name}</span></h1>
              </div>

              <div className="product attribute overview">
                <div className="value">{product?.description.text}</div>
              </div>

              <div className="product-info-price">
                <div className="price-box price-final_price">
                  <span className="normal-price">
                    <span className="price-container price-final_price weee">
                      <span className="price-wrapper">
                        <span className="price">N{Intl.NumberFormat('en-US').format(Math.round(product?.price/1000)*1000)}K</span>
                      </span>
                    </span>
                  </span>
                </div>
              </div>

              <div className="product-brand mb-2">
                <label className="label">Brand:</label>
                <NavLink to="/shop" className="product-brand-name text-capitalize">{product?.filter}</NavLink>
              </div>

              <div className="product-color mb-3">
                <h6 className="text-bold">Choose your finish:</h6>
                <div className="color-group">
                  { product?.description.color.map((item, idx) => (
                    <div key={idx} className="color-item">
                      <input type="radio" value={item} name="color" />
                      <span>{item}</span>
                    </div>
                  )) }
                </div>
              </div>

              <div className="product-color">
                <h6 className="text-bold">Choose your capacity:</h6>
                <div className="color-group">
                  { product?.description.storage.map((item, idx) => (
                    <div key={idx} className="color-item">
                      <input type="radio" value={item} name="color" />
                      <span>{item}</span>
                    </div>
                  )) }
                </div>
              </div>

              <div className="product-add-form">
                <div className="product-options-bottom">
                  <div className="box-tocart">
                    <div className="fieldset">
                      <div className="actions" style={{display:'flex'}}>
                        <button onClick={addToCart} title="Add to Cart" className="action primary tocart">
                          <ion-icon name="add-outline"></ion-icon>
                        </button>
                        <button onClick={()=>window.open(`tel://+23409028459128`,'_blank')} title="Call To Order" className="action primary tocart">
                          <ion-icon name="call-outline"></ion-icon>
                        </button>
                        <button onClick={user?.phone && whatsappMessage} title="Order VIA WhatsApp" className="action primary tocart">
                          <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    {(isLoading || async) && <Loading />}
    { alert && <Snackbar message={alert} /> }
  </React.Fragment>)
}

export default Single;