const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const msg = {
  to: 'marcuszcoding@gmail.com',
  from: 'marcuszcoding@gmail.com', // Use the email address or domain you verified above
  subject: 'Order Confirmed',
  text: 'hello there marcus welcome to big D fireworks',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // "mail_settings": {
  //     "sandbox_mode": {
  //         "enable": true
  //     }
  // }
};


const { OrderDetailsModel } = require('../models');


const create = (req, res) => {
  // const { userId } = req.session;
  // if (!userId) {
  //   return res.status(401).send({ message: 'User is not logged in' });
  // }

  const { order_id, product_id, quantity, price } = req.body;
  if (!order_id || !product_id || !quantity || !price) {
    return res
      .status(400)
      .send({ message: 'Provide order_id, product_id, quantity, price' });
  }
  sgMail
    .send(msg)
    .then((data) => {
      console.log("data", data)
    })
    .catch((err) => {
      console.log("errerrerrerr--", err)
    })
  // OrderDetailsModel.create(order_id, product_id, quantity, price)
  //   .then(order_details => {
  //     res.status(201).send({ message: 'Created!', order_details });
  //   })
  //   .catch(error => {
  //     console.log(error.message);
  //     res
  //       .status(500)
  //       .send({ message: 'Error creating order', error: error.message });
  //   });
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