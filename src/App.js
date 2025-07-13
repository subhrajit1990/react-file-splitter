import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import FileSplitter from "./components/FileSplitter";
import PassportPhoto from "./components/PassportPhoto";
import Footer from "./components/Footer";
import BalloonGame from "./components/BalloonGame";
import "./styles.css";

const App = () => {
  const [tab, setTab] = useState("splitter");
  const [file, setFile] = useState(null);

  return (
    <div className="container">
      <h1>Get It Done!</h1>

    <div className="tab-buttons">
  <button
    onClick={() => setTab("splitter")}
    className={tab === "splitter" ? "active" : ""}
  >
    File Splitter
  </button>
  <button
    onClick={() => setTab("passport")}
    className={tab === "passport" ? "active" : ""}
  >
    Passport Photo
  </button>
  <button
    onClick={() => setTab("game")}
    className={tab === "game" ? "active" : ""}
  >
    Balloon Game
  </button>
</div>

      {tab === "splitter" && (
        <>
          <FileUploader onFileSelect={setFile} />
          {file && (
            <>
              <p style={{ textAlign: "center", fontStyle: "italic" }}>
                Selected File: <strong>{file.name}</strong>
              </p>
              <FileSplitter file={file} />
            </>
          )}
        </>
      )}

      {tab === "passport" && <PassportPhoto />}
      {tab === "game" && <BalloonGame />}
      <Footer />
    </div>
  );
};

export default App;