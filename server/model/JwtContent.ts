import type { JwtPayload } from "jsonwebtoken"
import type { SetRequired } from "type-fest"
import type { RolesTable, UsersTable } from "~/server/schema"

export interface JwtContent extends SetRequired<JwtPayload, "exp" | "jti" | "sub"> {
  username: UsersTable["username"]
  roleName: RolesTable["name"]
  isAdmin: RolesTable["isAdmin"]
}
