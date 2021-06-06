import format from "date-fns/format"

import {
  DATE_FORMAT,
  DATE_MIN_VALUE,
  FULL_DATE_FORMAT,
} from "../utils/constants"

export default (time: string, FORMAT?: string) => {
  if (time === DATE_MIN_VALUE) return ""
  try {
    const utcDate = format(new Date(time), FULL_DATE_FORMAT)
    const utcDateFormat = format(new Date(utcDate), FULL_DATE_FORMAT) + " UTC"
    return format(new Date(utcDateFormat), FORMAT || DATE_FORMAT)
  } catch {
    return ""
  }
}
