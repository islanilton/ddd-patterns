import { EventDispatcher } from '@/domain/event/@shared/event-dispatcher'
import { SendEmailWhenProductIsCreatedHandler } from '@/domain/event/product/handler/send-email-when-product-is-created.handler'

describe('Domain events tests', () => {
  it('should register a event handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register('ProductCreatedEvent', eventHandler)
    /* eslint-disable */
    // Código onde você quer evitar a transformação do Prettier
    // @ts-ignore
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
    /* eslint-disable */
    // Código onde você quer evitar a transformação do Prettier
    // @ts-ignore
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
  })

  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers()["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers()["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers()["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });
})
