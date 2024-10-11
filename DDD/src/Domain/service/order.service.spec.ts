import Costumer from "../entity/Costumer"
import Order from "../entity/Order"
import OrderItem from "../entity/OrderItem"
import orderService from "./order.service"

describe("Order Service unit test",()=>{
    it("It should get total of all orders",()=>{

        const item1 = new OrderItem("1","Sabonete","1",2,10)
        const item2 = new OrderItem("2","Frango","2",2,10)
        const item3 = new OrderItem("3","Sabao em po","3",2,15)
        const item4 = new OrderItem("4","Lingueca","4",2,11)
        const order1= new Order("1","1",[item1,item2])
        const order2= new Order("2","2",[item3,item4])

        const totalOrdens = orderService.total([order1,order2])
        expect(totalOrdens).toBe(92);

    })




    it("It should place a order",()=>{
        const costumer = new Costumer("1","costumer1")
        const item1 = new OrderItem("1","Item 1","p1",10,2);
       


        const order = orderService.placeOrder(costumer,[item1])

        expect(costumer.rewardPoints).toBe(10);
        expect(order.total()).toBe(20)


    })

    it("It should add reward points",()=>{
        const costumer = new Costumer("1","costumer1")
        const item1 = new OrderItem("1","Item 1","p1",10,2);
        expect(costumer.rewardPoints).toBe(0);

        const order = orderService.placeOrder(costumer,[item1])

        expect(costumer.rewardPoints).toBe(10);
        


    })
})