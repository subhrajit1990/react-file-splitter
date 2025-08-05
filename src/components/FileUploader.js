import React from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ onFileSelect }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "text/plain": [".txt", ".log"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    }
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #888",
        padding: "30px",
        textAlign: "center",
        background: isDragActive ? "#f0f8ff" : "#fff",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here...</p>
      ) : (
        <p>Drag and drop a .txt or .log file here, or tap to browse ...</p>
      )}
    </div>
  );
};

export default FileUploader;