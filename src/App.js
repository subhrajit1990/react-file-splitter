
import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import FileSplitter from "./components/FileSplitter";
import "./styles.css";
import Footer from "./components/Footer";

const App = () => {
  const [file, setFile] = useState(null);
  return (
    <div className="container">
      <h1>File Splitter</h1>
      <FileUploader onFileSelect={setFile} />
      {file && (
        <>
          <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
            Selected File: <strong>{file.name}</strong>
          </p>
          <FileSplitter file={file} />
        </>
      )}
    </div>
  );
};

export default App;
