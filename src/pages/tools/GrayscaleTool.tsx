import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import UndoRedoButtons from "@/components/UndoRedoButtons";

const GrayscaleTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [mode, setMode] = useState<"luminosity" | "average" | "lightness">("luminosity");
  const { canUndo, canRedo, saveState, undo, redo, reset } = useUndoRedo();

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img);
    draw(img, "luminosity", true);
  }, []);

  const draw = (img: HTMLImageElement, m: string, save = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      let gray: number;
      if (m === "luminosity") {
        gray = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      } else if (m === "average") {
        gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
      } else {
        gray = (Math.max(data[i], data[i + 1], data[i + 2]) + Math.min(data[i], data[i + 1], data[i + 2])) / 2;
      }
      data[i] = data[i + 1] = data[i + 2] = gray;
    }
    ctx.putImageData(imageData, 0, 0);
    if (save) saveState(canvas);
  };

  const handleMode = (m: "luminosity" | "average" | "lightness") => {
    setMode(m);
    if (image) {
      draw(image, m);
      if (canvasRef.current) saveState(canvasRef.current);
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "grayscale-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout title="Grayscale" description="Convert your image to black & white" onDownload={download} showDownload={!!image}>
      {!image ? <ImageUploader onImageLoad={onImageLoad} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4 glass-card rounded-2xl p-5">
            <UndoRedoButtons canUndo={canUndo} canRedo={canRedo} onUndo={() => canvasRef.current && undo(canvasRef.current)} onRedo={() => canvasRef.current && redo(canvasRef.current)} />
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Conversion Method</p>
              <div className="space-y-2">
                {(["luminosity", "average", "lightness"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => handleMode(m)}
                    className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm capitalize transition-colors ${mode === m ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground hover:border-primary/50"}`}
                  >
                    {m}
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {m === "luminosity" ? "Perceptually accurate" : m === "average" ? "Simple RGB average" : "Min/max blend"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => { setImage(null); reset(); }}>New Image</Button>
          </div>
          <div className="overflow-auto glass-card rounded-2xl p-4">
            <canvas ref={canvasRef} className="max-w-full rounded-lg" />
          </div>
        </motion.div>
      )}
    </ToolLayout>
  );
};

export default GrayscaleTool;
