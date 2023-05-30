const { DiscountsModel} = require('../models');

const create = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { product_id, category_id, discount_percentage, discount_type, start_date, end_date } = req.body;
  if (!product_id || !category_id || !discount_percentage || !discount_type || !start_date || !end_date) {
    return res
      .status(400)
      .send({ message: 'Provide product_id, category_id, discount_percentage, discount_type, start_date, end_dateto create discount' });
  }

  DiscountsModel.create(product_id, category_id, discount_percentage, discount_type, start_date, end_date)
    .then(discount => {
      res.status(201).send({ message: 'Created!', discount });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error creating discount', error: error.message });
    });
};

const getAll = (req, res) => {
  DiscountsModel.getAll()
    .then(discounts => {
      if (discounts.length === 0) {
        return res.status(200).send({ message: 'No discounts available!' });
      }

      res.status(200).send({ message: 'List of all discounts!', discounts });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading discounts', error: error.message });
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  DiscountsModel.getById(id)
    .then(discount => {
      if (!discount) {
        return res.status(404).send({ message: 'Discount not found!' });
      }

      res.status(200).send({ message: 'Here is the discount!', discount });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading discount', error: error.message });
    });
};

const update = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { product_id, category_id, discount_percentage, discount_type, start_date, end_date } = req.body;
  if (!product_id || !category_id || !discount_percentage || !discount_type || !start_date || !end_date) {
    return res
      .status(400)
      .send({ message: 'Provide product_id, category_id, discount_percentage, discount_type, start_date, end_dateto create discount' });
  }

  const { id } = req.params;

  DiscountsModel.update(product_id, category_id, discount_percentage, discount_type, start_date, end_date )
    .then(discount => {
      if (!discount) {
        return res.status(404).send({ message: 'Discount not found!' });
      }

      res.status(201).send({ message: 'Updated!', discount });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error updating discount', error: error.message });
    });
};

const remove = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { id } = req.params;

  DiscountsModel.remove(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error deleting discount', error: error.message });
    });
};

module.exports = { create, getAll, getById, update, remove };
