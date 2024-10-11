export default class Address{
    _rua:string = "";
    _numero:number = 0;
    _zip:string="";
    _cidade:string="";


    constructor(rua:string, numero:number, zip:string, cidade:string){
        this._rua=rua;
        this._numero=numero;
        this._zip=zip;
        this._cidade=cidade;
        this.validate();
    }


    get rua():string{
        return this._rua;
    }

    get numero():number{
        return this._numero;
    }

    get zip():string{
        return this._zip;
    }

    get cidade():string{
        return this._cidade
    }

validate(){
    if(this._rua.length === 0){
        throw new Error("Rua é querida");
        
    }
    
    if(this._zip.length === 0){
        throw new Error("Zip é querida");
        
    }

    if(this._numero === 0){
        throw new Error("Numero é querida");
        
    }

    if(this._cidade.length === 0){
        throw new Error("Cidade é querida");
        
    }
}


toString(){
    return `${this._rua}, ${this._numero}, ${this._zip}, ${this._cidade}`
}

}