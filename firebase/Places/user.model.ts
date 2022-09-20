import { Base } from "@firebase/Base.model";

export interface User extends Base {
  name: string
  email: string
}
