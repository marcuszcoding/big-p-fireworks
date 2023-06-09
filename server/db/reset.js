require('dotenv').config();
const { db } = require('./index');

const usersSchema = require('./schemas/users')
const usersSeeds = require('./seeds/usersSeeds');

const productsSchema = require('./schemas/products')
const productsSeeds = require('./seeds/productsSeeds')

const productsInventorySchema = require('./schemas/products_inventory')
const productsInventorySeeds= require('./seeds/productsInventorySeeds')

const productsCategoriesSchema = require('./schemas/products_categories')
const productsCategoriesSeeds = require('./seeds/productsCategoriesSeeds')

const cartItemsSchema = require('./schemas/cart_items')

const discountsSchema = require ('./schemas/discounts')

const orderDetailsSchema = require('./schemas/order_details')

const orderSchema = require('./schemas/orders')


db.connect();

const promises = [
  db.query(usersSchema),
  db.query(productsCategoriesSchema),
  db.query(productsSchema),
  db.query(productsInventorySchema),
  db.query(discountsSchema),
  db.query(orderSchema),
  db.query(orderDetailsSchema),
  db.query(cartItemsSchema),
  db.query(usersSeeds),
  db.query(productsCategoriesSeeds),
  db.query(productsSeeds),
  db.query(productsInventorySeeds),

];

Promise.all(promises)
  .then(() => console.log('DB reset completed!'))
  .then(() => db.end())
  .catch(err => console.log('Failed to reset', err));