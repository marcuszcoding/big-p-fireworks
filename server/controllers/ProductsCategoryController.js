const { ProductsCategoryModel} = require('../models');

const create = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { category_name } = req.body;
  if ( !category_name ) {
    return res
      .status(400)
      .send({ message: 'Provide category name, Thank you' });
  }

  ProductsCategoryModel.create(category_name)
    .then(product_category => {
      res.status(201).send({ message: 'Created product category!', product_category });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error creating product category', error: error.message });
    });
};

const getAll = (req, res) => {
  ProductsCategoryModel.getAll()
    .then(products_categories => {
      if (products_categories.length === 0) {
        return res.status(200).send({ message: 'No product categorys available!' });
      }

      res.status(200).send({ message: 'List of all product categories!', products_categories });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading product categories', error: error.message });
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  ProductsCategoryModel.getById(id)
    .then(product_category => {
      if (!product_category) {
        return res.status(404).send({ message: 'Product category not found!' });
      }

      res.status(200).send({ message: 'Here is the product category!', product_category });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading product category', error: error.message });
    });
};

const update = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { category_name } = req.body;
  if (!category_name) {
    return res
      .status(400)
      .send({ message: 'Provide category name' });
  }

  const { id } = req.params;

  ProductsCategoryModel.update(category_name)
    .then(product_category => {
      if (!fruit) {
        return res.status(404).send({ message: 'Product category not found!' });
      }

      res.status(201).send({ message: 'Product category updated!', product_category });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error updating product category', error: error.message });
    });
};

const remove = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { id } = req.params;

  ProductsCategoryModel.remove(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error deleting product category', error: error.message });
    });
};

module.exports = { create, getAll, getById, update, remove };
