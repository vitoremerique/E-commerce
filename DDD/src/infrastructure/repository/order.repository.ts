
import Order from "../../Domain/entity/Order";
import OrderItem from "../../Domain/entity/OrderItem";

import OrderRepositoryInterface from "../../Domain/repository/order-repository-interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface{
 
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id:entity.id,
      customer_id:entity.customer_id,
      total:entity.total(),
      items:entity.items.map((item)=>({
        id:item.id,
        name:item.name,
        price:item.price,
        product_id:item.productId,
        quantity:item.quantity

      }))

    },
    {
      include:[{model:OrderItemModel}]
    }
    )
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update({
      id:entity.id,
      customer_id:entity.customer_id,
      total:entity.total(),
    },
    {
      where:{id:entity.id},
    })


    for (const item of entity.items) {
      await OrderItemModel.update(
        {
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        },
        {
          where: { id: item.id, order_id: entity.id },
        }
      );

  }}

  

  async find(id: string): Promise<Order> {
    let orderResult;
    try {
      orderResult = await OrderModel.findOne({
        where: { id },
        include: [{ model: OrderItemModel, as: 'items' }], 
      });
  
      
  
    } catch (error) {
      throw new Error("Order not found");
    }
  
    const orderFound = orderResult.items.map((it) => {
      return new OrderItem(it.id, it.name, it.product_id, it.price, it.quantity);
    });
  
    const result = new Order(orderResult.id, orderResult.customer_id, orderFound);
  
    return result;
  }
  



  async findAll(): Promise<Order[]> {
    let orderResult;
  
      orderResult = await OrderModel.findAll({include: [{ model: OrderItemModel, as: 'items' }]})    
   


   const result = orderResult.map((order)=>{
    const itemResult = order.items.map((it) => {
      return new OrderItem(it.id, it.name, it.product_id, it.price, it.quantity);
    });
     return new Order(order.id,order.customer_id, itemResult)
     
   } );
   
   return result
  }
  
  }


    




