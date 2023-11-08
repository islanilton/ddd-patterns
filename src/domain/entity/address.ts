interface AddressProps {
  street: string
  city: string
  state: string
  zip: string
  number: number
}

export class Address {
  private _street: string
  private _city: string
  private _state: string
  private _zip: string
  private _number: number

  constructor({ street, city, state, zip, number }: AddressProps) {
    this._street = street
    this._city = city
    this._state = state
    this._zip = zip
    this._number = number
    this.validate()
  }

  get street(): string {
    return this._street
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }

  get zip(): string {
    return this._zip
  }

  get number(): number {
    return this._number
  }

  private validate(): boolean {
    if (this._street.length === 0) {
      throw new Error('Street is required')
    }
    if (this._city.length === 0) {
      throw new Error('City is required')
    }
    if (this._state.length === 0) {
      throw new Error('State is required')
    }
    if (this._zip.length === 0) {
      throw new Error('Zip is required')
    }
    if (this._number === 0) {
      throw new Error('Number is required')
    }

    return true
  }

  toString() {
    return `${this._street}, ${this._city}, ${this._state}, ${this._zip}, ${this._number}`
  }
}
