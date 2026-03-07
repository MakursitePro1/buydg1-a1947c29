import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import UndoRedoButtons from "@/components/UndoRedoButtons";

const CompressTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const { canUndo, canRedo, saveState, undo, redo, reset } = useUndoRedo();

  const onImageLoad = useCallback((img: HTMLImageElement, file: File) => {
    setImage(img); setOriginalSize(file.size);
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    canvas.getContext("2d")!.drawImage(img, 0, 0);
    estimateSize(canvas, 80);
    saveState(canvas);
  }, []);

  const estimateSize = (canvas: HTMLCanvasElement, q: number) => {
    const dataUrl = canvas.toDataURL("image/jpeg", q / 100);
    setCompressedSize(Math.round((dataUrl.length - 23) * 0.75));
  };

  const handleQualityChange = (q: number) => {
    setQuality(q);
    const canvas = canvasRef.current;
    if (canvas && image) {
      canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
      canvas.getContext("2d")!.drawImage(image, 0, 0);
      estimateSize(canvas, q);
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `compressed-q${quality}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", quality / 100);
    link.click();
  };

  const fmt = (b: number) => b < 1024 ? b + " B" : b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(1) + " MB";

  return (
    <ToolLayout title="Compress Image" description="Reduce file size while maintaining quality" onDownload={download} showDownload={!!image}>
      {!image ? <ImageUploader onImageLoad={onImageLoad} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4 glass-card rounded-2xl p-5">
            <UndoRedoButtons canUndo={canUndo} canRedo={canRedo} onUndo={() => canvasRef.current && undo(canvasRef.current)} onRedo={() => canvasRef.current && redo(canvasRef.current)} />
            <div><Label className="text-sm">Quality: {quality}%</Label><Slider value={[quality]} min={1} max={100} onValueChange={([v]) => handleQualityChange(v)} /></div>
            <div className="space-y-1.5 rounded-xl bg-secondary p-4">
              <p className="text-sm text-muted-foreground">Original: <span className="font-medium text-foreground">{fmt(originalSize)}</span></p>
              <p className="text-sm text-muted-foreground">Compressed: <span className="font-medium text-primary">{fmt(compressedSize)}</span></p>
              <p className="text-sm text-muted-foreground">Saved: <span className="font-medium text-primary">{originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0}%</span></p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => { setImage(null); reset(); }}>New Image</Button>
          </div>
          <div className="overflow-auto glass-card rounded-2xl p-4"><canvas ref={canvasRef} className="max-w-full rounded-lg" /></div>
        </motion.div>
      )}
    </ToolLayout>
  );
};

export default CompressTool;
