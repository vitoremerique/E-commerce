"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Address {
    constructor(rua, numero, zip, cidade) {
        this._rua = "";
        this._numero = 0;
        this._zip = "";
        this._cidade = "";
        this._rua = rua;
        this._numero = numero;
        this._zip = zip;
        this._cidade = cidade;
        this.validate();
    }
    validate() {
        if (this._rua.length === 0) {
            throw new Error("Rua é querida");
        }
        if (this._zip.length === 0) {
            throw new Error("Zip é querida");
        }
        if (this._numero === 0) {
            throw new Error("Numero é querida");
        }
        if (this._cidade.length === 0) {
            throw new Error("Cidade é querida");
        }
    }
    toString() {
        return `${this._rua}, ${this._numero}, ${this._zip}, ${this._cidade}`;
    }
}
exports.default = Address;
