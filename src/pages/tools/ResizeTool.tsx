import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const ResizeTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [lockRatio, setLockRatio] = useState(true);

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img);
    setWidth(img.naturalWidth);
    setHeight(img.naturalHeight);
    setOrigW(img.naturalWidth);
    setOrigH(img.naturalHeight);
    drawImage(img, img.naturalWidth, img.naturalHeight);
  }, []);

  const drawImage = (img: HTMLImageElement, w: number, h: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, w, h);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockRatio && origW > 0) {
      const newH = Math.round((val / origW) * origH);
      setHeight(newH);
      if (image) drawImage(image, val, newH);
    } else {
      if (image) drawImage(image, val, height);
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockRatio && origH > 0) {
      const newW = Math.round((val / origH) * origW);
      setWidth(newW);
      if (image) drawImage(image, newW, val);
    } else {
      if (image) drawImage(image, width, val);
    }
  };

  const applyResize = () => {
    if (image) drawImage(image, width, height);
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
      {!image ? (
        <ImageUploader onImageLoad={onImageLoad} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4 rounded-xl border bg-card p-5">
            <div>
              <Label className="text-sm text-muted-foreground">Original: {origW} × {origH}</Label>
            </div>
            <div>
              <Label htmlFor="w">Width (px)</Label>
              <Input id="w" type="number" value={width} onChange={(e) => handleWidthChange(Number(e.target.value))} />
            </div>
            <div>
              <Label htmlFor="h">Height (px)</Label>
              <Input id="h" type="number" value={height} onChange={(e) => handleHeightChange(Number(e.target.value))} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={lockRatio} onCheckedChange={setLockRatio} />
              <Label className="text-sm">Lock aspect ratio</Label>
            </div>
            <Button onClick={applyResize} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Apply Resize
            </Button>
            <Button variant="outline" className="w-full" onClick={() => { setImage(null); }}>
              Upload New Image
            </Button>
          </div>
          <div className="overflow-auto rounded-xl border bg-secondary/30 p-4">
            <canvas ref={canvasRef} className="max-w-full rounded" />
          </div>
        </div>
      )}
    </ToolLayout>
  );
};

export default ResizeTool;
