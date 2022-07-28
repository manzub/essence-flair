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
import { connect } from 'react-redux';
// import { useQuery } from 'react-query';
// import apiBackend from './utils/apiBackend';
// import actionTypes from './redux/types';
import Checkout from './pages/Checkout';


function App({ loaded }) {
  // TODO: add theme
  const { theme } = React.useContext(ThemeContext)
  // const dispatch = useDispatch();
  const isDarkMode = theme === 'dark';

  const routes = [
    { path: '/', element: <Home darkMode={isDarkMode} />, exact: true },
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
            <a href='tel://+2349013944786'>+234 901 394 4786</a>
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
              <p>Image credits <a href="https://www.chanel.com/us/fragrance/women/c/7x1x1/" target="_blank" rel="noreferrer">Chanel Perfumes</a></p>
            </div>
            <ul className="social-links">
              <li><a href="https://www.facebook.com/profile.php?id=100083642448133" target="_blank" rel="noreferrer"><ion-icon name="logo-facebook"></ion-icon></a></li>
              <li><a href="https://www.instagram.com/invites/contact/?i=dd3cru05mg5h&utm_content=oyl4q4r" target="_blank" rel="noreferrer"><ion-icon name="logo-instagram"></ion-icon></a></li>
              <li><a href="https://vm.tiktok.com/ZMNQvg6AN/" target="_blank" rel="noreferrer"><ion-icon name="logo-tiktok"></ion-icon></a></li>
              <li><a href="https://twitter.com/EssenceFlair_?t=eB_4gl-yX9O5mOapvIEubA&s=09" target="_blank" rel="noreferrer"><ion-icon name="logo-twitter"></ion-icon></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    {(!loaded) && <Loading />}
  </div>);
}

export default connect(state => ({ loaded: state.shop.loaded }))(App);
