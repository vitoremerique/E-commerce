"use strict";
class Costumer {
    constructor(id, name, address) {
        this._active = true;
        this._id = id;
        this._name = name;
        this._address = address;
    }
    //Métodos padrões orientado a objetos
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get address() {
        return this._address;
    }
    set name(name) {
        this._name = name;
    }
    set address(address) {
        this._address = address;
    }
    //Regras de negócio
    changeName(name) {
        this._name = name;
    }
    activate() {
        this._active = true;
    }
    desactivate() {
        this._active = false;
    }
}
let pessoa = new Costumer("1", "Vitor", "Antonio justa");
console.log(pessoa);
