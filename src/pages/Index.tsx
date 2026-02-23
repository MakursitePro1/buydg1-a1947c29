import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import HeroOrb from "@/components/HeroOrb";
import StatsBar from "@/components/StatsBar";
import { motion } from "framer-motion";
import {
  Scaling, Crop, Palette, RotateCw, FileDown, FileType,
  Eraser, Type, ImagePlus, Layers, SunMedium, Focus,
  Contrast, Blend, PaintBucket, Sparkles, Grid3X3, Wand2,
} from "lucide-react";

const tools = [
  { title: "Resize Image", description: "Change dimensions while preserving quality", icon: Scaling, href: "/tool/resize", gradient: "#e67e22" },
  { title: "Crop Image", description: "Cut your image to the perfect frame", icon: Crop, href: "/tool/crop", gradient: "#3498db" },
  { title: "Photo Filters", description: "Apply stunning filters and color adjustments", icon: Palette, href: "/tool/filters", gradient: "#9b59b6" },
  { title: "Rotate & Flip", description: "Rotate 90° or mirror your images", icon: RotateCw, href: "/tool/rotate", gradient: "#2ecc71" },
  { title: "Compress Image", description: "Reduce file size without visible loss", icon: FileDown, href: "/tool/compress", gradient: "#e74c3c" },
  { title: "Convert Format", description: "Switch between PNG, JPEG, and WebP", icon: FileType, href: "/tool/convert", gradient: "#1abc9c" },
  { title: "Adjust Brightness", description: "Fine-tune brightness, exposure & gamma", icon: SunMedium, href: "/tool/brightness", gradient: "#f1c40f" },
  { title: "Blur Effect", description: "Add gaussian blur or tilt-shift effects", icon: Focus, href: "/tool/blur", gradient: "#00bcd4" },
  { title: "Sharpen Image", description: "Enhance details and edges for clarity", icon: Contrast, href: "/tool/sharpen", gradient: "#ff5722" },
  { title: "Add Text", description: "Overlay custom text with fonts and colors", icon: Type, href: "/tool/text", gradient: "#e91e63" },
  { title: "Color Picker", description: "Extract colors from any image pixel", icon: PaintBucket, href: "/tool/colorpicker", gradient: "#8bc34a" },
  { title: "Grayscale", description: "Convert to black and white instantly", icon: Blend, href: "/tool/grayscale", gradient: "#607d8b" },
];

const comingSoon = [
  { title: "Background Remover", description: "AI-powered background removal", icon: Eraser, gradient: "#f39c12" },
  { title: "Watermark", description: "Protect with text or image watermarks", icon: ImagePlus, gradient: "#00bcd4" },
  { title: "Collage Maker", description: "Combine multiple photos beautifully", icon: Grid3X3, gradient: "#9c27b0" },
  { title: "AI Enhance", description: "Auto-enhance with AI upscaling", icon: Wand2, gradient: "#ff9800" },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="hero-section relative overflow-hidden py-20 md:py-28">
        <div className="container relative mx-auto px-4">
          <div className="flex items-center justify-between gap-12">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              >
                <Sparkles className="h-3.5 w-3.5" /> 12+ Free Tools — No Sign Up Required
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mb-5 font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
              >
                Edit Photos{" "}
                <span className="gradient-text">Instantly</span>
                <br />
                Right in Your Browser
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-8 text-lg text-muted-foreground md:text-xl leading-relaxed"
              >
                Resize, crop, compress, add filters, and much more — all for free.
                Your images never leave your device. Zero uploads. Total privacy.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="#tools"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  style={{ boxShadow: "0 8px 32px hsl(28 100% 55% / 0.3)" }}
                >
                  Explore Tools
                </a>
                <a
                  href="#tools"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-3 font-display text-sm font-semibold text-foreground hover:bg-secondary transition-all"
                >
                  How It Works
                </a>
              </motion.div>

              <StatsBar />
            </div>

            <HeroOrb />
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
      </section>

      {/* Tools Grid */}
      <section id="tools" className="container mx-auto px-4 py-20 grid-bg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            All Tools
          </span>
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Everything You Need to <span className="gradient-text">Edit Photos</span>
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Professional-grade tools that run entirely in your browser. No installation, no limits.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool, i) => (
            <ToolCard key={tool.title} {...tool} index={i} />
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 className="mb-2 font-display text-2xl font-bold text-foreground">Coming Soon</h2>
          <p className="text-muted-foreground">AI-powered tools and more on the way.</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {comingSoon.map((tool, i) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-5 opacity-50 cursor-default"
              style={{ transform: "none" }}
            >
              <div
                className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${tool.gradient}15`, color: tool.gradient }}
              >
                <tool.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1 font-display text-sm font-semibold text-foreground">{tool.title}</h3>
              <p className="text-xs text-muted-foreground">{tool.description}</p>
              <span className="mt-2 inline-block text-xs text-primary font-medium">Coming Soon</span>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
