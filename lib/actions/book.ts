'use server'

import { db } from "@/database/drizzel";
import { books, borrowRecords } from "@/database/schema";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";

const ITEMS_PER_PAGE = 20;

export async function borrowBook(param: BorrowBookParams){
    const {userId , bookId } = param
     try {
       const book = await db
          .select({
            availableCopies : books.availableCopies
          })
          .from(books)
          .where(eq(books.id , bookId))
          .limit(1)
      if(!book.length || book[0].availableCopies <= 0){
        return{
            success : false,
            error : 'Book is not available'
        }
      }  


     const dueDate = dayjs().add(7 , "day").toDate().toDateString()

      const record = await db.insert(borrowRecords).values({
        userId,
        bookId,
        dueDate,
        status : "BORROWED"
      })

      await db
        .update(books)
        .set({
          availableCopies : book[0].availableCopies - 1
        })
        .where(eq(books.id , bookId))

      return{
        success : true,
        data : JSON.parse(JSON.stringify(record))
      }
    
        
     } catch (error) {
        console.log(error)
        return {
            success : false,
            error   : 'Error borrowing book'
        }
     }
}