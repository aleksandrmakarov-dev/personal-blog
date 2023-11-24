import fileService, { FileDTO } from "@/services/file/fileService";
import { GenericErrorModelDTO } from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const fileKeys = {
  file: {
    root: ["file"],
  },
  mutations: {
    upload: () => [...fileKeys.file.root, "upload"],
  },
};

export const useUploadFile = () => {
  return useMutation<FileDTO, AxiosError<GenericErrorModelDTO>, File, unknown>({
    mutationKey: fileKeys.mutations.upload(),
    mutationFn: async (file) => {
      return await fileService.uploadFile(file);
    },
  });
};
