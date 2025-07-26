// src/components/ImageToPDF.jsx
import React, { useState } from "react";
import jsPDF from "jspdf";

const ImageToPDF = () => {
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );
    const previews = imageFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages(previews);
  };

  const generatePDF = async () => {
    if (images.length === 0) return;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;
    const pageHeight = 297;

    const imagePromises = images.map((img) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = img.url;
        image.onload = () => {
          resolve(image);
        };
      });
    });

    const loadedImages = await Promise.all(imagePromises);

    loadedImages.forEach((image, index) => {
      if (index > 0) pdf.addPage();

      const ratio = Math.min(
        pageWidth / image.width,
        pageHeight / image.height
      );
      const width = image.width * ratio;
      const height = image.height * ratio;
      const x = (pageWidth - width) / 2;
      const y = (pageHeight - height) / 2;

      pdf.addImage(image, "JPEG", x, y, width, height);
    });

    pdf.save("images.pdf");
  };

  return (
    <div>
      <h2>📄 Convert Images to PDF</h2>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ marginBottom: "12px" }}
      />

      <div className="image-preview-grid">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={`preview-${index}`}
            className="image-preview"
          />
        ))}
      </div>

      <button
        onClick={generatePDF}
        disabled={images.length === 0}
        style={{ marginTop: "20px" }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default ImageToPDF;