const { ProductsModel } = require('../models');

const create = (req, res) => {
  const { userId } = req;

  const { category_id, product_name, price, description, video_url, image_url } = req.body;
  if (!category_id || !product_name || !price || !description || !video_url || !image_url) {
    return res
      .status(400)
      .send({ message: 'Provide category_id, product_name, price, description, video_url, image_url' });
  }

  ProductsModel.create(category_id, product_name, price, description, video_url, image_url)
    .then(product => {
      res.status(201).send({ message: 'Created product!', product });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error creating product', error: error.message });
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
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { category_id, product_name, price, description, video_url, image_url } = req.body;
  if (!category_id || !product_name || !price || !description || !video_url || !image_url) {
    return res
      .status(400)
      .send({ message: 'Provide category_id, product_name, price, description, video_url and image_url' });
  }

  const { id } = req.params;

  ProductsModel.update(category_id, product_name, price, description, video_url, image_url)
    .then(product => {
      if (!product) {
        return res.status(404).send({ message: 'Product not found!' });
      }

      res.status(201).send({ message: 'Updated product!', product });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error updating product', error: error.message });
    });
};

const remove = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { id } = req.params;

  ProductsModel.remove(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error deleting product', error: error.message });
    });
};

module.exports = { create, getAll, getById, update, remove };