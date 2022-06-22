import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Loading from "../components/Loading";
import Snackbar from "../components/Snackbar";
import apiBackend from "../utils/apiBackend";
import { useDispatch, useSelector } from "react-redux";
import actionTypes from "../redux/types";
import axios from "axios";

window.Buffer = window.Buffer || require("buffer").Buffer;

const defaultBillingForm = { fullname: '', email: '', phone: '', addressline: '', city: '', country: '', postal_code: '', password: '' }
function Checkout({ darkMode }) {
  // const isDarkMode = darkMode;

  const dispatch = useDispatch();
  const { user, shoppingCart } = useSelector(state => state);

  const [creditcard, creditcardform] = React.useState({ cvv: '', number: '', expiry_month: '', expiry_year: '' })
  const [rtuserform, updateRTUserForm] = React.useState({ email: '', password: '' })
  const [billingform, updateBillingForm] = React.useState(defaultBillingForm);
  const [token, setToken] = React.useState(null);
  const [loginType, setlgntype] = React.useState(null);


  const [async, inAsync] = React.useState(false)
  const [alert, setAlert] = React.useState(null)

  async function loginUser(e) {
    e.preventDefault();
    inAsync(true)
    try {
      if(rtuserform.email && rtuserform.password) {
        const user = await apiBackend.signin(rtuserform.email, rtuserform.password);
        if(user) {
          dispatch({ type: actionTypes.loginUser, payload: user })
          inAsync(false)
          setAlert('User Logged In successfull')
          setTimeout(() => setAlert(null), 1000);
        } else throw new Error('Invalid User')
      }
    } catch (error) {
      inAsync(false)
      setAlert(error.message)
      setTimeout(() => setAlert(null), 1000);
    }
  }

  async function makePayment() {
    inAsync(true)
    const data = {...creditcard, cvd: creditcard.cvv}
    axios.post("https://api.na.bambora.com/scripts/tokenization/tokens/", data, {
      headers: {
        "Content-Type": "text/plain; application/json"
      }
    }).then(response => {
      setToken(response.data.token)
      inAsync(false)
    }).catch(error => {
      inAsync(false)
      setAlert(error.message)
      setTimeout(() => {
        setAlert(null)
      }, 2000);
    })
  }

  React.useEffect(() => {
    if(token) {
      const data = {
        order_number:"Sdsdsdsdsdsd1231331"+Date.now(), amount: 100.00, payment_method:"token",
        token: { name:"John Doe", code:`${token}`, complete: true }
      };
      axios.post("https://api.na.bambora.com/v1/payments", data, {
        headers: {
          "Authorization": `Passcode ${new Buffer('300212875:Jeddac401').toString('base64')}`,
          "Content-Type": "application/json"
        }
      }).then(response => {
        console.log(response);
        inAsync(false)
        shoppingCart.items.forEach(async (item) => {
          await apiBackend.recordSale(item.id, user.uid, item.qty, item.price)
        })
        setAlert('Payment Approved')
        setTimeout(() => {
          dispatch({ type: 'clearCart', payload: null })
          setAlert(null)
        }, 2000);
      }).catch(error => {
        console.log(error);
        inAsync(false)
        setAlert('Error Occurred')
        setTimeout(() => {
          setAlert(null)
        }, 2000);
      })
    }
  }, [token, dispatch, shoppingCart.items, user.uid])

  return(<React.Fragment>
    <div className="page-top">
      <Breadcrumb thumbs={['Shop', `Checkout`]} />
    </div>
    <main id="maincontent" style={{margin:'20px 50px'}}>
      { shoppingCart?.items.length > 0 ? <React.Fragment>
        <div className="row gap-4" >
          <div className="col-md-4" style={{flex:'3'}}>
            <h5>Cart Items: {shoppingCart?.items.length}</h5>
            <div className="p-3" style={{border:'1px solid #e3e3e3'}}>
              { shoppingCart?.items.map((item, idx) => <React.Fragment key={idx}>
                <div style={{height:'200px',width:'200px',backgroundImage: `url(${item.image})`,backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundSize:'contain'}} />
                <h6 className="text-uppercase">{item.name}</h6>
                <p className="text-uppercase">{item.price} x {item.qty}</p>
                <p>N{Intl.NumberFormat('en-US').format(Math.round(item.price * item.qty))}</p>
                <hr />
              </React.Fragment>) }
            </div>
          </div>
          <div className="col-md-8" style={{flex:'7'}}>
            <section className="d-flex align-items-center justify-content-between">
              <div className="actions">
                {loginType == null && <React.Fragment>
                  <h5>Chose an option:</h5>
                  <button onClick={() => setlgntype(true)} className="action primary bg-info" style={{border:'2px solid #444'}}>Returning User?</button>
                  <span>&nbsp;&nbsp;</span>
                  <button onClick={() => setlgntype(false)} className="action primary bg-warning" style={{border:'1px solid #444'}}>New User?</button>
                  </React.Fragment>}
              </div>
              { loginType != null && <button onClick={() => setlgntype(null)} className="action primary">
                <ion-icon name="close-outline" style={{fontSize:'40px'}}/>
              </button>}
            </section>

            <div className="row" style={{width:'100%'}}>
              { loginType && <React.Fragment>
                <div className="col-md-12">
                  <h4 className="text-uppercase mb-4">Customer Details</h4>
                  <form onSubmit={loginUser}>
                    <p>Returning User?</p>
                    <div className="p-3" style={{border:'1px solid #e3e3e3', width:'100%'}}>
                      <div className="form-group">
                        <label>Email:</label>
                        <input 
                        value={rtuserform.email} 
                        onChange={(event) => updateRTUserForm({ ...rtuserform, email: event.target.value })}
                        type={"email"} className="form-control" placeholder="Enter email address" />
                      </div>
                      <div className="form-group">
                        <label>Password:</label>
                        <input 
                        value={rtuserform.password} 
                        onChange={(event) => updateRTUserForm({ ...rtuserform, password: event.target.value })}
                        type={"password"} className="form-control" placeholder="Enter your password" />
                      </div>
                      <div className="form-group mt-1">
                        <button onClick={loginUser} className="btn btn-primary">Login</button>
                      </div>
                    </div>
                  </form>
                </div>
              </React.Fragment>}

              { loginType === false && <React.Fragment>
                <div className="col-md-12">
                  <form className="mt-4">
                    <p>Billing/Shipping Details:</p>
                    <div className="p-3" style={{border:'1px solid #e3e3e3', width:'100%'}}>
                      <div className="form-group">
                        <label>Full Name:</label>
                        <input 
                        type={"text"}
                        value={billingform.fullname}
                        onChange={(event) => updateBillingForm({ ...billingform, fullname: event.target.value })}
                        className="form-control" placeholder="Enter email address" />
                      </div>
                      <div className="form-group">
                        <label>Email:</label>
                        <input type={"email"} className="form-control" placeholder="Enter email address" />
                      </div>
                      <div className="form-group">
                        <label>Phone Number:</label>
                        <input type={"email"} className="form-control" placeholder="Enter email address" />
                      </div>
                      <div className="form-group">
                        <label>Address Line:</label>
                        <input type={"email"} className="form-control" placeholder="Enter email address" />
                      </div>
                      <div className="form-group">
                        <label>City:</label>
                        <input type={"email"} className="form-control" placeholder="Enter email address" />
                      </div>
                      <div className="form-group">
                        <label>Postal Code:</label>
                        <input type={"email"} className="form-control" placeholder="Enter email address" />
                      </div>
                      <div className="form-group">
                        <label>Country:</label>
                        <input type={"email"} className="form-control" placeholder="Enter email address" />
                      </div>
                      <div className="form-group">
                        <label>Password:</label>
                        <input type={"password"} className="form-control" placeholder="Enter your password" />
                      </div>
                      <div className="form-group mt-1">
                        <button className="btn btn-primary">Save</button>
                      </div>
                    </div>
                  </form>
                </div>
              </React.Fragment> }

              { (user?.uid && user?.email) && <React.Fragment>
                <div className="col-md-12">
                  <div className="mt-4">
                    <p>Billing/Shipping Details:</p>
                    <div className="d-flex align-items-center justify-content-between py-2 px-5" style={{border:'1px solid #e3e3e3'}}>
                      <div>
                        <h6 className="text-bold">{user?.fullname} {`(${user?.phone})`}</h6>
                        <h6 style={{fontSie:15}}>{user?.email}</h6>
                        <small className="text-muted" style={{fontSie:'8px'}}>{user?.address_line}</small>
                      </div>
                      <div className="d-flex align-items-center justify-content-evenly gap-2">
                        <button className="btn btn-primary">
                          <ion-icon name="create-outline"></ion-icon>
                        </button>
                        <button className="btn btn-danger">
                        <ion-icon name="trash-outline"></ion-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mt-4 p-4" style={{border:"1px solid #e3e3e3"}}>
                    <h6 className="mt-0">Proceed to Checkout</h6>
                    <div className="form-group col-xs-6 has-feedback" id="card-number-bootstrap">
                        <input
                        onChange={(event) => creditcardform({ ...creditcard, number: event.target.value })}
                        placeholder="Enter Card Number" id="card-number" className="form-control" />
                        <label className="help-block" htmlFor="card-number" id="card-number-error"></label>
                    </div>
                    <div className="form-group col-xs-2 has-feedback" id="card-cvv-bootstrap">
                        <input
                        onChange={(event) => creditcardform({ ...creditcard, cvv: event.target.value })}
                        placeholder="Enter Card CVV" id="card-cvv" className="form-control" />
                        <label className="help-block" htmlFor="card-cvv" id="card-cvv-error"></label>
                    </div>
                    <div className="form-group col-xs-2 has-feedback" id="card-expiry-bootstrap">
                        <div className="row">
                          <div className="col-md-6">
                            <input
                            onChange={(event) => creditcardform({ ...creditcard, expiry_month: event.target.value })}
                            placeholder="Enter Card Expiry Month" id="card-expiry-x" className="form-control" />
                            <label className="help-block" htmlFor="card-expiry" id="card-expiry-error"></label>
                          </div>
                          <div className="col-md-6">
                            <input
                            onChange={(event) => creditcardform({ ...creditcard, expiry_year: event.target.value })}
                            placeholder="Enter Card Expiry Year" id="card-expiry" className="form-control" />
                            <label className="help-block" htmlFor="card-expiry" id="card-expiry-error"></label>
                          </div>
                        </div>
                    </div>
                    <div className="col-xs-2 text-center">
                      <button onClick={makePayment} id="pay-button" className="btn btn-primary" disabled={!creditcard.cvv}>Pay</button>
                    </div>
                  </div>
                </div>
              </React.Fragment> }
            </div>
          </div>
        </div>
      </React.Fragment> : <p>No Products In Cart</p> }
    </main>
    {(async) && <Loading />}
    { alert && <Snackbar message={alert} /> }
  </React.Fragment>)
}

export default Checkout;