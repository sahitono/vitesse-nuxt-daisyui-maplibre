import type { JwtPayload } from "jsonwebtoken"
import type { SetRequired } from "type-fest"
import type { RoleModel, UserModel } from "~~/server/infrastructure/db/schema"

export interface JwtContent extends SetRequired<JwtPayload, "exp" | "jti" | "sub"> {
  username: UserModel["username"]
  roleName: RoleModel["name"]
}
