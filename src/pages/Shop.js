import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Breadcrumb from "../components/Breadcrumb";
import Loading from '../components/Loading';
import Product from '../components/Product';
import apiBackend from '../utils/apiBackend';

function filterProducts(category, products) {
  return (category && !['all'].includes(String(category).toLowerCase())) ? products.filter(x => x.category === category) : products;
}

function useUrlQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Shop({ darkMode }) {
  const isDarkMode = darkMode;

  
  const query = useUrlQuery();
  const { shop } = useSelector(state => state);

  const [products, setProducts] = React.useState(shop.shop.products)
  const [category, setCategory] = React.useState('All');
  const [filter, setFilter] = React.useState('All');
  const [isLoading, setAsync] = React.useState(false);

  function render() {
    const filteredProds = filterProducts(category, products)
    if(filteredProds.length > 0 ) {
      if (filter && !['all'].includes(String(filter).toLowerCase())) return filteredProds.filter(x => x.filter === filter).map(item => <Product item={item} onClickCart={()=>console.log('sds')} key={item.id} />)
      return filteredProds.map(item => <Product item={item} onClickCart={()=>console.log('sds')} key={item.id} />)
    }
    return <p className='empty-product'>0 Products Found</p>
  }

  React.useEffect(() => {
    let catId = query.get('m');
    if(shop.categories.find(x => x.id === catId)) {
      // fetch products with cust param
      setCategory(catId)
    }
  }, [shop.categories, query])

  React.useEffect(() => {
    // proceed
    if(String(category).toLowerCase() === 'all') {
      setProducts(shop.shop.products)
    } else {
      setAsync(true)
      apiBackend.filterProducts(category).then(products => {
        setProducts(products)
        setAsync(false)
      })
    }
  }, [category, shop.shop.products])

  return(<React.Fragment>
    <div className="page-top">
      <Breadcrumb thumbs={['Shop']} />
      <div className={classNames("category-wrapper ", {'bg-dark-600 text-white':isDarkMode, 'bg-gray-100': !isDarkMode})}>
        <div className="container">
          <div className="page-title-wrapper">
            <div className="page-title"><span className="base">Shop</span></div>
          </div>
        </div>
      </div>
    </div>
    <main className='page-main'>
      <div className='columns'>
        <div className='adverts column left'>
          <h4>Advertisements:</h4>
          <div className='row gap-2'>
            {Array.from(Array(3).keys()).map(i => <React.Fragment key={i}>
              <div className='col-sm-12 p-2' style={{border:'1px solid #e3e3e3'}}>
                <div className={classNames('cover', { 'bg-gray-100': !isDarkMode, 'bg-dark-600': isDarkMode })} style={{height:'150px', width:'150px'}} />
                <p>Advert info</p>
              </div>
            </React.Fragment>)}
          </div>
        </div>
        <div className='column main' style={{flexBasis:'100%',maxWidth:'100%'}}>
          <div className='toolbar toolbar-products'>
            <div className='toolbar-sorter sorter'>
              <label className='sorter-label'>Sort By</label>
              {/* TODO: add options */}
              <select value={category} onChange={(event) => { setCategory(event.target.value) }} className="sorter-options mr-3">
                <option>All</option>
                { shop.categories.map((item, idx) => <option key={idx} value={item.id}>{item.name}</option>) }
              </select>
              <select onChange={(event) => setFilter(event.target.value)} className="sorter-options">
                <option>All</option>
                <option value="new">New</option>
                <option value="used">UK Used</option>
              </select>
            </div>
          </div>

          <div className='products wrapper grid products-grid'>
            <ul className='products list item product-items'>
              {/* TODO: filter products and map all */}
              {render()}
            </ul>
          </div>
        </div>
      </div>
    </main>
    { isLoading && <Loading />}
  </React.Fragment>)
}

export default Shop;