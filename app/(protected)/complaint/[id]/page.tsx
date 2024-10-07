import { db } from "@/lib/db";
import React from "react";
import EmblaCarousel from "@/components/shared/Carousel";
import AddComplaint from "../_components/AddComplaint";
import DisplayComplaint from "../_components/DisplayComplaint";
import { auth } from "@/auth";
import { toast } from "sonner";

const page = async ({ params }: { params: { id: string } }) => {
  const photos = await db.file.findMany({
    where: {
      complaintId: params.id,
    },
  });

  const complaint = await db.complaint.findUnique({
    where: {
      id: params.id,
    },
  });
  const userId = await auth();

  if (userId) {
    const userComplaintView = await db.complaintView.findUnique({
      where: {
        complaintId: params.id,
        userId: userId.user.id,
      },
    });

    if (!userComplaintView) {
      await db.complaintView.create({
        data: { complaintId: params.id, userId: userId.user.id! },
      });

      try {
        await db.complaint.update({
          where: { id: params.id },
          data: { views: { increment: 1 } },
        });
      } catch (error) {
        toast.error("Error incrementing views");
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        {complaint ? (
          <>
            {complaint.createdAt && (
              <span className="block text-sm text-gray-500 ">
                Published on {new Date(complaint.createdAt).toDateString()}
              </span>
            )}
            <h1 className="font-heading text-3xl font-normal leading-tight text-gray-900 lg:text-5xl">
              {complaint.title}
            </h1>
            <p className="mt-2 text-md font-normal  text-gray-700 lg:max-w-2xl">
              {complaint.description}
            </p>
            {photos.length > 0 && (
              <EmblaCarousel slides={photos.map((photo) => photo.url)} />
            )}
            {
              <div className="mt-4">
                <span className="text-sm text-gray-500">
                  {complaint.views} view{complaint.views !== 1 ? "s" : ""}
                </span>
              </div>
            }
          </>
        ) : (
          <p className="text-center text-lg text-red-500">
            Complaint not found
          </p>
        )}
      </div>
      <AddComplaint id={params.id} />
      <DisplayComplaint id={params.id} />
    </div>
  );
};

export default page;
