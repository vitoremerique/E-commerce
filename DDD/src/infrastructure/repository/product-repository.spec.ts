
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../Domain/entity/Product";
import productRepository from "./product.repository";


describe("Product Repository unit test",()=>{

    let sequelize:Sequelize;

    beforeEach(async ()=>{
        sequelize = new Sequelize({
            dialect:'sqlite',
            storage:'memory',
            logging:false,
            sync:{ force:true},
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })

    afterEach(async ()=>{
            await sequelize.close()
    })

    it("Should create a product",async()=>{
        const productRepo = new productRepository();
        const product = new Product("1","Product 1",10);

        await productRepo.create(product);

        const productModel = await ProductModel.findOne({where :{id:"1"}});

        expect(productModel.toJSON()).toStrictEqual({
            id:"1",
            name:"Product 1",
            price:10,
        });
        
    })



    it("Should find one product",async()=>{
        const productRepo = new productRepository();
        const product = new Product("1","Banana",10)

        await productRepo.create(product)

        const productModel = await ProductModel.findOne(    {where: {id:"1"}}    )
        const foundProduct = await productRepo.find("1")

        expect(productModel.toJSON()).toStrictEqual({
            id:foundProduct.id,
            name:foundProduct.name,
            price:foundProduct.price
        })


    })



    it("Should find all product",async()=>{
        const productRepo = new productRepository();
        const product = new Product("1","Banana",10);

        await productRepo.create(product);

        const product2 = new Product("2","Bananas",100);
        await productRepo.create(product2);

        const foundProduct = await productRepo.findAll();
        const products = [product,product2];


        expect(products).toEqual(foundProduct)
        


    })


    it("Should update a product",async()=>{
        const productRepo = new productRepository();
        
        const product2 = new Product("2","Product 2",100);

        await productRepo.create(product2);

        product2.changeName("Producto de embalagem")
        product2.changePrice(6)

        await productRepo.update(product2)

        const productModel = await ProductModel.findOne({where :{id:"2"}});
        expect(productModel.toJSON()).toStrictEqual({
            id:"2",
            name:"Producto de embalagem",
            price:6,
        });

    })

});