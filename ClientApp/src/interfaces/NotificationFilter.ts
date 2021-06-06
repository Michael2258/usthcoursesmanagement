import { Filter } from "../types/Filter"

export interface NotificationFilter extends Filter {
  isRead?: boolean | null
}
