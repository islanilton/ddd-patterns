interface OrderItemProps {
  id: string
  name: string
  price: number
}

export class OrderItem {
  private _id: string
  private _name: string
  private _price: number
  constructor({ id, name, price }: OrderItemProps) {
    this._id = id
    this._name = name
    this._price = price
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price
  }
}
