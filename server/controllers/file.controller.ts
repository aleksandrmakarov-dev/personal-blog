import { Response, Request } from "express";
import { FileUploadError, NotFoundError } from "../lib/api.errors";
import cloudinary, { UploadApiErrorResponse } from "cloudinary";
import { Ok } from "../lib/utils/express.utils";
import appConfig from "../config/app.config";
import { FileDTO } from "../lib/types/file.types";

async function upload(req: Request, res: Response) {
  const file = req.file;

  if (!file) {
    throw new NotFoundError("No file provided");
  }

  try {
    const uploadedFile = await cloudinary.v2.uploader.upload(
      appConfig.upload.path.local(file.filename),
      {
        folder: appConfig.upload.path.cloud,
        type: "upload",
      }
    );

    const fileDTO: FileDTO = {
      name: uploadedFile.original_filename,
      size: uploadedFile.bytes,
      type: uploadedFile.format,
      url: uploadedFile.secure_url,
    };

    return Ok(res, fileDTO);
  } catch (error: any) {
    const apiError = error as UploadApiErrorResponse;
    throw new FileUploadError(apiError.message);
  }
}

export default {
  upload,
};
