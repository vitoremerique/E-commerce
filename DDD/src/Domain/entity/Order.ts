import OrderItem from "./OrderItem";


export default class Order{
  private  _id:string;
  private  _costumerId:string;
  private  _items:OrderItem[]=[];
  private  _total:number;


    constructor(id:string,costumerId:string, items:OrderItem[]){
        this._id=id;
        this._costumerId = costumerId;
        this._items=items
        this._total=this.total();
        this.validate();
    }


    get id():string{
        return this._id
    }

    get customer_id():string{
        return this._costumerId;
    }

    get items():OrderItem[]{
        return this._items;
    }

    validate(){
        if(this._id === ""){
            throw new Error("Id is required")
        }

        if(this._costumerId === ""){
            throw new Error("CostumerId is required")
        }

        if(this._items.length === 0){
            throw new Error("Item quantity must be greatter than 0")
        }

        if(this._items.some(item=>item.quantity <=0)){
            throw new Error("Quantity item is required")
        }
        


    }

    total():number{
        return this._items.reduce((acc,item)=> acc + item.orderItemTotal(),0)
    }
}