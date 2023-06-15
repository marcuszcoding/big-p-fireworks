const { OrderDetailsModel } = require('../models');


const create = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }
console.log(req.body)
  const { order_id, product_id, quantity, price, tax, product_total_price, subtotal, grand_total } = req.body;
  if (!order_id || !product_id || !quantity || !price || !product_total_price || !tax || !subtotal || !grand_total) {
    return res
      .status(400)
      .send({ message: 'Provide order_id, product_id, quantity, price, product_total_price, tax, subtotal, grand_total' });
  }
  
  OrderDetailsModel.create(order_id, product_id, quantity, price, tax, product_total_price, subtotal, grand_total)
    .then(order_details => {
      res.status(201).send({ message: 'Created!', order_details });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error creating order', error: error.message });
    });
};

const getAll = (req, res) => {
  OrderDetailsModel.getAll()
    .then(order_details => {
      if (order_details.length === 0) {
        return res.status(200).send({ message: 'No order details!' });
      }

      res.status(200).send({ message: 'List of all orders!', order_details });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading orders details', error: error.message });
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  OrderDetailsModel.getById(id)
    .then(order_details => {
      if (!order_details) {
        return res.status(404).send({ message: 'Order details not found!' });
      }

      res.status(200).send({ message: 'Here is your order detail!', order_details });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading order details', error: error.message });
    });
};

const update = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { quantity, price } = req.body;
  if (!quantity || !price) {
    return res
      .status(400)
      .send({ message: 'Provide quantity and price' });
  }

  const { id } = req.params;

  OrderDetailsModel.update(quantity, price, id)
    .then(order_details => {
      if (!order_details) {
        return res.status(404).send({ message: 'Order detail not found!' });
      }

      res.status(201).send({ message: 'Updated!', order_details });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error updating order status', error: error.message });
    });
};

const remove = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { id } = req.params;

  OrderDetailsModel.remove(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error deleting order', error: error.message });
    });
};

module.exports = { create, getAll, getById, update, remove };