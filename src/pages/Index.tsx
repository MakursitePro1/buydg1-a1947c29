import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import heroImg from "@/assets/hero-bg.jpg";
import {
  Scaling,
  Crop,
  Palette,
  RotateCw,
  FileDown,
  FileType,
  Eraser,
  PenTool,
  ImagePlus,
  Type,
} from "lucide-react";

const tools = [
  { title: "Resize Image", description: "Change width and height of any image instantly", icon: Scaling, href: "/tool/resize", color: "#e67e22" },
  { title: "Crop Image", description: "Crop to a specific area or aspect ratio", icon: Crop, href: "/tool/crop", color: "#3498db" },
  { title: "Photo Filters", description: "Apply filters, adjust brightness, contrast & more", icon: Palette, href: "/tool/filters", color: "#9b59b6" },
  { title: "Rotate & Flip", description: "Rotate by 90° or flip horizontally and vertically", icon: RotateCw, href: "/tool/rotate", color: "#2ecc71" },
  { title: "Compress Image", description: "Reduce file size while keeping quality", icon: FileDown, href: "/tool/compress", color: "#e74c3c" },
  { title: "Convert Format", description: "Convert between PNG, JPEG, and WebP", icon: FileType, href: "/tool/convert", color: "#1abc9c" },
];

const comingSoon = [
  { title: "Background Remover", description: "Remove background from photos with AI", icon: Eraser, href: "#", color: "#f39c12" },
  { title: "Draw & Annotate", description: "Add drawings, arrows, and annotations", icon: PenTool, href: "#", color: "#e91e63" },
  { title: "Watermark", description: "Add text or image watermarks", icon: ImagePlus, href: "#", color: "#00bcd4" },
  { title: "Add Text", description: "Overlay text with custom fonts and colors", icon: Type, href: "#", color: "#ff5722" },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden hero-section py-20 md:py-28">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-soft-light"
        />
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl animate-fade-in">
            Free Online Photo Editor
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/80 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Resize, crop, compress, convert, and apply filters — all directly in your browser. No uploads, no accounts, completely free.
          </p>
          <div className="flex items-center justify-center gap-3 text-sm text-primary-foreground/60 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="rounded-full border border-primary-foreground/20 px-3 py-1">🔒 100% Private</span>
            <span className="rounded-full border border-primary-foreground/20 px-3 py-1">⚡ Instant</span>
            <span className="rounded-full border border-primary-foreground/20 px-3 py-1">🆓 Free</span>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-2 font-display text-2xl font-bold text-foreground">Editing Tools</h2>
        <p className="mb-8 text-muted-foreground">All tools work locally in your browser — your images never leave your device.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="mb-2 font-display text-2xl font-bold text-foreground">Coming Soon</h2>
        <p className="mb-8 text-muted-foreground">More powerful tools are on the way.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {comingSoon.map((tool) => (
            <div key={tool.title} className="rounded-xl border bg-card p-5 opacity-60">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: tool.color + "18", color: tool.color }}>
                <tool.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1 font-display text-sm font-semibold text-foreground">{tool.title}</h3>
              <p className="text-xs text-muted-foreground">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
