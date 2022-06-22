import axios from "axios";

const backendUrl = 'http://wisdoms-macbook-pro.local/gadgets.com/api';

const authActions = {
  async signin(email, password) {
    const response = await axios.post(`${backendUrl}/loginuser`, { email, password }, { headers: {
      'Content-Type': 'multipart/form-data'
    } })
    return response.data;
  }
}

const shopActions = {
  async recordSale(productId, userId, qty, price) {
    const response = await axios.post(`${backendUrl}/recordsale`, { productId, userId, qty, price }, { headers: {
      'Content-Type': 'multipart/form-data'
    } })
    return response.data;
  },
  async listProducts(page = 0) {
    const response = await axios.get(`${backendUrl}/listproducts/${page}`)
    let shop = response.data;
    const products = shop.products.map((item) => {
      return { 
        id: item.id, name: item.name, image: item.image, 
        category: item.category, filter: item.filter,
        description: { text: item.desc_text, color: item.colors.split(","), storage: item.storage.split(",") },
        price: item.price, stock: item.stock
      }
    })

    return { products, pages: shop.pages }
  },
  async getProduct(productId) {
    const response = await axios.get(`${backendUrl}/product/${productId}`)
    let product_raw = response.data.product;
    const product = product_raw.map((item) => {
      return { 
        id: item.id, name: item.name, image: item.image, 
        category: item.category, filter: item.filter,
        description: { text: item.desc_text, color: item.colors.split(","), storage: item.storage.split(",") },
        price: item.price, stock: item.stock
      }
    })
    return product[0]
  },
  async filterProducts(category) {
    let catId = category;
    if(String(category).toLowerCase() === 'all') catId = 0;
    const response = axios.get(`${backendUrl}/filterproducts/${catId}`)
    return (await response).data.products
  },
  async shopCategories() {
    const response = await axios.get(`${backendUrl}/listshopmenus`)
    return response.data
  },
  async initShop() {
    let response = await this.shopCategories()
    let shop = await this.listProducts();
    return { categories:response.categories, shop }
  }
}

const apiBackend = {
  ...authActions,
  ...shopActions
};

export default apiBackend