import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { db } from "@/lib/db";
import React from "react";

const DisplayComplaint = async ({ id }: { id: string }) => {
  const comments = await db.comment.findMany({
    where: {
      complaintId: id,
    },
  });
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="bg-white p-4 rounded-md flex items-center  gap-2">
            <img
              src="https://api.dicebear.com/9.x/icons/svg?seed=Avery"
              alt="Anonymous"
              className="rounded-full h-10 w-10"
            />
            <p className="text-gray-800">{comment.content}</p>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default DisplayComplaint;
