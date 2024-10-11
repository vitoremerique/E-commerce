import { Sequelize } from "sequelize-typescript";
import Address from "../../Domain/entity/address";
import customerModel from "../db/sequelize/model/customer.model";
import customerRepository from "./customer.repository";
import Customer from "../../Domain/entity/Costumer";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import productRepository from "./product.repository";
import Product from "../../Domain/entity/Product";
import OrderItem from "../../Domain/entity/OrderItem";
import Order from "../../Domain/entity/Order";
import OrderRepository from "./order.repository";




describe("Order repository test unit", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      customerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepo = new customerRepository();
    const customer = new Customer("123", "Vitor Emerique");
    const addr = new Address("Parana", 1, "mamaksksk", "Santarem");
    customer.Address = addr;

    await customerRepo.create(customer);

    const productRepo = new productRepository();
    const product1 = new Product("123", "Salada", 10);

    await productRepo.create(product1);

    const orderItem = new OrderItem(
      "1",
      product1.name,
      product1.id,
      product1.price,
      2
    );
    const order = new Order("123", customer.id, [orderItem]);

    const orderRepo = new OrderRepository();
    await orderRepo.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    // Ajuste: Chame o método toJSON
    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });
});


