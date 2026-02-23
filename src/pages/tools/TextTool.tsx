import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

const fonts = ["Arial", "Georgia", "Courier New", "Impact", "Comic Sans MS", "Verdana", "Times New Roman"];

const TextTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [text, setText] = useState("Your Text Here");
  const [fontSize, setFontSize] = useState(48);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [color, setColor] = useState("#ffffff");
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
  const [shadow, setShadow] = useState(true);

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img);
    draw(img, "Your Text Here", 48, "Arial", "#ffffff", 50, 50, true);
  }, []);

  const draw = (img: HTMLImageElement, t: string, size: number, font: string, col: string, px: number, py: number, sh: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const x = (px / 100) * canvas.width;
    const y = (py / 100) * canvas.height;
    ctx.font = `bold ${size}px "${font}"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (sh) {
      ctx.shadowColor = "rgba(0,0,0,0.7)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
    }
    ctx.fillStyle = col;
    ctx.fillText(t, x, y);
    ctx.shadowColor = "transparent";
  };

  const update = (t: string, s: number, f: string, c: string, px: number, py: number, sh: boolean) => {
    setText(t); setFontSize(s); setFontFamily(f); setColor(c); setPosX(px); setPosY(py); setShadow(sh);
    if (image) draw(image, t, s, f, c, px, py, sh);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "text-overlay.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout title="Add Text" description="Overlay text with custom fonts and styles" onDownload={download} showDownload={!!image}>
      {!image ? <ImageUploader onImageLoad={onImageLoad} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4 glass-card rounded-2xl p-5">
            <div>
              <Label>Text</Label>
              <Input value={text} onChange={(e) => update(e.target.value, fontSize, fontFamily, color, posX, posY, shadow)} />
            </div>
            <div>
              <Label>Font</Label>
              <Select value={fontFamily} onValueChange={(v) => update(text, fontSize, v, color, posX, posY, shadow)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {fonts.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Size: {fontSize}px</Label>
              <Slider value={[fontSize]} min={12} max={200} onValueChange={([v]) => update(text, v, fontFamily, color, posX, posY, shadow)} />
            </div>
            <div>
              <Label>Color</Label>
              <input type="color" value={color} onChange={(e) => update(text, fontSize, fontFamily, e.target.value, posX, posY, shadow)} className="h-10 w-full rounded-lg cursor-pointer" />
            </div>
            <div>
              <Label>X Position: {posX}%</Label>
              <Slider value={[posX]} min={0} max={100} onValueChange={([v]) => update(text, fontSize, fontFamily, color, v, posY, shadow)} />
            </div>
            <div>
              <Label>Y Position: {posY}%</Label>
              <Slider value={[posY]} min={0} max={100} onValueChange={([v]) => update(text, fontSize, fontFamily, color, posX, v, shadow)} />
            </div>
            <Button variant="outline" className="w-full" onClick={() => setImage(null)}>New Image</Button>
          </div>
          <div className="overflow-auto glass-card rounded-2xl p-4">
            <canvas ref={canvasRef} className="max-w-full rounded-lg" />
          </div>
        </motion.div>
      )}
    </ToolLayout>
  );
};

export default TextTool;
