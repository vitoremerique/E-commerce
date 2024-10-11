import Order from "./Order"
import OrderItem from "./OrderItem"
import Product from "./Product"


describe("Product unit tests",()=>{

   it("should throw error when id is empty",()=>{
      expect(()=>{
       let product = new Product("","Produto 1",100)
      }).toThrowError("Id is required")
   })

   it("should throw error when name is empty",()=>{
      expect(()=>{
       let product = new Product("1","",100)
      }).toThrowError("Name is required")
   })


   it("should throw error when price is empty",()=>{
      expect(()=>{
       let product = new Product("1","Produto 1",0)
      }).toThrowError("Price is required")
   })
 
   it("should change name",()=>{
     let produto = new Product("1","Produto 1",10);
     produto.changeName("Produto 2")
     expect(produto.name).toBe("Produto 2")
   })

   it("should change price",()=>{
      let produto = new Product("1","Produto 1",10);
      produto.changePrice(100)
      expect(produto.price).toBe(100)
    })


})