import { db } from "@/database/drizzel";
import { borrowRecords, users } from "@/database/schema";
import { asc, count, desc, eq } from "drizzle-orm";

const ITEMS_PER_PAGE = 20;

export  async function getUsers({
    query,
    sort = "available",
    page = 1,
    limit = ITEMS_PER_PAGE,
  }: QueryParams){
    try {
       const sortOptions  : Record<string ,any> = {
          newest : desc(users.createdAt),
          oldesr : asc(users.createdAt)
       }

       const sortingCondition = sortOptions[sort] || desc(users.createdAt)

        const userData = await db
          .select({
            user : users,
            totalBorrowedBooks: count(borrowRecords.id).as("totalBorrowedBooks"),
          })
          .from(users)
          .leftJoin(
            borrowRecords,
            eq(borrowRecords.userId , users.id)
          )
          .groupBy(users.id)
          .orderBy(sortingCondition)

        //console.log(userData)

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


export async function deleteUser({userId} : {userId : string}) {
   try {
    const deleteBorrowBook = await db 
      .delete(borrowRecords)
      .where(eq(borrowRecords.userId , userId))

    const result = await db 
     .delete(users)
     .where(eq(users.id , userId))
   
     if (result.rowCount === 0) {
      return {
        success: false,
        error: "User not found",
      };  
    }
    return {
      success: true,
      message: "User deleted successfully",
    };

   } catch (error) {
     console.log(error)
     return{
      success : false,
      message : 'An Error while deleting the user'
     }
   }
}

export async function updateUserRole(userId: string) {
  try {
    const user = await 
      db.select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user.length) {
      return {
        success: false,
        error: "User not found",
      };
    }
    const newRole = user[0].role === "ADMIN" ? "USER" : "ADMIN";
    const result = await db
      .update(users)
      .set({ role: newRole })
      .where(eq(users.id, userId));

    if (result.rowCount === 0) {
      return {
        success: false,
        error: "Failed to update user role",
      };
    }

    return {
      success: true,
      message: `User role updated to ${newRole}`,
      newRole,
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      success: false,
      error: "An error occurred while updating the user role",
    };
  }
}