import { EventDispatcherInterface } from '@/domain/@shared/event/event-dispatcher.interface'
import { EventInterface } from '@/domain/@shared/event/event.interface'
import { EventHandlerInterface } from '@/domain/@shared/event/event-handler.interface'

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}

  getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers
  }

  notify(event: EventInterface): void {
    const eventName: string = event.eventName
    if (!this.eventHandlers[eventName]) {
      return
    }
    this.eventHandlers[eventName].forEach((eventHandler) => {
      eventHandler.handle(event)
    })
  }

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      return
    }
    const index = this.eventHandlers[eventName].indexOf(eventHandler)
    if (index !== -1) {
      this.eventHandlers[eventName].splice(index, 1)
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {}
  }
}
