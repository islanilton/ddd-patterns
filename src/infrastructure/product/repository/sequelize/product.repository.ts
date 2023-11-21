import { ProductRepositoryInterface } from '@/domain/product/repository/product.repository.interface'
import { Product } from '@/domain/product/entity/product'
import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.model'

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    })
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      { name: entity.name, price: entity.price },
      { where: { id: entity.id } },
    )
  }

  async find(id: string): Promise<Product | null> {
    const productModel: ProductModel = await ProductModel.findOne({
      where: { id },
    })

    return new Product({
      id: productModel.id,
      name: productModel.name,
      price: productModel.price,
    })
  }

  async findAll(): Promise<Product[]> {
    const productModels: ProductModel[] = await ProductModel.findAll()
    return productModels.map((productModel: ProductModel) => {
      return new Product({
        id: productModel.id,
        name: productModel.name,
        price: productModel.price,
      })
    })
  }
}
