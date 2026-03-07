import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import UndoRedoButtons from "@/components/UndoRedoButtons";

const CropTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(0);
  const [cropH, setCropH] = useState(0);
  const { canUndo, canRedo, saveState, undo, redo, reset } = useUndoRedo();

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img); setCropX(0); setCropY(0); setCropW(img.naturalWidth); setCropH(img.naturalHeight);
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    canvas.getContext("2d")!.drawImage(img, 0, 0);
    saveState(canvas);
  }, []);

  const applyCrop = () => {
    if (!image) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = cropW; canvas.height = cropH;
    canvas.getContext("2d")!.drawImage(image, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
    saveState(canvas);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout title="Crop Image" description="Crop your image to a specific area" onDownload={download} showDownload={!!image}>
      {!image ? <ImageUploader onImageLoad={onImageLoad} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4 glass-card rounded-2xl p-5">
            <UndoRedoButtons canUndo={canUndo} canRedo={canRedo} onUndo={() => canvasRef.current && undo(canvasRef.current)} onRedo={() => canvasRef.current && redo(canvasRef.current)} />
            <div className="grid grid-cols-2 gap-3">
              <div><Label>X</Label><Input type="number" value={cropX} onChange={(e) => setCropX(Number(e.target.value))} /></div>
              <div><Label>Y</Label><Input type="number" value={cropY} onChange={(e) => setCropY(Number(e.target.value))} /></div>
              <div><Label>Width</Label><Input type="number" value={cropW} onChange={(e) => setCropW(Number(e.target.value))} /></div>
              <div><Label>Height</Label><Input type="number" value={cropH} onChange={(e) => setCropH(Number(e.target.value))} /></div>
            </div>
            <Button onClick={applyCrop} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Apply Crop</Button>
            <Button variant="outline" className="w-full" onClick={() => { setImage(null); reset(); }}>New Image</Button>
          </div>
          <div className="overflow-auto glass-card rounded-2xl p-4"><canvas ref={canvasRef} className="max-w-full rounded-lg" /></div>
        </motion.div>
      )}
    </ToolLayout>
  );
};

export default CropTool;
