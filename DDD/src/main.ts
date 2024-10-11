import Product from "./Domain/entity/Product";
import productRepository from "./infrastructure/repository/product.repository";

const productRepo = new productRepository();
const product = new Product("1","Product 1",10);

productRepo.create(product);