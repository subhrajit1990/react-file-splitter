
import React, { useState } from "react";
import JSZip from "jszip";

const FileSplitter = ({ file }) => {
  const [mode, setMode] = useState("size");
  const [splitSize, setSplitSize] = useState(1024 * 1024); // Default 1MB
  const [keyword, setKeyword] = useState("");
  const [splitFiles, setSplitFiles] = useState([]);
  const [enableZip, setEnableZip] = useState(false);

  // Helper to get extension like .txt or .log
  const getFileExtension = () => {
    const parts = file.name.split(".");
    return parts.length > 1 ? `.${parts.pop()}` : ".txt";
  };

  // Helper to get base name like "abc"
  const getBaseName = () => {
    const parts = file.name.split(".");
    parts.pop();
    return parts.join(".");
  };

  const handleSplit = async () => {
    const text = await file.text();
    const results = [];

    if (mode === "size") {
      let start = 0;
      while (start < text.length) {
        const end = start + splitSize;
        const chunk = text.slice(start, end);
        results.push(chunk);
        start = end;
      }
    } else if (mode === "keyword") {
      if (!keyword) {
        alert("Please enter a keyword to split by.");
        return;
      }
      const parts = text.split(keyword);
      for (let i = 0; i < parts.length; i++) {
        const content = i === 0 ? parts[i] : keyword + parts[i];
        results.push(content);
      }
    }

    const base = getBaseName();
    const ext = getFileExtension();

    const blobs = await Promise.all(
      results.map(async (content, index) => {
        const filename = `${base}-${index + 1}${ext}`;
        if (enableZip) {
          const zip = new JSZip();
          zip.file(filename, content);
          const zipBlob = await zip.generateAsync({ type: "blob" });
          return {
            blob: zipBlob,
            filename: `${base}-${index + 1}.zip`,
          };
        } else {
          return {
            blob: new Blob([content], { type: "text/plain" }),
            filename,
          };
        }
      })
    );

    setSplitFiles(blobs);
  };

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <label><strong>Split Mode:</strong></label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{ marginLeft: "10px", padding: "6px" }}
        >
          <option value="size">Split by Size</option>
          <option value="keyword">Split by Keyword</option>
        </select>
      </div>

      {mode === "size" && (
        <div>
          <label>Split Size (bytes):</label>
          <input
            type="number"
            value={splitSize}
            onChange={(e) => setSplitSize(Number(e.target.value))}
            placeholder="e.g. 1048576 for 1MB"
          />
        </div>
      )}

      {mode === "keyword" && (
        <div>
          <label>Split Keyword (e.g. ERROR or 2025-07-05):</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword"
          />
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={enableZip}
            onChange={(e) => setEnableZip(e.target.checked)}
          />
          {" "}Create ZIP for each file
        </label>
      </div>

      <button onClick={handleSplit} style={{ marginTop: "10px" }}>
        Split File
      </button>

      {splitFiles.length > 0 && (
        <div className="download-links">
          <h3>{splitFiles.length} file{splitFiles.length > 1 ? "s" : ""} created:</h3>
          {splitFiles.map(({ blob, filename }, index) => (
            <a
              key={index}
              href={URL.createObjectURL(blob)}
              download={filename}
            >
              {filename}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileSplitter;