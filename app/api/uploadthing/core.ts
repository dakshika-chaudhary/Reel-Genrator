import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  audioUploader: f({
    audio: { maxFileSize: "64MB" }, // audio supported!
  })
    .onUploadComplete(async ({ file }) => {
      console.log("File uploaded:", file.url);
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
