import { useCallback, useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const filters = [
  { name: "None", css: "none" },
  { name: "Grayscale", css: "grayscale(100%)" },
  { name: "Sepia", css: "sepia(100%)" },
  { name: "Invert", css: "invert(100%)" },
  { name: "Blur", css: "blur(3px)" },
  { name: "Vintage", css: "sepia(50%) contrast(120%) brightness(90%)" },
];

const FiltersTool = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [activeFilter, setActiveFilter] = useState("none");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const onImageLoad = useCallback((img: HTMLImageElement) => {
    setImage(img);
    drawWithFilter(img, "none", 100, 100, 100);
  }, []);

  const drawWithFilter = (img: HTMLImageElement, filter: string, b: number, c: number, s: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    const adjustments = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
    ctx.filter = filter === "none" ? adjustments : `${filter} ${adjustments}`;
    ctx.drawImage(img, 0, 0);
    ctx.filter = "none";
  };

  const applyFilter = (css: string) => {
    setActiveFilter(css);
    if (image) drawWithFilter(image, css, brightness, contrast, saturation);
  };

  const handleAdjust = (b: number, c: number, s: number) => {
    setBrightness(b);
    setContrast(c);
    setSaturation(s);
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
      {!image ? (
        <ImageUploader onImageLoad={onImageLoad} />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="space-y-5 rounded-xl border bg-card p-5">
            <div>
              <Label className="mb-2 block text-sm font-semibold">Filters</Label>
              <div className="grid grid-cols-2 gap-2">
                {filters.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => applyFilter(f.css)}
                    className={`rounded-lg border px-3 py-2 text-sm transition-colors ${activeFilter === f.css ? "border-accent bg-accent/10 text-accent" : "text-muted-foreground hover:border-accent/50"}`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm">Brightness: {brightness}%</Label>
              <Slider value={[brightness]} min={0} max={200} step={1} onValueChange={([v]) => handleAdjust(v, contrast, saturation)} />
            </div>
            <div>
              <Label className="text-sm">Contrast: {contrast}%</Label>
              <Slider value={[contrast]} min={0} max={200} step={1} onValueChange={([v]) => handleAdjust(brightness, v, saturation)} />
            </div>
            <div>
              <Label className="text-sm">Saturation: {saturation}%</Label>
              <Slider value={[saturation]} min={0} max={200} step={1} onValueChange={([v]) => handleAdjust(brightness, contrast, v)} />
            </div>
            <Button variant="outline" className="w-full" onClick={() => { setImage(null); setActiveFilter("none"); setBrightness(100); setContrast(100); setSaturation(100); }}>
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

export default FiltersTool;
