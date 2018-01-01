"use strict";

const Model = use("Model");

class Order extends Model {
  transactions() {
    return this.hasMany("App/Models/Transaction", "id", "order_id");
  }
}

module.exports = Order;
