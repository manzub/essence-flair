const navigationmenu = [
  {id:'1',name:'Parfum'},
  {id: "2", name: "Bath & Shower"},
  {id: "3", name: "Body Care"},
  {id: "4", name: "Hair"},
  {id: "5", name: "Deodorant"}
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
  email: 'test@gmail.com', password: '123456', phone: '+234 901 394 4786', address: 'sokale garden'
}

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }


module.exports = {
  testuser,
  navigationmenu,
  widgetsmenu,
  occassionsmenu,
  appname:'Essence Flair',
}