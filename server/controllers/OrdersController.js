const { OrdersModel, OrderDetailsModel, ProductsModel } = require('../models');

const sgMail = require('@sendgrid/mail');
const order_details = require('../db/schemas/order_details');
sgMail.setApiKey('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');

const create = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const {user_id} = req.body;
  if (!user_id) {
    return res
      .status(400)
      .send({ message: 'Provide user to create a order' });
  }

  OrdersModel.create(user_id)
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

const sendEmail = (req, res) => {
  const {id} = req.params
  OrderDetailsModel.getByOrderId(id)
  .then( (order_details) => {

    console.log(order_details)
    
      const msg = {
        from: {
          email: "marcuszcoding@gmail.com"
        }, 
        personalizations: [
          {
            to: [
              {
                email: "marcuszcoding@gmail.com",
              }
            ], 
            dynamic_template_data: {
              orderId: order_details[0].order_id,
              order_details,
              subtotal: order_details[0].subtotal,
              grand_total: order_details[0].grand_total,
              tax: order_details[0].tax
            }
          }
        ],
        template_id: "d-17bcbf71bb3e46d7ac6a0b4fa0efbe65"
      };
      return sgMail.send(msg)
    })
  .catch(error => {
    console.log(error.message);
    res
      .status(500)
      .send({ message: 'Error creating order', error: error.message });
  });

}

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

module.exports = { create, getAll, getById, update, remove, sendEmail };

      // const msg = {
      //   to: 'marcuszcoding@gmail.com',// the user in the argument
      //   from: 'marcuszcoding@gmail.com', 
      //   subject: 'Order Confirmed!',
      //   text: 'Thank you for shopping at Big P Fireworks',
      //   html: `<strong>Your order #${order_id} has been confirmed</strong>`,
      // };