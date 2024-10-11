import Address from "../../Domain/entity/address";
import Customer from "../../Domain/entity/Costumer";
import Costumer from "../../Domain/entity/Costumer";
import CustomerRepositoryInterface from "../../Domain/repository/customer-repository-interface";
import customerModel from "../db/sequelize/model/customer.model";

export default class customerRepository implements CustomerRepositoryInterface{

    
    async create(entity: Costumer): Promise<void> {
        

        await customerModel.create({
            id: entity.id,
            name: entity.name,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
            rua: entity.address.rua,
            numero: entity.address.numero,
            zip: entity.address.zip,
            cidade: entity.address.cidade,
            
    }); }




    async update(entity: Costumer): Promise<void> {
        await customerModel.update(
            {
              name: entity.name,
              street: entity.address.rua,
              number: entity.address.numero,
              zipcode: entity.address.zip,
              city: entity.address.cidade,
              active: entity.isActive(),
              rewardPoints: entity.rewardPoints,
            },
            {
              where: {
                id: entity.id,
              },
            }
          );
    }


    async find(id: string): Promise<Costumer> {
        let CustomerModel;
    try {
      CustomerModel = await customerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(id, CustomerModel.name);
    const address = new Address(
      CustomerModel.rua,
      CustomerModel.numero,
      CustomerModel.zip,
      CustomerModel.cidade
    );
    customer.changeAddress(address);
    return customer;
  }





  async findAll(): Promise<Costumer[]> {
    const customerModels = await customerModel.findAll();

    const customers = customerModels.map((customerModels)=>{
      let customer = new Costumer(customerModels.id, customerModels.name);
      customer.add_rewardPoints(customerModels.rewardPoints);
      const address = new Address(
        customerModels.rua,
        customerModels.numero,
        customerModels.zip,
        customerModels.cidade
      )
      customer.changeAddress(address)

      if(customerModels.active){
        customer.activate();
      }
      return customer;
    });

    return customers;
}
    }


    




