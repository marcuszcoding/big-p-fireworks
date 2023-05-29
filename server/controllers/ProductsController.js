const { ProductsModel } = require('../models');

const create = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  const { name, color, emoji } = req.body;
  if (!name || !color || !emoji) {
    return res
      .status(400)
      .send({ message: 'Provide name, color and emoji to create a fruit' });
  }

  ProductsModel.create(userId, name, color, emoji)
    .then(fruit => {
      res.status(201).send({ message: 'Created!', fruit });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error creating fruit', error: error.message });
    });
};

const getAll = (req, res) => {
  ProductsModel.getAll()
    .then(products => {
      if (products.length === 0) {
        return res.status(200).send({ message: 'No products available!' });
      }

      res.status(200).send({ message: 'List of all products!', products });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading products', error: error.message });
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  ProductsModel.getById(id)
    .then(product => {
      if (!product) {
        return res.status(404).send({ message: 'Product not found!' });
      }

      res.status(200).send({ message: 'Here is your product!', product });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading product', error: error.message });
    });
};

const update = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  const { name, color, emoji } = req.body;
  if (!name || !color || !emoji) {
    return res
      .status(400)
      .send({ message: 'Provide name, color and emoji to update a fruit' });
  }

  const { id } = req.params;

  ProductsModel.update(name, color, emoji, id)
    .then(fruit => {
      if (!fruit) {
        return res.status(404).send({ message: 'Fruit not found!' });
      }

      res.status(201).send({ message: 'Updated!', fruit });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error updating fruit', error: error.message });
    });
};

const remove = (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).send({ message: 'User is not logged in' });
  }

  const { id } = req.params;

  ProductsModel.remove(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error deleting fruit', error: error.message });
    });
};

module.exports = { create, getAll, getById, update, remove };