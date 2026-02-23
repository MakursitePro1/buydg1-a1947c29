import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const CompressTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const onImageLoad = useCallback((img: HTMLImageElement, file: File) => {
    setImage(img);
    setOriginalSize(file.size);
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d")!.drawImage(img, 0, 0);
    estimateSize(canvas, 80);
  }, []);

  const estimateSize = (canvas: HTMLCanvasElement, q: number) => {
    const dataUrl = canvas.toDataURL("image/jpeg", q / 100);
    const bytes = Math.round((dataUrl.length - "data:image/jpeg;base64,".length) * 0.75);
    setCompressedSize(bytes);
  };

  const handleQualityChange = (q: number) => {
    setQuality(q);
    const canvas = canvasRef.current;
    if (canvas && image) {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext("2d")!.drawImage(image, 0, 0);
      estimateSize(canvas, q);
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `compressed-q${quality}.jpg`;
    link.href = canvas.toDataURL("image/jpeg", quality / 100);
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <ToolLayout title="Compress Image" description="Reduce file size while maintaining quality" onDownload={download} showDownload={!!image}>
      {!image ? (
        <ImageUploader onImageLoad={onImageLoad} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4 rounded-xl border bg-card p-5">
            <div>
              <Label className="text-sm">Quality: {quality}%</Label>
              <Slider value={[quality]} min={1} max={100} step={1} onValueChange={([v]) => handleQualityChange(v)} />
            </div>
            <div className="space-y-1 rounded-lg bg-secondary p-3">
              <p className="text-sm text-muted-foreground">Original: <span className="font-medium text-foreground">{formatSize(originalSize)}</span></p>
              <p className="text-sm text-muted-foreground">Compressed: <span className="font-medium text-accent">{formatSize(compressedSize)}</span></p>
              <p className="text-sm text-muted-foreground">Saved: <span className="font-medium text-accent">{originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0}%</span></p>
            </div>
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

export default CompressTool;
