import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

const SharpenTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [amount, setAmount] = useState(0);

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img);
    draw(img, 0);
  }, []);

  const draw = (img: HTMLImageElement, strength: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    if (strength === 0) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const w = canvas.width;
    const copy = new Uint8ClampedArray(data);
    const factor = strength / 10;

    // Unsharp mask kernel
    for (let y = 1; y < canvas.height - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = (y * w + x) * 4;
        for (let c = 0; c < 3; c++) {
          const neighbors =
            copy[((y - 1) * w + x) * 4 + c] +
            copy[((y + 1) * w + x) * 4 + c] +
            copy[(y * w + x - 1) * 4 + c] +
            copy[(y * w + x + 1) * 4 + c];
          const diff = copy[idx + c] - neighbors / 4;
          data[idx + c] = Math.min(255, Math.max(0, copy[idx + c] + diff * factor));
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const handleChange = (v: number) => {
    setAmount(v);
    if (image) draw(image, v);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "sharpened-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout title="Sharpen Image" description="Enhance edges and details for a crisper look" onDownload={download} showDownload={!!image}>
      {!image ? <ImageUploader onImageLoad={onImageLoad} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-5 glass-card rounded-2xl p-5">
            <div>
              <Label className="text-sm">Sharpen Amount: {amount}</Label>
              <Slider value={[amount]} min={0} max={10} step={0.5} onValueChange={([v]) => handleChange(v)} />
            </div>
            <Button variant="outline" className="w-full" onClick={() => handleChange(0)}>Reset</Button>
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

export default SharpenTool;
