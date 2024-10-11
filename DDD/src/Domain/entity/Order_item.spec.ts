import OrderItem from "./OrderItem"

describe("Order_Item unit test",()=>{
    
    
    it("should throw error when Id is empty",()=>{

        expect(()=>{
             let ordemItem= new OrderItem("","Produto","2",10,1)
    
        }).toThrowError("Id is required")
       
    })

    it("should throw error when name is empty",()=>{

        expect(()=>{
             let ordemItem= new OrderItem("1","","2",10,1)
    
        }).toThrowError("Name is required")
       
    })

    it("should throw error when productId is empty",()=>{

        expect(()=>{
             let ordemItem= new OrderItem("1","Produto","",10,1)
    
        }).toThrowError("productId is required")
       
    })


    it("should throw error when Price is less than ou equal 0",()=>{

        expect(()=>{
             let ordemItem= new OrderItem("1","Produto","1",0,1)
    
        }).toThrowError("Price is required")
       
    })

    it("should throw error when quantity is less than ou equal 0",()=>{

        expect(()=>{
             let ordemItem= new OrderItem("1","Produto","1",10,0)
    
        }).toThrowError("Quantity item is required")
       
    })


    it("should changeName",()=>{
        let ordemItem= new OrderItem("1","Produto","1",10,1)
        ordemItem.changeName("Produto 2")
        expect(ordemItem.name).toBe("Produto 2")
        
    })

    it("should changePrice",()=>{
        let ordemItem= new OrderItem("1","Produto","1",10,1)
        ordemItem.changePrice(15)
        expect(ordemItem.price).toBe(15)
        
    })

    it("should change",()=>{
        let ordemItem= new OrderItem("1","Produto","1",10,1)
        ordemItem.changeQuantity(2)
        expect(ordemItem.quantity).toBe(2)
        
    })
       
        
})
