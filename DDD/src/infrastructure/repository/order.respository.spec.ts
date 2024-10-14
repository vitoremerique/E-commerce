import { Sequelize } from "sequelize-typescript";
import Address from "../../Domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";
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
      CustomerModel,
      ProductModel,
      OrderModel,
      OrderItemModel,
      
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




  it("Should update a order", async ()=>{
    const customerRepo = new customerRepository()
    const customer = new Customer("1","Customer1")
    const address = new Address("Antonio fagundes",10,"093498234","Porto Velho")
    customer.Address = address

    await customerRepo.create(customer)

    const productRepo = new productRepository()
    const product = new Product("1","Talher",5)

    await productRepo.create(product)



    const orderRepository = new OrderRepository()
    const orderItem1 = new OrderItem(
      "1",
      product.name,
      product.id,
      product.price,
      10
    )


    const order = new Order("1",customer.id,[orderItem1])


    await orderRepository.create(order)

    orderItem1.price = 15
    orderItem1.quantity = 20
    
    await orderRepository.update(order)

    const result = await OrderModel.findOne({where:{id:order.id},  include: ["items"],})


    expect((result).toJSON()).toStrictEqual({
      id: "1",
      customer_id: customer.id,
      total: 300,
      items: [
        {
          id: orderItem1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: orderItem1.quantity,
          order_id: "1",
          product_id: "1",
        },
      ],
    })

  })



  // it("Should find a order", async ()=>{
  //   const customerRepo = new customerRepository()
  //   const customer = new Customer("1","Customer1")
  //   const address = new Address("Antonio fagundes",10,"093498234","Porto Velho")
  //   customer.Address = address

  //   await customerRepo.create(customer)

  //   const productRepo = new productRepository()
  //   const product = new Product("1","Talher",5)

  //   await productRepo.create(product)



  //   const orderRepository = new OrderRepository()
  //   const orderItem1 = new OrderItem(
  //     "1",
  //     product.name,
  //     product.id,
  //     product.price,
  //     10
  //   )


  //   const order = new Order("1",customer.id,[orderItem1])


  //   await orderRepository.create(order)

    
    
    

  //   const result = orderRepository.find(order.id)


  //   expect((result)).toStrictEqual(order)

  // })
  it("Should find a order", async () => {
    
    const customerRepo = new customerRepository();
    const customer = new Customer("1", "Customer1");
    const address = new Address("Antonio fagundes", 10, "093498234", "Porto Velho");
    customer.Address = address;
  
    await customerRepo.create(customer);
  
    const productRepo = new productRepository();
    const product = new Product("1", "Talher", 5);
    await productRepo.create(product);
  
    
    const orderRepository = new OrderRepository();
    const orderItem1 = new OrderItem(
      "1",
      product.name,
      product.id,
      product.price,
      10
    );
  
    const order = new Order("1", customer.id, [orderItem1]);
    await orderRepository.create(order);
  
   
    
  
    const result = await orderRepository.find(order.id);
    expect(result).toStrictEqual(order);
  });




  it("Should find all orders", async () => {
   
    const customerRepo = new customerRepository();
    const customer = new Customer("1", "Customer1");
    const address = new Address("Antonio fagundes", 10, "093498234", "Porto Velho");
    customer.Address = address;
    await customerRepo.create(customer);
  
    
    const customerRepo2 = new customerRepository();
    const customer2 = new Customer("2", "Customer2");
    const address2 = new Address("Antonio fagundes", 100, "093498234", "Porto Velho");
    customer2.Address = address2;
    await customerRepo2.create(customer2);
  
    
    const productRepo = new productRepository();
    const product = new Product("1", "Talher", 5);
    await productRepo.create(product);
  
  
    const productRepo2 = new productRepository();
    const product2 = new Product("2", "Faca", 8);
    await productRepo2.create(product2);
  
    
    const orderRepository = new OrderRepository();
    const orderItem1 = new OrderItem("1", product.name, product.id, product.price, 10);
    const order = new Order("1", customer.id, [orderItem1]);
    await orderRepository.create(order);
  
    
    const orderItem2 = new OrderItem("2", product2.name, product2.id, product2.price, 100);
    const order2 = new Order("2", customer2.id, [orderItem2]);
    await orderRepository.create(order2);
  
    
    const result = await orderRepository.findAll();
  
    
    const mappedResult = result.map((order) => ({
      id: order.id,
      customer_id: order.customer_id,
      total: order.total(),
      items: order.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        order_id: order.id,
        product_id: item.productId,
      })),
    }));

    
  
   
    expect(mappedResult).toStrictEqual([
      {
        id: "1",
        customer_id: customer.id,
        total: 50,
        items: [
          {
            id: orderItem1.id,
            name: orderItem1.name,
            price: orderItem1.price,
            quantity: orderItem1.quantity,
            order_id: "1",
            product_id: "1",
          },
        ],
      },
      {
        id: "2",
        customer_id: customer2.id,
        total: 800,
        items: [
          {
            id: orderItem2.id,
            name: orderItem2.name,
            price: orderItem2.price,
            quantity: orderItem2.quantity,
            order_id: "2",
            product_id: "2",
          },
        ],
      },
    ]);
  });
  

 
  


});


