import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { uploadToIPFS } from "./service";
import axios from "axios";
import { IconX } from "../Icons/IconX";

interface DropzoneProps {
  onDrop: (acceptedFile: File, ipfsHash: string) => void;
  name: string;
  rules?: RegisterOptions;
}

export const Dropzone: React.FC<DropzoneProps> = ({ name, rules, onDrop }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const { register, setValue, trigger } = useFormContext();

  const onDropCallback = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      setIpfsHash(null);
      setIsLoading(true);

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const ipfsHash = await uploadToIPFS(
        file,
        (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        },
        controller.signal // Pass the AbortController signal for cancellation
      );

      setIsLoading(false);
      abortControllerRef.current = null;

      if (ipfsHash) {
        onDrop(file, ipfsHash);
        setIpfsHash(ipfsHash);
        setValue(name, ipfsHash, { shouldValidate: true }); // Set value and trigger validation
      }
    },
    [onDrop, setValue, name]
  );

  const cancelUpload = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setUploadProgress(0);
      setSelectedImage(null);
      setIsLoading(false);
    }
  };

  const deleteUploadedImage = async () => {
    if (ipfsHash) {
      try {
        await axios.delete("/api/ipfs", { data: { ipfsHash } });
        setUploadProgress(0);
        setSelectedImage(null);
        setIpfsHash(null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error deleting from IPFS", error);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  useEffect(() => {
    // Set validation state when image is selected
    trigger(name);
  }, [selectedImage, trigger, name, ipfsHash, isLoading]);

  return (
    <>
      <div
        {...getRootProps()}
        className={`py-14 border-[1px] border-dashed border-giv-500 p-4 rounded-2xl text-center bg-gray-100 text-gray-400 cursor-pointer ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <input {...getInputProps()} />
        <input
          {...register(name, {
            ...rules,
            validate: (value) => {
              if (isLoading) {
                return "Upload in progress...";
              }
              return true;
            },
          })}
          value={ipfsHash || ""}
          className="hidden"
          readOnly
        />
        {isDragActive ? (
          <p>Drop the icon here ...</p>
        ) : (
          <>
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Icon"
                className="block mb-4 mx-auto"
              />
            ) : (
              <>
                <p>Drop your Token icon here</p>
                <p>or</p>
                <p className="font-bold">Browse Files</p>
              </>
            )}
            {isLoading && <p className="text-blue-500 mt-2">Uploading...</p>}
          </>
        )}
      </div>
      {selectedImage && (
        <div className="flex flex-col gap-1">
          <p className="text-sm text-nowrap max-w-full overflow-hidden text-ellipsis">
            {selectedImage.name}
          </p>
          <div className="flex justify-between overflow-hidden max-w-full">
            <p className="text-xs text-nowrap max-w-full overflow-hidden text-ellipsis">
              {ipfsHash ? "Uploaded" : "Uploading..."}
            </p>
            <button
              type="button"
              onClick={ipfsHash ? deleteUploadedImage : cancelUpload}
              className="px-2 text-xs text-pink-500 rounded border-none flex gap-1 items-center"
            >
              <IconX size={8} />
              {ipfsHash ? <span>Delete</span> : <span>Cancel Upload</span>}
            </button>
          </div>
          <div className="relative w-full bg-gray-200 h-2 rounded-lg overflow-hidden mb-4">
            <div
              className="absolute top-0 left-0 h-full bg-giv-500 transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};
