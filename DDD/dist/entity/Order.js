"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, costumerId, items) {
        this._items = [];
        this._id = id;
        this._costumerId = costumerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }
    validate() {
        if (this._id === "") {
            throw new Error("Id is required");
        }
        if (this._costumerId === "") {
            throw new Error("CostumerId is required");
        }
        if (this._items.length === 0) {
            throw new Error("Item quantity must be greatter than 0");
        }
        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error("Quantity item is required");
        }
    }
    total() {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
}
exports.default = Order;
