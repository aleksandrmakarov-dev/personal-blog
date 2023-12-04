import { Response, Request } from "express";
import { FileUploadError, NotFoundError } from "../lib/api.errors";
import cloudinary from "cloudinary";
import { Ok } from "../lib/utils/express.utils";
import appConfig from "../config/app.config";
import { FileDTO } from "../lib/types/file.types";
import streamifier from "streamifier";

async function upload(req: Request, res: Response) {
  const file = req.file;

  if (!file) {
    throw new NotFoundError("No file provided");
  }

  const fileStream = streamifier.createReadStream(file.buffer);
  const uploadStream = await cloudinary.v2.uploader.upload_stream(
    {
      folder: appConfig.upload.path.cloud,
      type: "upload",
    },
    (error, uploadedFile) => {
      if (error) {
        throw new FileUploadError(error.message);
      }

      if (!uploadedFile) {
        throw new FileUploadError("No file uploaded");
      }

      const fileDTO: FileDTO = {
        name: uploadedFile.original_filename,
        size: uploadedFile.bytes,
        type: uploadedFile.format,
        url: uploadedFile.secure_url,
      };

      return Ok(res, fileDTO);
    }
  );

  fileStream.pipe(uploadStream);
}

export default {
  upload,
};
