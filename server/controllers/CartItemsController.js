const { CartItemsModel } = require('../models');

const create = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { user_id, product_id, quantity } = req.body;
  if (!user_id || !product_id || !quantity) {
    return res
      .status(400)
      .send({ message: 'Provide user_id, product_id and quantity of the item you want to create a cart item' });
  }

  CartItemsModel.create(user_id, product_id, quantity)
    .then(cart_item => {
      res.status(201).send({ message: 'Created!', cart_item });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error creating cart item', error: error.message });
    });
};

const getAll = (req, res) => {
  CartItemsModel.getAll()
    .then(cart_items => {
      if (cart_items.length === 0) {
        return res.status(200).send({ message: 'No products in the cart at the moment!' });
      }

      res.status(200).send({ message: 'List of all products in cart!', cart_items });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading products in cart', error: error.message });
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  CartItemsModel.getById(id)
    .then(cart_items => {
      if (!cart_items) {
        return res.status(404).send({ message: 'Cart not found!' });
      }

      res.status(200).send({ message: 'Here is your cart!', cart_items });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading cart', error: error.message });
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
      .send({ message: 'Provide a product and quantity of the product you want to update the cart' });
  }

  const { id } = req.params;

  CartItemsModel.update( product_id, quantity, id)
    .then(cart_items => {
      if (!cart_items) {
        return res.status(404).send({ message: 'Cart not found!' });
      }

      res.status(201).send({ message: 'Updated!', cart_items });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error updating cart!', error: error.message });
    });
};

const remove = (req, res) => {
  const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { id } = req.params;

  CartItemsModel.remove(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error deleting cart', error: error.message });
    });
};

module.exports = { create, getAll, getById, update, remove };