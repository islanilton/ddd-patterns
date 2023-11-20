import { EventDispatcher } from '@/domain/event/@shared/event-dispatcher'
import { SendEmailWhenProductIsCreatedHandler } from '@/domain/event/product/handler/send-email-when-product-is-created.handler'

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
})
