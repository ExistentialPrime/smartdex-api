"use strict";
const Order = use("App/Models/Order");
const Transaction = use("App/Models/Transaction");

class AccountsController {
  // GET /accounts/:id/orders
  // -------------------------------------------------
  // Return all orders for a specific account based on id
  // Verb: GET
  // Route: /accounts/:id/orders
  // Parameters:
  //  - :id - the id of the account
  // Example: /accounts/user1234567/orders
  // -------------------------------------------------
  async orders({ params, response }) {
    return await Order.findBy("maker", params.id);
  }

  // GET /accounts/:id/transactions
  // -------------------------------------------------
  // Return all transactions for a specific account based on id
  // Verb: GET
  // Route: /accounts/:id/transactions
  // Parameters:
  //  - :id - the id of the account
  // Example: /accounts/user1234567/transactions
  // -------------------------------------------------
  async transactions({ params, response }) {
    return await Transaction.query()
			.where("taker", params.id)
      .orWhere("maker", params.id)
      .fetch();
  }
}

module.exports = AccountsController;
