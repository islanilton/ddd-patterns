import { ProductRepository } from '@/infrastructure/product/repository/sequelize/product.repository'
import { OutputListProductDto } from './list.product.dto'

export class ListProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll()
    return { products }
  }
}
