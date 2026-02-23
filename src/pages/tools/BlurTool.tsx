import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

const BlurTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [blurAmount, setBlurAmount] = useState(0);

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img);
    draw(img, 0);
  }, []);

  const draw = (img: HTMLImageElement, blur: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.filter = blur > 0 ? `blur(${blur}px)` : "none";
    ctx.drawImage(img, 0, 0);
    ctx.filter = "none";
  };

  const handleBlur = (v: number) => {
    setBlurAmount(v);
    if (image) draw(image, v);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "blurred-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout title="Blur Effect" description="Add gaussian blur effect to your image" onDownload={download} showDownload={!!image}>
      {!image ? <ImageUploader onImageLoad={onImageLoad} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-5 glass-card rounded-2xl p-5">
            <div>
              <Label className="text-sm">Blur Radius: {blurAmount}px</Label>
              <Slider value={[blurAmount]} min={0} max={20} step={0.5} onValueChange={([v]) => handleBlur(v)} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 2, 5, 8, 12, 20].map((v) => (
                <Button key={v} variant={blurAmount === v ? "default" : "outline"} size="sm" onClick={() => handleBlur(v)} className={blurAmount === v ? "bg-primary text-primary-foreground" : ""}>
                  {v}px
                </Button>
              ))}
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

export default BlurTool;
