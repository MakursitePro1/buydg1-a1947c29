import { Upload, ImageIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`upload-zone flex flex-col items-center justify-center rounded-2xl p-16 cursor-pointer ${dragOver ? "drag-over" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary"
        >
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
        </motion.div>
        <p className="mb-2 font-display text-xl font-semibold text-foreground">Drop your image here</p>
        <p className="mb-4 text-sm text-muted-foreground">or click to browse files</p>
        <div className="flex gap-2">
          {["PNG", "JPG", "WEBP", "GIF", "BMP"].map((f) => (
            <span key={f} className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground">{f}</span>
          ))}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
        />
      </div>
    </motion.div>
  );
};

export default ImageUploader;
