import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { RotateCw, RotateCcw, FlipHorizontal, FlipVertical } from "lucide-react";
import { motion } from "framer-motion";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import UndoRedoButtons from "@/components/UndoRedoButtons";

const RotateTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const { canUndo, canRedo, saveState, undo, redo, reset } = useUndoRedo();

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img); setRotation(0); setFlipH(false); setFlipV(false);
    draw(img, 0, false, false, true);
  }, []);

  const draw = (img: HTMLImageElement, rot: number, fh: boolean, fv: boolean, save = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const isRotated = rot % 180 !== 0;
    canvas.width = isRotated ? img.naturalHeight : img.naturalWidth;
    canvas.height = isRotated ? img.naturalWidth : img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.scale(fh ? -1 : 1, fv ? -1 : 1);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    ctx.restore();
    if (save) saveState(canvas);
  };

  const rotate = (deg: number) => {
    const r = (rotation + deg + 360) % 360;
    setRotation(r);
    if (image) { draw(image, r, flipH, flipV); if (canvasRef.current) saveState(canvasRef.current); }
  };
  const toggleFlipH = () => {
    setFlipH(!flipH);
    if (image) { draw(image, rotation, !flipH, flipV); if (canvasRef.current) saveState(canvasRef.current); }
  };
  const toggleFlipV = () => {
    setFlipV(!flipV);
    if (image) { draw(image, rotation, flipH, !flipV); if (canvasRef.current) saveState(canvasRef.current); }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "rotated-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout title="Rotate & Flip" description="Rotate or flip your image" onDownload={download} showDownload={!!image}>
      {!image ? <ImageUploader onImageLoad={onImageLoad} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4 glass-card rounded-2xl p-5">
            <UndoRedoButtons canUndo={canUndo} canRedo={canRedo} onUndo={() => canvasRef.current && undo(canvasRef.current)} onRedo={() => canvasRef.current && redo(canvasRef.current)} />
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => rotate(-90)}><RotateCcw className="mr-2 h-4 w-4" /> Left 90°</Button>
              <Button variant="outline" onClick={() => rotate(90)}><RotateCw className="mr-2 h-4 w-4" /> Right 90°</Button>
              <Button variant="outline" onClick={toggleFlipH} className={flipH ? "border-primary text-primary" : ""}><FlipHorizontal className="mr-2 h-4 w-4" /> Flip H</Button>
              <Button variant="outline" onClick={toggleFlipV} className={flipV ? "border-primary text-primary" : ""}><FlipVertical className="mr-2 h-4 w-4" /> Flip V</Button>
            </div>
            <p className="text-sm text-muted-foreground">Rotation: {rotation}°</p>
            <Button variant="outline" className="w-full" onClick={() => { setImage(null); reset(); }}>New Image</Button>
          </div>
          <div className="overflow-auto glass-card rounded-2xl p-4"><canvas ref={canvasRef} className="max-w-full rounded-lg" /></div>
        </motion.div>
      )}
    </ToolLayout>
  );
};

export default RotateTool;
