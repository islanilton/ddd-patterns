import { EventDispatcherInterface } from '@/domain/event/@shared/event-dispatcher.interface'
import { EventInterface } from '@/domain/event/@shared/event.interface'
import { EventHandlerInterface } from '@/domain/event/@shared/event-handler.interface'

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}

  getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers
  }

  notify(event: EventInterface): void {}

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
