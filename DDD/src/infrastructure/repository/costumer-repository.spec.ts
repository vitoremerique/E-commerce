import { Sequelize } from "sequelize-typescript";
import Address from "../../Domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../Domain/entity/Costumer";




describe("Costumer repository test unit",()=>{

    let sequelize: Sequelize;

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([CustomerModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
    it("should create a customer", async () => {
      const customerRepo = new CustomerRepository();
      const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.Address = address;
      await customerRepo.create(customer);
  
      const customerMode = await CustomerModel.findOne({ where: { id: "123" } });
  
      expect(customerMode.toJSON()).toStrictEqual({
        id: "123",
        name: customer.name,
        active: customer.isActive(),
        rewardPoints: customer.rewardPoints,
        rua: address.rua,
        numero: address.numero,
        zip: address.zip,
        cidade: address.cidade,
      });
    });





    it("should update name customer", async () => {
        const customerRepo = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.Address = address;
        await customerRepo.create(customer);

        customer.changeName("Vitor Torres Emerique")
        await customerRepo.update(customer)
        const customerMode = await CustomerModel.findOne({ where: { id: "123" } });
    
        expect(customerMode.toJSON()).toStrictEqual({
          id: "123",
          name: customer.name,
          active: customer.isActive(),
          rewardPoints: customer.rewardPoints,
          rua: address.rua,
          numero: address.numero,
          zip: address.zip,
          cidade: address.cidade,
        });
      })



      it("should find by id customer", async () => {
        const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
    
})





it("should find all customers", async () => {
  const customerRepository = new CustomerRepository();
  const customer1 = new Customer("123", "Customer 1");
  const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
  customer1.Address = address1;
  customer1.add_rewardPoints(10);
  customer1.activate();

  const customer2 = new Customer("456", "Customer 2");
  const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
  customer2.Address = address2;
  customer2.add_rewardPoints(20);

  await customerRepository.create(customer1);
  await customerRepository.create(customer2);

  const customers = await customerRepository.findAll();

  expect(customers).toHaveLength(2);
  expect(customers).toContainEqual(customer1);
  expect(customers).toContainEqual(customer2);
});

})


