'use server'

import { db } from "@/database/drizzel"
import { books } from "@/database/schema"
import {
    or,
    desc,
    asc,
    eq,
    count,
    ilike,
    and,
    getTableColumns,
  } from "drizzle-orm";

  const ITEMS_PER_PAGE = 20;


export const createBook = async (params : BookParams) => {
   try {
     const newBook = await db
       .insert(books)
       .values({
        ...params,
        availableCopies: params.totalCopies,
      })
    .returning()
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    }
   } catch (error) {
    console.log(error)

    return{
        success : false,
        message : 'An error occured while creating a book'
    }
   }
}

export async function getBooks({
    query,
    sort = "available",
    page = 1,
    limit = ITEMS_PER_PAGE,
  }: QueryParams) {
    try {
      const searchConditions = query
        ? or(
            ilike(books.title, `%${query}%`),
            ilike(books.genre, `%${query}%`),
            ilike(books.author, `%${query}%`)
          )
        : undefined;
  
      const sortOptions: Record<string, any> = {
        newest: desc(books.createdAt),
        oldest: asc(books.createdAt),
        highestRated: desc(books.rating),
        available: desc(books.totalCopies),
      };
  
      const sortingCondition = sortOptions[sort] || desc(books.createdAt);
  
      const booksData = await db
        .select()
        .from(books)
        .where(searchConditions)
        .orderBy(sortingCondition)
        .limit(limit)
        .offset((page - 1) * limit);

        console.log(booksData)
  
      const totalItems = await db
        .select({
          count: count(books.id),
        })
        .from(books)
        .where(searchConditions);
  
      const totalPages = Math.ceil(totalItems[0].count / ITEMS_PER_PAGE);
      const hasNextPage = page < totalPages;
  
      return {
        success: true,
        data: booksData,
        metadata: {
          totalPages,
          hasNextPage,
        },
      };
    } catch (error) {
      console.error("Error fetching books:", error);
      return {
        success: false,
        error: "An error occurred while fetching books",
      };
    }
  }