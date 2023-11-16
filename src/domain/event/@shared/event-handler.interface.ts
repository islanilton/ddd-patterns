import { EventInterface } from '@/domain/event/@shared/event.interface'

export interface EventHandlerInterface<
  T extends EventInterface = EventInterface,
> {
  handle(event: T): void
}
