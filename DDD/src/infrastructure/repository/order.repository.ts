
import Order from "../../Domain/entity/Order";

import OrderRepositoryInterface from "../../Domain/repository/order-repository-interface";
import customerModel from "../db/sequelize/model/customer.model";
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
  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }



    }


    




