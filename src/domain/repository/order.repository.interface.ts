import { RepositoryInterface } from '@/domain/repository/repository.interface'
import { Order } from '@/domain/entity/order'

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
