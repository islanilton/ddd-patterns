import { Product } from '@/domain/product/entity/product'
import { RepositoryInterface } from '@/domain/@shared/reposistory/repository.interface'

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
