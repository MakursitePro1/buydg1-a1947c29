import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import UndoRedoButtons from "@/components/UndoRedoButtons";

const ResizeTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [lockRatio, setLockRatio] = useState(true);
  const { canUndo, canRedo, saveState, undo, redo, reset } = useUndoRedo();

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img); setWidth(img.naturalWidth); setHeight(img.naturalHeight);
    setOrigW(img.naturalWidth); setOrigH(img.naturalHeight);
    drawImage(img, img.naturalWidth, img.naturalHeight, true);
  }, []);

  const drawImage = (img: HTMLImageElement, w: number, h: number, initial = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = w; canvas.height = h;
    canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
    if (initial) saveState(canvas);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockRatio && origW > 0) {
      const newH = Math.round((val / origW) * origH);
      setHeight(newH);
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockRatio && origH > 0) {
      const newW = Math.round((val / origH) * origW);
      setWidth(newW);
    }
  };

  const applyResize = () => {
    if (!image) return;
    drawImage(image, width, height);
    if (canvasRef.current) saveState(canvasRef.current);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `resized-${width}x${height}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout title="Resize Image" description="Change the dimensions of your image" onDownload={download} showDownload={!!image}>
      {!image ? <ImageUploader onImageLoad={onImageLoad} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4 glass-card rounded-2xl p-5">
            <UndoRedoButtons canUndo={canUndo} canRedo={canRedo} onUndo={() => canvasRef.current && undo(canvasRef.current)} onRedo={() => canvasRef.current && redo(canvasRef.current)} />
            <div><Label className="text-sm text-muted-foreground">Original: {origW} × {origH}</Label></div>
            <div><Label htmlFor="w">Width (px)</Label><Input id="w" type="number" value={width} onChange={(e) => handleWidthChange(Number(e.target.value))} /></div>
            <div><Label htmlFor="h">Height (px)</Label><Input id="h" type="number" value={height} onChange={(e) => handleHeightChange(Number(e.target.value))} /></div>
            <div className="flex items-center gap-2"><Switch checked={lockRatio} onCheckedChange={setLockRatio} /><Label className="text-sm">Lock aspect ratio</Label></div>
            <Button onClick={applyResize} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Apply Resize</Button>
            <Button variant="outline" className="w-full" onClick={() => { setImage(null); reset(); }}>New Image</Button>
          </div>
          <div className="overflow-auto glass-card rounded-2xl p-4"><canvas ref={canvasRef} className="max-w-full rounded-lg" /></div>
        </motion.div>
      )}
    </ToolLayout>
  );
};

export default ResizeTool;
