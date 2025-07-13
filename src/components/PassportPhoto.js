import React, { useState, useRef } from "react";

const passportSizes = [
  { label: "US (2x2 inch, 300 DPI)", width: 600, height: 600 },
  { label: "India/EU (35x45 mm, 300 DPI)", width: 413, height: 531 },
  { label: "China (33x48 mm, 300 DPI)", width: 390, height: 567 },
];

const PassportPhoto = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedSize, setSelectedSize] = useState(passportSizes[0]);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const drawToCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = selectedSize.width;
      canvas.height = selectedSize.height;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(
        selectedSize.width / img.width,
        selectedSize.height / img.height
      );
      const x = (selectedSize.width - img.width * scale) / 2;
      const y = (selectedSize.height - img.height * scale) / 2;
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };
    img.src = imageSrc;
  };

  const downloadImage = () => {
    drawToCanvas();
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "passport-photo.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="passport-container">
      <h2>Passport Photo Generator</h2>

      <label>Select Size:</label>
      <select
        value={selectedSize.label}
        onChange={(e) =>
          setSelectedSize(
            passportSizes.find((s) => s.label === e.target.value)
          )
        }
      >
        {passportSizes.map((size) => (
          <option key={size.label} value={size.label}>
            {size.label}
          </option>
        ))}
      </select>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {imageSrc && (
        <div>
          <canvas
            ref={canvasRef}
            style={{ border: "1px solid #ccc", marginTop: "15px" }}
          />
          <br />
          <button onClick={downloadImage} style={{ marginTop: "15px" }}>
            Download Passport Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default PassportPhoto;