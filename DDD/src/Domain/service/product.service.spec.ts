import Product from "../entity/Product"
import productService from "./product.service"

describe("Product Service unit service",()=>{
    it("Should change the prices of all products",()=>{
        const product1 = new Product("1","Telefone celular",700)
        const product2 = new Product("2","Telefone público",600)
        const products = [product1,product2]


        productService.increasePrice(products, 100)


        expect(product1.price).toBe(1400)
        expect(product2.price).toBe(1200)

        

    })
})