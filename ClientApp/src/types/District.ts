import { School } from "./School"
export type District = {
  id?: number
  name: string
  address: string
  subDomain: string
  connectionString: string
  schools?: School[]
}
