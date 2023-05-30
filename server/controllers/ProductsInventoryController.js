const products_inventory = require('../db/schemas/products_inventory');
const { ProductsInventoryModel } = require('../models');

const create = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) {
    return res
      .status(400)
      .send({ message: 'Provide product_id and quantity' });
  }

  ProductsInventoryModel.create(product_id, quantity)
    .then(products_inventory => {
      res.status(201).send({ message: 'Created!', products_inventory });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error creating products inventory', error: error.message });
    });
};

const getAll = (req, res) => {
  ProductsInventoryModel.getAll()
    .then(products_inventory => {
      if (products_inventory.length === 0) {
        return res.status(200).send({ message: 'No products in inventory at the moment!' });
      }

      res.status(200).send({ message: 'List of all products in stock!', products_inventory });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading products inventory', error: error.message });
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  ProductsInventoryModel.getById(id)
    .then(products_inventory => {
      if (!products_inventory) {
        return res.status(404).send({ message: 'Product not found in inventory!' });
      }

      res.status(200).send({ message: 'Here is your product!', products_inventory });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading product', error: error.message });
    });
};

const update = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) {
    return res
      .status(400)
      .send({ message: 'Provide product_id and quantity' });
  }

  const { id } = req.params;

  ProductsInventoryModel.update(product_id, quantity, id)
    .then(products_inventory => {
      if (!products_inventory) {
        return res.status(404).send({ message: 'product not found in inventory!' });
      }

      res.status(201).send({ message: 'Updated product inventory!', products_inventory });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error updating product inventory', error: error.message });
    });
};

const remove = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { id } = req.params;

  ProductsInventoryModel.remove(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error deleting product inventory', error: error.message });
    });
};

module.exports = { create, getAll, getById, update, remove };