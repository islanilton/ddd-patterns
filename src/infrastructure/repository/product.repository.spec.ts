import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '@/infrastructure/db/sequelize/model/product.model'
import { Product } from '@/domain/entity/product'
import { ProductRepository } from '@/infrastructure/repository/product.repository'

describe('Product repository unit test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productRepository: ProductRepository = new ProductRepository()
    const product: Product = new Product({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
    await productRepository.create(product)
    const productModel: ProductModel = await ProductModel.findOne({
      where: { id: '1' },
    })
    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
  })

  it('should update a product', async () => {
    const productRepository: ProductRepository = new ProductRepository()
    const product: Product = new Product({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
    await productRepository.create(product)
    product.changeName('Product updated')
    product.changePrice(500)
    await productRepository.update(product)
    const productModel: ProductModel = await ProductModel.findOne({
      where: { id: '1' },
    })
    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product updated',
      price: 500,
    })
  })

  it('should find a product by id', async () => {
    const productRepository: ProductRepository = new ProductRepository()
    const product: Product = new Product({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
    await productRepository.create(product)
    const productModel: ProductModel = await ProductModel.findOne({
      where: { id: '1' },
    })
    const foundProduct: Product = await productRepository.find('1')
    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    })
  })

  it('should find all products', async () => {
    const productRepository: ProductRepository = new ProductRepository()
    const product: Product = new Product({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
    await productRepository.create(product)
    const product2: Product = new Product({
      id: '2',
      name: 'Product 2',
      price: 200,
    })
    await productRepository.create(product2)
    const foundProducts: Product[] = await productRepository.findAll()
    const products: Product[] = [product, product2]
    expect(products).toEqual(foundProducts)
  })
})
