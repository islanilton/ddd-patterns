import { EventDispatcher } from '@/domain/@shared/event/event-dispatcher'
import { SendEmailWhenProductIsCreatedHandler } from '@/domain/product/event/handler/send-email-when-product-is-created.handler'
import { ProductCreatedEvent } from '@/domain/product/event/product-created.event'

describe('Domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher: EventDispatcher = new EventDispatcher()
    const eventHandler: SendEmailWhenProductIsCreatedHandler =
      new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)

    expect(eventDispatcher.getEventHandlers().ProductCreatedEvent).toBeDefined()
    expect(eventDispatcher.getEventHandlers().ProductCreatedEvent.length).toBe(
      1,
    )
    expect(
      eventDispatcher.getEventHandlers().ProductCreatedEvent[0],
    ).toMatchObject(eventHandler)
  })

  it('should unregister an event handler', () => {
    const eventDispatcher: EventDispatcher = new EventDispatcher()
    const eventHandler: SendEmailWhenProductIsCreatedHandler =
      new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers().ProductCreatedEvent).toBeDefined()
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers().ProductCreatedEvent).toBeDefined()
    expect(eventDispatcher.getEventHandlers().ProductCreatedEvent.length).toBe(
      0,
    )
  })

  it('should unregister all event handlers', () => {
    const eventDispatcher: EventDispatcher = new EventDispatcher()
    const eventHandler: SendEmailWhenProductIsCreatedHandler =
      new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers().ProductCreatedEvent).toBeDefined()
    expect(eventDispatcher.getEventHandlers().ProductCreatedEvent.length).toBe(
      1,
    )
    expect(
      eventDispatcher.getEventHandlers().ProductCreatedEvent[0],
    ).toMatchObject(eventHandler)

    eventDispatcher.unregisterAll()
    expect(
      eventDispatcher.getEventHandlers().ProductCreatedEvent,
    ).toBeUndefined()
  })

  it('should notify all event handlers', () => {
    const eventDispatcher: EventDispatcher = new EventDispatcher()
    const eventHandler: SendEmailWhenProductIsCreatedHandler =
      new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    const spyEventHandler = jest.spyOn(eventHandler, 'handle')

    expect(
      eventDispatcher.getEventHandlers().ProductCreatedEvent[0],
    ).toMatchObject(eventHandler)

    const productCreatedEvent: ProductCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10,
    })

    eventDispatcher.notify(productCreatedEvent)
    expect(spyEventHandler).toHaveBeenCalled()
  })
})
