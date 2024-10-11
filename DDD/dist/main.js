"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./entity/address"));
const Costumer_1 = __importDefault(require("./entity/Costumer"));
const Order_1 = __importDefault(require("./entity/Order"));
const OrderItem_1 = __importDefault(require("./entity/OrderItem"));
const address = new address_1.default("Rua 3", 2, "12w2342", "Pará");
let costumer = new Costumer_1.default("123", "Vitor Torres", address);
costumer.activate();
costumer.changeName("Pedro marcos");
const order1 = new OrderItem_1.default("1", "Item 1", 100);
const order3 = new OrderItem_1.default("2", "Item 2", 150);
const order = new Order_1.default("1", "123", [order1, order3]);
