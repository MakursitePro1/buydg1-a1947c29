import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CropTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(0);
  const [cropH, setCropH] = useState(0);

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img);
    setCropX(0);
    setCropY(0);
    setCropW(img.naturalWidth);
    setCropH(img.naturalHeight);
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d")!.drawImage(img, 0, 0);
  }, []);

  const applyCrop = () => {
    if (!image) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(image, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
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
      {!image ? (
        <ImageUploader onImageLoad={onImageLoad} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4 rounded-xl border bg-card p-5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="cx">X</Label>
                <Input id="cx" type="number" value={cropX} onChange={(e) => setCropX(Number(e.target.value))} />
              </div>
              <div>
                <Label htmlFor="cy">Y</Label>
                <Input id="cy" type="number" value={cropY} onChange={(e) => setCropY(Number(e.target.value))} />
              </div>
              <div>
                <Label htmlFor="cw">Width</Label>
                <Input id="cw" type="number" value={cropW} onChange={(e) => setCropW(Number(e.target.value))} />
              </div>
              <div>
                <Label htmlFor="ch">Height</Label>
                <Input id="ch" type="number" value={cropH} onChange={(e) => setCropH(Number(e.target.value))} />
              </div>
            </div>
            <Button onClick={applyCrop} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Apply Crop
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setImage(null)}>
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

export default CropTool;
