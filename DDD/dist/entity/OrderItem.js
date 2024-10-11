"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(id, name, productId, price, quantity) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
        this.validate();
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this._price <= 0) {
            throw new Error("Price is required");
        }
        if (this._productId.length === 0) {
            throw new Error("productId is required");
        }
        if (this._quantity <= 0) {
            throw new Error("Quantity item is required");
        }
    }
    changeName(name) {
        this._name = name;
    }
    changePrice(price) {
        this._price = price;
    }
    changeQuantity(quantity) {
        this._quantity = quantity;
    }
    orderItemTotal() {
        return this._price * this._quantity;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    get quantity() {
        return this._quantity;
    }
}
exports.default = OrderItem;
