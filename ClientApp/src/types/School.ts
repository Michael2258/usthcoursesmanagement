import { PricingPlan } from "./PricingPlan"
import { District } from "./District"

export type School = {
  id?: number
  name: string
  address: string
  contactPersonEmail: string
  contactPersonName: string
  subDomain: string
  connectionString: string
  numberOfAdmins: number
  numberOfAssistants: number
  numberOfTeachers: number
  numberOfStudents: number
  pricingPlanId?: number | null
  pricingPlan?: PricingPlan | null
  districtId?: number | null
  district?: District | null
}
