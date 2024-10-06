import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadPhotosToLocal = async (formData: any) => {
  const images = formData.getAll("attachments");
  const buffers = await Promise.all(
    images.map(async (image: File) => {
      const data = await image.arrayBuffer();
      return Buffer.from(data).toString("base64");
    })
  );
  return buffers;
};

export async function uploadPhotosToCloudinary(buffers: string[]) {
  const uploadPromises = buffers.map((buffer) => {
    return cloudinary.uploader
      .upload(`data:image/jpeg;base64,${buffer}`, {
        folder: "AnonBox",
        resource_type: "image",
        type: "authenticated",
      })
      .catch((err) => {
        return { error: err?.message };
      });
  });

  const uploadResults = await Promise.all(uploadPromises);
  return uploadResults;
}
