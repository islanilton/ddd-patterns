import { EventInterface } from '@/domain/event/@shared/event.interface'
import { EventHandlerInterface } from '@/domain/event/@shared/event-handler.interface'

export interface EventDispatcherInterface {
  notify(event: EventInterface): void
  register(eventName: string, eventHandler: EventHandlerInterface): void
  unregister(eventName: string, eventHandler: EventHandlerInterface): void
  unregisterAll(): void
}
