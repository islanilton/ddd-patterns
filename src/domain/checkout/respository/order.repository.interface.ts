import { RepositoryInterface } from '@/domain/@shared/reposistory/repository.interface'
import { Order } from '@/domain/checkout/entity/order'

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
