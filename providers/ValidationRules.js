'use strict'
const { ServiceProvider } = require('@adonisjs/fold')
const Environment = use('App/Models/Environment')
const moment = use('moment')
const BigNumber = require('bignumber.js')

// ---------------------------------------------------------------
// Validation rules for specific fields
//
// Importing: import via the PROVIDERS section of app.js
// const ValidatorExtensions = use('App/Validators/Extensions');
// const providers = [
//  	path.join(__dirname, '..', 'providers', 'CustomValidationRules')
// ];
// ---------------------------------------------------------------

class CustomValidationRulesProvider extends ServiceProvider {
  // Price
  price(data, field, message, args, get) {
    return new Promise((resolve, reject) => {
      if (isNaN(get(data, field)) || get(data, field) <= 0) {
        reject('Please enter a valid price.')
        return
      }
      resolve()
    })
  }

  // Quantity
  quantity(data, field, message, args, get) {
    return new Promise((resolve, reject) => {
      const balance = get(data, 'balance')
      const quantity = get(data, field)
      if (isNaN(quantity) || quantity <= 0) {
        reject('Please enter a valid quantity.')
        return
      }
      if (parseFloat(balance) < parseFloat(quantity)) {
        reject('Insufficient balance in your wallet.')
        return
      }
      resolve()
    })
  }

  // Sell Currency
  sellcurrency(data, field, message, args, get) {
    return new Promise((resolve, reject) => {
      const value = get(data, field)
      if (!Environment['currencies'].includes(value)) {
        reject('Invalid sell token type.')
        return
      }
      resolve()
    })
  }

  // Ask Currency
  askcurrency(data, field, message, args, get) {
    return new Promise((resolve, reject) => {
      const value = get(data, field)
      let currencies = ['WETH']
      if (!currencies.includes(value)) {
        reject('Invalid ask token type.')
        return
      }
      resolve()
    })
  }

  // Fee Processing
  feeprocessing(data, field, message, args, get) {
    return new Promise((resolve, reject) => {
      const value = get(data, field)
      let options = ['ETH', 'ZRX']
      if (!options.includes(value)) {
        reject('Invalid fee processing method.')
        return
      }
      resolve()
    })
  }

  // Expires
  expires(data, field, message, args, get) {
    return new Promise((resolve, reject) => {
      const date = moment(get(data, field))
      if (!date.isValid()) {
        reject('You must provide a valid date.')
        return
      }
      if (!date.isBefore(moment().add(10, 'day'))) {
        reject('Expiration date cannot be more than 10 days from now.')
        return
      }
      if (date.isBefore(moment())) {
        reject('Expiration date must be in the future.')
        return
      }
      resolve()
    })
  }

  // Bootstrap all of our custom validation rules here
  boot() {
    const Validator = use('Validator')
    Validator.extend('price', this.price.bind(this))
    Validator.extend('quantity', this.quantity.bind(this))
    Validator.extend('sellcurrency', this.sellcurrency.bind(this))
    Validator.extend('askcurrency', this.askcurrency.bind(this))
    Validator.extend('feeprocessing', this.feeprocessing.bind(this))
    Validator.extend('expires', this.expires.bind(this))
  }
}

module.exports = CustomValidationRulesProvider
