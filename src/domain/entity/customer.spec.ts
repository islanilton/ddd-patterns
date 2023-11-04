import { Customer } from '@/domain/entity/customer'
import { Address } from '@/domain/entity/address'

describe('Customer unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const customer: Customer = new Customer({
        id: '',
        name: 'John Doe',
      })
    }).toThrowError('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const customer: Customer = new Customer({
        id: '2',
        name: '',
      })
    }).toThrowError('Name is required')
  })

  it('should be able to create a customer', () => {
    const customer: Customer = new Customer({
      id: '1',
      name: 'John Doe',
    })
    expect(customer.id).toBe('1')
  })

  it('should be able to activate a customer', () => {
    const customer: Customer = new Customer({
      id: '1',
      name: 'John Doe',
    })

    customer.Address = new Address({
      street: 'Street',
      city: 'City',
      state: 'State',
      zip: 'Zip',
      number: 1,
    })
    expect(customer.isActive()).toBe(true)
  })

  it('should be able to deactivate a customer', () => {
    const customer: Customer = new Customer({
      id: '1',
      name: 'John Doe',
    })
    customer.deactivate()
    expect(customer.isActive()).toBe(false)
  })

  it('should be able to change name', () => {
    const customer: Customer = new Customer({
      id: '1',
      name: 'John Doe',
    })
    customer.changeName('Jane Doe')
    expect(customer.name).toBe('Jane Doe')
  })

  it('should be throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer: Customer = new Customer({
        id: '1',
        name: 'John Doe',
      })
      customer.activate()
    }).toThrowError('Address is mandatory to activate a customer')
  })

  it('should be able to add reward points', () => {
    const customer: Customer = new Customer({
      id: '1',
      name: 'John Doe',
    })
    expect(customer.rewardPoints).toBe(0)
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
})
