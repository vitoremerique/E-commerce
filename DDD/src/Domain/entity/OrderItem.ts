export default class OrderItem{
  private  _id:string;
  private _productId:string;
  private  _name:string;
  private _price:number;
  private _quantity:number;

    constructor(id:string,name:string,productId:string,price:number,quantity:number){
        this._id=id;
        this._name=name;
        this._price=price;
        this._productId=productId
        this._quantity=quantity
        this.validate();
    }

    validate(){
        if(this._id.length === 0){
            throw new Error("Id is required");
        }
        if(this._name.length === 0){
            throw new Error("Name is required")
        }

        if(this._price <= 0){
            throw new Error("Price is required")
        }

        if(this._productId.length === 0){
            throw new Error("productId is required")
        }

        if(this._quantity <=0){
            throw new Error("Quantity item is required")
        }

    }

    changeName(name:string){
        this._name=name
    }

    changePrice(price:number){
        this._price=price;
    }

    changeQuantity(quantity:number){
        this._quantity=quantity
    }


    orderItemTotal(): number {
        return this._price * this._quantity;
      }

    get name():string{
        return this._name
    }

    get id():string{
        return this._id
    }

    get price():number{
        return this._price
    }

    get quantity():number{
        return this._quantity;
    }

    get productId():string{
        return this._productId;
    }
}