import { db } from "~/server/infrastructure/database"

export const findUserByUsername = async (username: string) => {
  return await db
    .selectFrom("users")
    .leftJoin("roles", "users.roleId", "roles.id")
    .select(["users.id", "users.username", "users.password", "roles.name", "roles.isAdmin"])
    .where("username", "=", username)
    .execute()
}
