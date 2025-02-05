"use client";

import { useState, useTransition } from "react";
import { deleteBookById, getBooks } from "@/lib/admin/actions/book";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { books } from "@/database/schema";


const DeleteBookModal =  ({ bookId }: { bookId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();


  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteBookById({ id: bookId });

    if (result.success) {
      toast({
        title: "Success",
        description: "Book deleted successfully",
      });
      setIsOpen(false);
      startTransition(() => router.refresh());
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <>
      {/* Delete Icon Button */}
      <button
        className="relative size-5"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="/icons/admin/trash.svg"
          width={20}
          height={20}
          className="object-contain"
          alt="delete"
        />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>Are you sure you want to delete this book?</p>
            <div className="mt-4 flex gap-3">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteBookModal;
