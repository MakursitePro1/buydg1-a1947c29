import { Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

interface ImageUploaderProps {
  onImageLoad: (img: HTMLImageElement, file: File) => void;
}

const ImageUploader = ({ onImageLoad }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const img = new window.Image();
      img.onload = () => onImageLoad(img, file);
      img.src = URL.createObjectURL(file);
    },
    [onImageLoad]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  return (
    <div
      className={`upload-zone flex flex-col items-center justify-center rounded-xl p-12 cursor-pointer ${dragOver ? "drag-over" : ""}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
    >
      <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
      <p className="mb-1 font-display text-lg font-semibold text-foreground">Drop your image here</p>
      <p className="text-sm text-muted-foreground">or click to browse — PNG, JPG, WEBP supported</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) handleFile(e.target.files[0]);
        }}
      />
    </div>
  );
};

export default ImageUploader;
