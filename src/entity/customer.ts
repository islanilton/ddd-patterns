import { Address } from '@/entity/address'

interface CustomerProps {
  id: string
  name: string
}
export class Customer {
  private _id: string
  private _name: string
  private _address!: Address
  private _active = true
  private _rewardPoints = 0

  constructor({ id, name }: CustomerProps) {
    this._id = id
    this._name = name
    this.validate()
  }

  get id(): string {
    return this._id
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }

  get name(): string {
    return this._name
  }

  private validate(): boolean {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }
    if (this._name.length === 0) {
      throw new Error('Name is required')
    }

    return true
  }

  changeName(name: string): void {
    this._name = name
    this.validate()
  }

  isActive(): boolean {
    return this._active
  }

  activate(): void {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this._active = true
  }

  deactivate(): void {
    this._active = false
  }

  get Address(): Address {
    return this._address
  }

  set Address(address: Address) {
    this._address = address
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points
  }
}
