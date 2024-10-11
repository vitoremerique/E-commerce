"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("./Order"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order_1.default("", "1", []);
        }).toThrowError("Id is required");
    });
    it("should throw error when Costumer id is empty", () => {
        expect(() => {
            let order = new Order_1.default("234", "", []);
        }).toThrowError("CostumerId is required");
    });
    it("Item quantity ", () => {
        expect(() => {
            let order = new Order_1.default("234", "12", []);
        }).toThrowError("Item quantity must be greatter than 0");
    });
    it("Should calculate total ", () => {
        let item = new OrderItem_1.default("1", "batata", "1", 10, 2);
        let item2 = new OrderItem_1.default("2", "batataa", "2", 100, 2);
        let order = new Order_1.default("234", "12", [item]);
        let total = order.total();
        expect(total).toBe(20);
        let order2 = new Order_1.default("123", "56", [item, item2]);
        total = order2.total();
        expect(total).toBe(220);
    });
    it("Should throw error if  the item quantity is greater than 0 ", () => {
        expect(() => {
            let item = new OrderItem_1.default("1", "batata", "1", 10, 0);
            let order = new Order_1.default("234", "12", [item]);
        }).toThrowError("Quantity item is required");
    });
});
