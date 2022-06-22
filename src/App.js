import React, { Suspense } from 'react';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css'
import './theme/App.scss';
import './theme/static.css';
import './theme/theme.scss';
import { ThemeContext } from './utils/ThemeContext';
import Loading from './components/Loading';
import { Route, Routes } from 'react-router-dom';
import { appname } from './utils/constants';
// routes
import Home from './pages/Home';
import Page404 from './pages/Page404';
import Header from './components/header/Header';
import Shop from './pages/Shop';
import Single from './pages/Single';
import { connect, useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import apiBackend from './utils/apiBackend';
import actionTypes from './redux/types';
import Checkout from './pages/Checkout';


function App({ loaded }) {
  // TODO: add theme
  const { theme } = React.useContext(ThemeContext)
  const dispatch = useDispatch();
  const isDarkMode = theme === 'dark';

  const { isLoading } = useQuery('shop', () => {
    return apiBackend.initShop();
  }, { onSuccess: function(data) {
    if(data && data.shop) dispatch({ type: actionTypes.loadShop, payload: data })
  }, enabled: !loaded })

  const routes = [
    { path: '/', element: <Home darkMode={isDarkMode} />, exact: true },
    { path: '/shop', element: <Shop darkMode={isDarkMode} />, exact: true },
    { path: '/single/:id', element: <Single darkMode={isDarkMode} />, exact: true },
    { path: '/checkout', element: <Checkout darkMode={isDarkMode} />, exact: true },
  ]


  return (<div className={classNames("page-wrapper", {'bg-dark text-white': isDarkMode})}>
    <header className="page-header">
      <div className={classNames('page-welcome panel wrapper', { 'bg-dark-600': isDarkMode, 'bg-gray-100': !isDarkMode })}>
        <div className='panel header'>
          <div className='greet welcome'>
            <span>Welcome to <strong>{appname}</strong></span>
          </div>
          <div className='contact'>
            <strong style={{fontWeight:'600'}}>Contact us:</strong>
            <a href='tel://+23409028459128'>+2349028459128</a>
          </div>
        </div>
      </div>
      <Header isDarkMode={isDarkMode}/> {/* header menu */}
    </header>
    <Suspense fallback={<Loading/>}>
      <Routes>
        { routes.map((page, idx) => <Route key={idx} {...page} />) }
        <Route path='*' element={<Page404/>} />
      </Routes>
    </Suspense>
    

    <footer className="page-footer">
      <div className={classNames("footer content", { 'bg-gray-100': !isDarkMode, 'bg-dark-600': isDarkMode })}>
        <div className="footer-panel">
          <div className="container">
            <div className="copyright">
              <p>© 2022 {appname} All Right Reserved</p>
              <p>Image credits <a href="apple.com" target="_blank">Apple.com</a></p>
            </div>
            <ul className="social-links">
              <li><a href="#socials" target="_blank"><ion-icon name="logo-facebook"></ion-icon></a></li>
              <li><a href="#socials" target="_blank"><ion-icon name="logo-instagram"></ion-icon></a></li>
              <li><a href="#socials" target="_blank"><ion-icon name="logo-linkedin"></ion-icon></a></li>
              <li><a href="#socials" target="_blank"><ion-icon name="logo-twitter"></ion-icon></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    {(!loaded || isLoading) && <Loading />}
  </div>);
}

export default connect(state => ({ loaded: state.shop.loaded }))(App);
