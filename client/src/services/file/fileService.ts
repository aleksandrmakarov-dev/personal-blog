import axios from "axios";

const baseUrl = "/api/files";

export interface FileDTO {
  name: string;
  size: number;
  type: string;
  url: string;
}

async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post<FileDTO>(`${baseUrl}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export default {
  uploadFile,
};
