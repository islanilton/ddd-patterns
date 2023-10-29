import { OrderItem } from '@/entity/order-item'

interface OrderProps {
  id: string
  customerId: string
  items: OrderItem[]
}

export class Order {
  private _id: string
  private _customerId: string
  private _items: OrderItem[] = []

  constructor({ id, customerId, items }: OrderProps) {
    this._id = id
    this._customerId = customerId
    this._items = items
  }
}
