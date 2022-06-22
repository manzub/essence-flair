const products = [
  {
    id:1,
    name: 'Iphone 12',
    image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=90&.v=1617135051000',
    category: 'Phones & Tablets',
    filter: 'new',
    description: {
      text: 'Iphone 12 \n Color: red, Storage: 128gb',
      color: ['red','space gray'],
      storage: ['64gb','128gb']
    },
    price: '350000'
  }
];

const navigationmenu = [
  {id:'1',name:'Smart Phones'},
  {id: "2", name: "Smart Watches"},
  {id: "3", name: "Laptops & Desktops"},
  {id: "4", name: "Accessories"},
  {id: "5", name: "Video Games"}
]; 

const widgetsmenu = [
  { catid: 1, name: 'Phones& Tablets', pricerange: ['70', '100'], image: 'banners/banner-3.jpg' },
  { catid: 2, name: 'Smart Watches', pricerange: ['100', '300'], image: 'banners/banner-2.jpg' },
  { catid: 4, name: 'Video Games', pricerange: ['10', '40'], image: 'banners/banner-4.jpg' },
  { catid: 5, name: 'Accessories', pricerange: ['20', '400'], image: 'banners/banner-5.jpg' }
]

const occassionsmenu = [
  { catid: 5, name: 'Portable Audio', image: 'banners/banner-7.jpg' },
  { catid: 1, name: 'Cellphones', image: 'banners/banner-8.jpg' },
  { catid: 5, name: 'Headphones', image: 'banners/banner-9.jpg' }
]

const testuser = {
  email: 'test@gmail.com', password: '123456', phone: '09028459128', address: 'sokale garden'
}

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }


module.exports = {
  products,
  testuser,
  navigationmenu,
  widgetsmenu,
  occassionsmenu,
  appname:'Gadgets.com',
}