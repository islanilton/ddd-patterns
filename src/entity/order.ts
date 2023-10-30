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
  private _total: number

  constructor({ id, customerId, items }: OrderProps) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this._total = this.total()
    this.validate()
  }

  private validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }
    if (this._customerId.length === 0) {
      throw new Error('CustomerId is required')
    }
    if (this._items.length === 0) {
      throw new Error('Items quantity is must be greater than 0')
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0)
  }
}
