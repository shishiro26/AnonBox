"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import {
  uploadPhotosToCloudinary,
  uploadPhotosToLocal,
} from "@/data/cloudinary";
import { auth } from "@/auth";
import { UploadApiResponse } from "cloudinary";

export const createComplaint = async (formData: FormData) => {
  const file = await uploadPhotosToLocal(formData);
  const photos = await uploadPhotosToCloudinary(file);

  const user = await auth();
  if (!user) {
    return { error: "You must be logged in to perform this action." };
  }

  const userId = user.user.id as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const successfulUploads = photos.filter(
    (photo): photo is UploadApiResponse =>
      (photo as UploadApiResponse).secure_url !== undefined &&
      (photo as UploadApiResponse).public_id !== undefined
  );

  const complaintData: any = {
    title: title,
    description: description,
    userId: userId,
  };

  if (successfulUploads.length > 0) {
    complaintData.attachments = {
      create: successfulUploads.map((photo) => ({
        url: photo.secure_url,
        public_id: photo.public_id,
      })),
    };
  }

  try {
    await db.complaint.create({
      data: complaintData,
    });
  } catch (err: any) {
    return { error: "An error occurred. Please try again later." };
  }

  revalidatePath("/");

  return { success: "Bank details added!" };
};
