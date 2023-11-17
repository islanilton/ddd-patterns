import { EventInterface } from '@/domain/event/@shared/event.interface'

export class ProductCreatedEvent implements EventInterface {
  dateTimeOccurred: Date
  eventName: string
  eventData: any

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date()
    this.eventName = 'ProductCreatedEvent'
    this.eventData = eventData
  }
}
