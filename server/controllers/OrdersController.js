const { OrdersModel } = require('../models');

const create = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const {user_id, created_at, order_status} = req.body;
  if (!user_id || !created_at || !order_status) {
    return res
      .status(400)
      .send({ message: 'Provide user, timestamp and order status to create a order' });
  }

  OrdersModel.create(user_id, created_at, order_status)
    .then(order => {
      res.status(201).send({ message: 'Created!', order });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error creating order', error: error.message });
    });
};

const getAll = (req, res) => {
  OrdersModel.getAll()
    .then(orders => {
      if (orders.length === 0) {
        return res.status(200).send({ message: 'No orders available!' });
      }

      res.status(200).send({ message: 'List of all orders!', orders });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading orders', error: error.message });
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  OrdersModel.getById(id)
    .then(order => {
      if (!order) {
        return res.status(404).send({ message: 'Order not found!' });
      }

      res.status(200).send({ message: 'Here is your order!', order });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error reading order', error: error.message });
    });
};

const update = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { order_status } = req.body;
  if (!order_status) {
    return res
      .status(400)
      .send({ message: 'Provide an order status' });
  }

  const { id } = req.params;

  OrdersModel.update(order_status, id)
    .then(order => {
      if (!order) {
        return res.status(404).send({ message: 'Order not found!' });
      }

      res.status(201).send({ message: 'Updated!', order });
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

  OrdersModel.remove(id)
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