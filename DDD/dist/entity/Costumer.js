"use strict";
//Complexidade de negócio
//Domain
// - Entity -> Foca no dominínio
//- - Costumer.ts (regras de negócio)
Object.defineProperty(exports, "__esModule", { value: true });
//Complexidade acidental
// infra -> Fala com o mundo externo
// - Entity/Model
// - - costumer.ts (get,set)
class Costumer {
    constructor(id, name) {
        this._active = false;
        this._id = id;
        this._name = name;
        this.validate();
    }
    validate() {
        if (this._id.length === 0) {
            throw new Error("ID é requerido");
        }
        if (this._name.length === 0) {
            throw new Error("Name is requiredo");
        }
    }
    //Regras de negócio
    changeName(name) {
        this._name = name;
        this.validate();
    }
    activate() {
        if (this._address === undefined) {
            throw new Error("Address is required");
        }
        this._active = true;
    }
    desactivate() {
        this._active = false;
    }
    //Métodos padrões orientado a objetos INFRA
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get address() {
        return this._address;
    }
    get isActive() {
        return this, this._active;
    }
    set name(name) {
        this._name = name;
    }
    set Address(address) {
        this._address = address;
    }
}
exports.default = Costumer;
