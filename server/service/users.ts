import { eq } from "drizzle-orm"
import { useDb } from "~~/server/infrastructure/db"
import { roles, users } from "~~/server/infrastructure/db/schema"

export const findUserByUsername = async (username: string) => {
  const rows = await useDb()
    .select()
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id))
    .where(eq(users.username, username))
    .execute()

  if (rows.length === 0) {
    return
  }

  return rows[0]
}
