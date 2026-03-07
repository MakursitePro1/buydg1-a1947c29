import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import UndoRedoButtons from "@/components/UndoRedoButtons";

const filters = [
  { name: "None", css: "none" },
  { name: "Grayscale", css: "grayscale(100%)" },
  { name: "Sepia", css: "sepia(100%)" },
  { name: "Invert", css: "invert(100%)" },
  { name: "Blur", css: "blur(3px)" },
  { name: "Vintage", css: "sepia(50%) contrast(120%) brightness(90%)" },
  { name: "Warm", css: "sepia(30%) saturate(140%)" },
  { name: "Cool", css: "hue-rotate(180deg) saturate(80%)" },
];

const FiltersTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [activeFilter, setActiveFilter] = useState("none");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const { canUndo, canRedo, saveState, undo, redo, reset } = useUndoRedo();

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img);
    drawWithFilter(img, "none", 100, 100, 100, true);
  }, []);

  const drawWithFilter = (img: HTMLImageElement, filter: string, b: number, c: number, s: number, save = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    const adj = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
    ctx.filter = filter === "none" ? adj : `${filter} ${adj}`;
    ctx.drawImage(img, 0, 0);
    ctx.filter = "none";
    if (save) saveState(canvas);
  };

  const applyFilter = (css: string) => {
    setActiveFilter(css);
    if (image) {
      drawWithFilter(image, css, brightness, contrast, saturation);
      if (canvasRef.current) saveState(canvasRef.current);
    }
  };

  const handleAdjust = (b: number, c: number, s: number) => {
    setBrightness(b); setContrast(c); setSaturation(s);
    if (image) drawWithFilter(image, activeFilter, b, c, s);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "filtered-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout title="Photo Filters" description="Apply filters and adjust colors" onDownload={download} showDownload={!!image}>
      {!image ? <ImageUploader onImageLoad={onImageLoad} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-5 glass-card rounded-2xl p-5">
            <UndoRedoButtons canUndo={canUndo} canRedo={canRedo} onUndo={() => canvasRef.current && undo(canvasRef.current)} onRedo={() => canvasRef.current && redo(canvasRef.current)} />
            <div>
              <Label className="mb-2 block text-sm font-semibold">Filters</Label>
              <div className="grid grid-cols-2 gap-2">
                {filters.map((f) => (
                  <button key={f.name} onClick={() => applyFilter(f.css)}
                    className={`rounded-lg border px-3 py-2 text-sm transition-colors ${activeFilter === f.css ? "border-primary bg-primary/10 text-primary" : "text-muted-foreground hover:border-primary/50"}`}
                  >{f.name}</button>
                ))}
              </div>
            </div>
            <div><Label className="text-sm">Brightness: {brightness}%</Label><Slider value={[brightness]} min={0} max={200} onValueChange={([v]) => handleAdjust(v, contrast, saturation)} /></div>
            <div><Label className="text-sm">Contrast: {contrast}%</Label><Slider value={[contrast]} min={0} max={200} onValueChange={([v]) => handleAdjust(brightness, v, saturation)} /></div>
            <div><Label className="text-sm">Saturation: {saturation}%</Label><Slider value={[saturation]} min={0} max={200} onValueChange={([v]) => handleAdjust(brightness, contrast, v)} /></div>
            <Button variant="outline" className="w-full" onClick={() => { setImage(null); setActiveFilter("none"); setBrightness(100); setContrast(100); setSaturation(100); reset(); }}>New Image</Button>
          </div>
          <div className="overflow-auto glass-card rounded-2xl p-4"><canvas ref={canvasRef} className="max-w-full rounded-lg" /></div>
        </motion.div>
      )}
    </ToolLayout>
  );
};

export default FiltersTool;
