"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const Costumer_1 = __importDefault(require("./Costumer"));
describe("Costumer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let costumer = new Costumer_1.default("", "vitor");
        }).toThrowError("ID é requerido");
    });
    it("should throw error when name is empty", () => {
        expect(() => {
            let costumer = new Costumer_1.default("123", "");
        }).toThrow("Name is required");
    });
    it("should change name", () => {
        let costumer = new Costumer_1.default("654", "Pedro");
        costumer.changeName("Vitor");
        expect(costumer.name).toBe("Vitor");
    });
    it("should activate costumer", () => {
        let costumer = new Costumer_1.default("7654", "Emerique");
        let address = new address_1.default("111", 10, "VFNDJS3", "aLTAMIRA");
        costumer.Address = address;
        costumer.activate();
        expect(costumer.isActive).toBe(true);
    });
    it("should error when address is undefined", () => {
        expect(() => {
            let costumer = new Costumer_1.default("7654", "Emerique");
            costumer.activate();
        }).toThrow("Address is required");
    });
    it("should desactivate costumer", () => {
        let costumer = new Costumer_1.default("7654", "Emerique");
        costumer.desactivate();
        expect(costumer.isActive).toBe(false);
    });
});
