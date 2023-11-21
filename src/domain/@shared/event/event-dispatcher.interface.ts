import { EventInterface } from '@/domain/@shared/event/event.interface'
import { EventHandlerInterface } from '@/domain/@shared/event/event-handler.interface'

export interface EventDispatcherInterface {
  notify(event: EventInterface): void
  register(eventName: string, eventHandler: EventHandlerInterface): void
  unregister(eventName: string, eventHandler: EventHandlerInterface): void
  unregisterAll(): void
}
