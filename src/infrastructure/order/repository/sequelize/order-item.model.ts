import {
  Model,
  Table,
  Column,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.model'
import { OrderModel } from './'

@Table({
  tableName: 'orders_items',
  timestamps: false,
})
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @ForeignKey(() => ProductModel)
  declare product_id: string

  @BelongsTo(() => ProductModel)
  declare product: ProductModel

  @ForeignKey(() => OrderModel)
  declare order_id: string

  @BelongsTo(() => OrderModel)
  declare order: OrderModel

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare quantity: number

  @Column({ allowNull: false })
  declare price: number
}
