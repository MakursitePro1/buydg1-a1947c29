import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formats = [
  { value: "image/png", label: "PNG", ext: "png" },
  { value: "image/jpeg", label: "JPEG", ext: "jpg" },
  { value: "image/webp", label: "WebP", ext: "webp" },
];

const ConvertTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [format, setFormat] = useState("image/png");
  const [originalFormat, setOriginalFormat] = useState("");

  const onImageLoad = useCallback((img: HTMLImageElement, file: File) => {
    setImage(img);
    setOriginalFormat(file.type || "unknown");
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d")!.drawImage(img, 0, 0);
  }, []);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ext = formats.find((f) => f.value === format)?.ext || "png";
    const link = document.createElement("a");
    link.download = `converted-image.${ext}`;
    link.href = canvas.toDataURL(format, 0.92);
    link.click();
  };

  return (
    <ToolLayout title="Convert Format" description="Convert your image to PNG, JPEG, or WebP" onDownload={download} showDownload={!!image}>
      {!image ? (
        <ImageUploader onImageLoad={onImageLoad} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-4 rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Original format: <span className="font-medium text-foreground">{originalFormat}</span></p>
            <div>
              <Label>Convert to</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {formats.map((f) => (
                    <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={download} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Convert & Download
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

export default ConvertTool;
