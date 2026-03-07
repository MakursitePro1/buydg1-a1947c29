import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import UndoRedoButtons from "@/components/UndoRedoButtons";

const BrightnessTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [exposure, setExposure] = useState(100);
  const [gamma, setGamma] = useState(100);
  const { canUndo, canRedo, saveState, undo, redo, reset } = useUndoRedo();

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img);
    draw(img, 100, 100, 100, true);
  }, []);

  const draw = (img: HTMLImageElement, b: number, e: number, g: number, save = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = `brightness(${b}%) contrast(${e}%)`;
    ctx.drawImage(img, 0, 0);
    ctx.filter = "none";
    if (g !== 100) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const gammaVal = g / 100;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 * Math.pow(data[i] / 255, 1 / gammaVal);
        data[i + 1] = 255 * Math.pow(data[i + 1] / 255, 1 / gammaVal);
        data[i + 2] = 255 * Math.pow(data[i + 2] / 255, 1 / gammaVal);
      }
      ctx.putImageData(imageData, 0, 0);
    }
    if (save) saveState(canvas);
  };

  const handleChange = (b: number, e: number, g: number) => {
    setBrightness(b); setExposure(e); setGamma(g);
    if (image) draw(image, b, e, g);
  };

  const applyChanges = () => {
    if (image) {
      draw(image, brightness, exposure, gamma);
      if (canvasRef.current) saveState(canvasRef.current);
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "brightness-adjusted.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout title="Adjust Brightness" description="Fine-tune brightness, exposure & gamma" onDownload={download} showDownload={!!image}>
      {!image ? <ImageUploader onImageLoad={onImageLoad} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-5 glass-card rounded-2xl p-5">
            <UndoRedoButtons canUndo={canUndo} canRedo={canRedo} onUndo={() => canvasRef.current && undo(canvasRef.current)} onRedo={() => canvasRef.current && redo(canvasRef.current)} />
            <div>
              <Label className="text-sm">Brightness: {brightness}%</Label>
              <Slider value={[brightness]} min={0} max={200} step={1} onValueChange={([v]) => handleChange(v, exposure, gamma)} />
            </div>
            <div>
              <Label className="text-sm">Contrast: {exposure}%</Label>
              <Slider value={[exposure]} min={0} max={200} step={1} onValueChange={([v]) => handleChange(brightness, v, gamma)} />
            </div>
            <div>
              <Label className="text-sm">Gamma: {gamma}%</Label>
              <Slider value={[gamma]} min={20} max={300} step={1} onValueChange={([v]) => handleChange(brightness, exposure, v)} />
            </div>
            <Button onClick={applyChanges} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Apply</Button>
            <Button variant="outline" className="w-full" onClick={() => handleChange(100, 100, 100)}>Reset</Button>
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

export default BrightnessTool;
