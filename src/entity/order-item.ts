interface OrderItemProps {
  id: string
  name: string
  price: number
  productId: string
  quantity: number
}

export class OrderItem {
  private _id: string
  private _name: string
  private _price: number
  private _productId: string
  private _quantity: number
  private _total: number
  constructor({ id, name, price, productId, quantity }: OrderItemProps) {
    this._id = id
    this._name = name
    this._price = price
    this._productId = productId
    this._quantity = quantity
    this._total = this.total()
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get quantity(): number {
    return this._quantity
  }

  get price(): number {
    return this._price
  }

  total(): number {
    return this._price * this._quantity
  }
}
