import { Product } from '@/domain/entity/product'
import { RepositoryInterface } from '@/domain/repository/repository-interface'

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
