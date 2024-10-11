//Complexidade de negócio
//Domain
// - Entity -> Foca no dominínio
//- - Costumer.ts (regras de negócio)

import Address from "./address";


//Complexidade acidental
// infra -> Fala com o mundo externo
// - Entity/Model
// - - costumer.ts (get,set)

export default class Customer{
    

   private _id:string;
   private _name:string;
   private _address!:Address;
   private _active:boolean = false;
   private _rewardPoints = 0;

constructor(id:string, name:string){
    this._id=id;
    this._name=name;
    this.validate();
}

validate(){
    if(this._id.length === 0){
        throw new Error("ID é requerido");
    }
    
    
    if(this._name.length === 0){
        throw new Error("Name is requiredo");
    }


}

//Regras de negócio

changeAddress(address: Address) {
    this.Address = address
}



changeName(name:string){
    this._name=name;
    this.validate();
}

activate(){
    
    if(this._address === undefined){
        throw new Error("Address is required");
    }

    this._active=true;
    
}

desactivate(){
    this._active=false;
}

add_rewardPoints(Points:number){
    this._rewardPoints +=Points 
}

//Métodos padrões orientado a objetos INFRA
get id():string{
    return this._id;
}

get rewardPoints():number{
    return this._rewardPoints
}

get name():string{
    return this._name;
}

get address():Address{
    return this._address;
}

 isActive():boolean{
    return this._active;
}

set name(name:string){
    this._name = name;
}



set Address(address:Address){
    this._address=address;
}




}

