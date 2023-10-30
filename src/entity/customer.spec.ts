import { Customer } from '@/entity/customer'

describe('Customer unit test', () => {
  it('should be able to create a customer', () => {
    const customer = new Customer({
      id: '1',
      name: 'John Doe',
    })
    expect(customer.id).toBe('1')
  })
})
