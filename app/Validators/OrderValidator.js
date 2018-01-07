'use strict'
const Validator = use('Validator')
const Order = use('App/Models/Order')
const Transaction = use('App/Models/Transaction')

const messages = {
  'sell_currency.required': 'Please specify the token for sale.',
  'sell_amount.required': 'Please specify a quantity.',
  'ask_currency.required': 'Please specify the asking token.',
  'ask_price.required': 'Please specify an asking price.',
  'expires.required': 'Please specify an expiration date.',
  'desired_quantity.required': 'Please specify the quantity desired.'
}

class OrderValidator {
  // Validate Sell Orders
  static async validateSellOrder(order, isSigned) {
    const rules = {
      maker: 'hexaddress',
      sell_currency: 'required|sellcurrency',
      sell_amount: 'required|quantity',
      ask_currency: 'required|askcurrency',
      ask_price: 'required|price',
      expires: 'required|expires'
    }
 
    const validation = await Validator.validate(order, rules, messages)
    if (validation.fails()) {
      return { success: false, message: validation.messages() }
    }
    return { success: true }
  }


  // Validate Buy Order Request
  // NOTE: We are not validating an actual order object here, just the request
  static async validateBuyOrderRequest(request) {
    const rules = {
      buyer: 'required|hexaddress',
      fee_processing: 'feeprocessing',
      amount: 'required'
    }

    const validation = await Validator.validate(request, rules, messages)
    if (validation.fails()) {
      return validation.messages()
    }

    let order = await Order.find(request.orderid)
    if (!order) {
      return {
        field: 'orderid',
        message: 'Invalid Order ID',
        validation: 'orderid'
      }
    }
    if (request.amount <= 0) {
      return {
        field: 'amount',
        message: `Desired quantity must be greater than 0.`,
        validation: 'desired_quantity'
      }
    }
    if (order.remaining < request.amount) {
      return {
        field: 'amount',
        message: `Cannot purchase more than ${order.remaining}`,
        validation: 'desired_quantity'
      }
    }

    return { success: true }
  }

  // Validate order can be canceled
  static async validateCancelOrderRequest(order, userid) {
    // Order not found, return error message
    if (order == null) {
      return {
        success: false,
        message: 'Order not found'
      }
    }

    // Order not owned by user, return error
    if (order.maker != userid) {
      return {
        success: false,
        message: 'Requesting user (wallet address) is not Maker'
      }
    }

    // Order not in 'available' status, return error
    if (order.status != 'available') {
      return {
        success: false,
        message: 'Order is not in AVAILABLE status'
      }
    }

    return {
      success: true
    }
  }
}

module.exports = OrderValidator
