import axios, { type AxiosProgressEvent } from "axios";

export const uploadToIPFS = async (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
  signal?: AbortSignal,
): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("/api/ipfs", formData, {
      signal,
      onUploadProgress,
    });

    return response.data.ipfsHash;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Upload canceled");
    } else {
      console.error("Error uploading to IPFS", error);
    }
    return null;
  }
};
