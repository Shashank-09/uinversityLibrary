import { db } from "@/database/drizzel";
import { users } from "@/database/schema";

const ITEMS_PER_PAGE = 20;

export  async function getUsers({
    query,
    sort = "available",
    page = 1,
    limit = ITEMS_PER_PAGE,
  }: QueryParams){
    try {
        const userData = await db
          .select({
            user : users
          })
          .from(users)
          .groupBy(users.id)

        console.log(userData)

        return{
            success : true,
            data : userData
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        return {
          success: false,
          error: "An error occurred while fetching users",
        };
    }
}
