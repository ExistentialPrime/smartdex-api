'use strict'
const BigNumber = require('bignumber.js')
const Order = use('App/Models/Order')
const OrderValidator = use('App/Validators/OrderValidator')
const Transaction = use('App/Models/Transaction')

class OrdersController {
  // GET /orders
  // -------------------------------------------------
  // Return all orders
  // Verb: GET
  // Route: /orders
  // Parameters:
  //  - per_page- Integer specifying the number of records to return per page
  //  - page - Integer specifying the page to display
  // Example: /orders?per_page=5&page=1
  // -------------------------------------------------
  async index({ request }) {
    return await Order.query().paginate(
      request.input('page', 1),
      request.input('per_page', 5)
    )
  }

  // GET /orders/:id
  // -------------------------------------------------
  // Return a specific order based on id
  // Verb: GET
  // Route: /orders/:id
  // Parameters:
  //  - :id - the id of the order to retrieve
  // Example: /orders/1234567890
  // -------------------------------------------------
  async show({ params }) {
    let order = await Order.find(params.id)
    order.transactions = await order.transactions().fetch()
    return order
  }

  // POST /orders
  // -------------------------------------------------
  // Enter a new order into the system
  // Verb: POST
  // Route: /orders
  // Parameters:
  //  - none
  // Example: POST /orders
  // -------------------------------------------------
  async store({ request, response }) {
    let newOrder = request.order;

    return (
      newOrder
        .save()
        // Success Case
        .then(() => {
          response.json({
            success: true,
            id: newOrder.id
          })
        })
        // Failure Case
        .catch(error => {
          response.json({
            success: false,
            message: error.message
          })
        })
    )
  }

  // PUT /orders/:id/cancel
  // -------------------------------------------------
  // Cancel a specific order based on id
  // Verb: PUT
  // Route: /orders/:id/cancel
  // Parameters:
  //  - :id - the id of the order to cancel
  // Example: PUT /orders/1234567890/cancel
  // -------------------------------------------------
  async cancel({ params, request, response }) {
    let userid = params.userid

    // Find the order specified and owned by the requester (userid = wallet address)
    let query = await Order.query()
      .where('id', '=', params.id)
      .where('maker', '=', userid)
      .fetch()

    let order = query.first()

    let validator = await OrderValidator.validateCancelOrderRequest(
      order,
      userid
    )
    if (validator.success !== true) {
      return response.json({
        success: false,
        message: validator.message
      })
    }

    // Save the order update to database
    return (
      order
        .save()
        // Success case
        .then(() => {
          response.json({
            success: true,
            id: params.id
          })
        })
        // Failure case
        .catch(error => {
          response.json({
            success: false,
            message: error.message
          })
        })
    )
  }

  // GET /orders/:id/transactions
  // -------------------------------------------------
  // Get all transactions associated with an order
  // Verb: GET
  // Route: /orders/:id/transactions
  // Parameters:
  //  - :id - the id of the order to get txs for
  // Example: /orders/1234567890/transaction
  // -------------------------------------------------
  async transactionIndex({ params }) {
    return await Transaction.findBy('order_id', params.id)
  }

  // POST /orders/:id/transactions
  // -------------------------------------------------
  // Add a transaction to an order
  // Verb: POST
  // Route: /orders/:id/transactions
  // Parameters:
  //  - :id - the id of the order to create a tx for
  // Example: POST /orders/1234567890/transaction
  // -------------------------------------------------
  async transactionStore({ params, response }) {
    // Fetch the related order
    let query = await Order.query()
      .where('id', '=', params.id)
      .fetch()
    let order = query.first()

    // Create a transaction for the specified order
    let newTx = this.params.tx

    // Save the order update to database
    return (
      newTx
        .save()
        // Success case
        .then(() => {
          response.json({
            success: true,
            id: newTx.id
          })
        })
        // Failure case
        .catch(error => {
          response.json({
            success: false,
            message: error.message
          })
        })
    )
  }

}

module.exports = OrdersController
