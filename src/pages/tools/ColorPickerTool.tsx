import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

const ColorPickerTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [pickedColors, setPickedColors] = useState<string[]>([]);
  const [hoveredColor, setHoveredColor] = useState("");

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img);
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d")!.drawImage(img, 0, 0);
  }, []);

  const getColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const ctx = canvas.getContext("2d")!;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return `#${pixel[0].toString(16).padStart(2, "0")}${pixel[1].toString(16).padStart(2, "0")}${pixel[2].toString(16).padStart(2, "0")}`;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const color = getColor(e);
    if (color) setPickedColors((prev) => [color, ...prev.slice(0, 11)]);
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const color = getColor(e);
    if (color) setHoveredColor(color);
  };

  const copyColor = (c: string) => navigator.clipboard.writeText(c);

  return (
    <ToolLayout title="Color Picker" description="Extract colors from any image pixel">
      {!image ? <ImageUploader onImageLoad={onImageLoad} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4 glass-card rounded-2xl p-5">
            {hoveredColor && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                <div className="h-10 w-10 rounded-lg border border-border" style={{ background: hoveredColor }} />
                <div>
                  <p className="text-xs text-muted-foreground">Hover</p>
                  <p className="font-mono text-sm text-foreground">{hoveredColor}</p>
                </div>
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Picked Colors</p>
              {pickedColors.length === 0 && <p className="text-xs text-muted-foreground">Click on the image to pick colors</p>}
              <div className="grid grid-cols-2 gap-2">
                {pickedColors.map((c, i) => (
                  <button key={i} onClick={() => copyColor(c)} className="flex items-center gap-2 rounded-lg bg-secondary p-2 hover:bg-muted transition-colors group">
                    <div className="h-6 w-6 rounded border border-border flex-shrink-0" style={{ background: c }} />
                    <span className="font-mono text-xs text-foreground truncate">{c}</span>
                    <Copy className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 ml-auto flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => { setImage(null); setPickedColors([]); }}>New Image</Button>
          </div>
          <div className="overflow-auto glass-card rounded-2xl p-4">
            <canvas
              ref={canvasRef}
              className="max-w-full rounded-lg cursor-crosshair"
              onClick={handleClick}
              onMouseMove={handleMove}
            />
          </div>
        </motion.div>
      )}
    </ToolLayout>
  );
};

export default ColorPickerTool;
