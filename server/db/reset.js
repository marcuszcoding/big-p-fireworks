require('dotenv').config();
const { db } = require('./index');

const usersSchema = require('./schemas/usersSchema');

const usersSchema = require('./schemas/users')
const usersSeeds = require('./seeds/usersSeeds');

const productsSchema = require('./schema/products')
const productsSeeds = require('./seeds/productsSeeds')

const productsInventorySchema = require('./schemas/products_inventory')
const productsInventorySeeds= require('./seeds/productsInventorysSeeds')

const productsCategoriesSchema = require('./schemas/products_categories')
const productsCategoriesSeeds = require('./seeds/productsCategoriesSeeds')

const cartItemsSchema = require('./schemas/cart_items')

const discountsSchema = require ('./schemas/discounts')

const orderDetailsSchema = require('./schemas/order_details')

const orderSchema = require('./schemas/order_details')


db.connect();

const promises = [
  db.query(usersSchema),
  db.query(usersSeeds),
  db.query(productsSchema),
  db.query(productsSeeds),
  db.query(productsCategoriesSchema),
  db.query(productsCategoriesSeeds),
  db.query(productsInventorySchema),
  db.query(productsInventorySeeds),
  db.query(discountsSchema),
  db.query(orderSchema),
  db.query(orderDetailsSchema),
  db.query(cartItemsSchema),

];

Promise.all(promises)
  .then(() => console.log('DB reset completed!'))
  .then(() => db.end())
  .catch(err => console.log('Failed to reset', err));