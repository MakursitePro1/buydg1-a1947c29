import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import {
  Scaling, Crop, Palette, RotateCw, FileDown, FileType,
  SunMedium, Focus, Contrast, Type, PaintBucket, Blend,
  Eraser, ImagePlus, Grid3X3, Wand2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";

const allTools = [
  { title: "Resize Image", description: "Change dimensions while preserving quality", icon: Scaling, href: "/tool/resize", gradient: "#e67e22", category: "basic" },
  { title: "Crop Image", description: "Cut your image to the perfect frame", icon: Crop, href: "/tool/crop", gradient: "#3498db", category: "basic" },
  { title: "Photo Filters", description: "Apply stunning filters and color adjustments", icon: Palette, href: "/tool/filters", gradient: "#9b59b6", category: "effects" },
  { title: "Rotate & Flip", description: "Rotate 90° or mirror your images", icon: RotateCw, href: "/tool/rotate", gradient: "#2ecc71", category: "basic" },
  { title: "Compress Image", description: "Reduce file size without visible loss", icon: FileDown, href: "/tool/compress", gradient: "#e74c3c", category: "basic" },
  { title: "Convert Format", description: "Switch between PNG, JPEG, and WebP", icon: FileType, href: "/tool/convert", gradient: "#1abc9c", category: "basic" },
  { title: "Adjust Brightness", description: "Fine-tune brightness, exposure & gamma", icon: SunMedium, href: "/tool/brightness", gradient: "#f1c40f", category: "adjust" },
  { title: "Blur Effect", description: "Add gaussian blur or tilt-shift effects", icon: Focus, href: "/tool/blur", gradient: "#00bcd4", category: "effects" },
  { title: "Sharpen Image", description: "Enhance details and edges for clarity", icon: Contrast, href: "/tool/sharpen", gradient: "#ff5722", category: "adjust" },
  { title: "Add Text", description: "Overlay custom text with fonts and colors", icon: Type, href: "/tool/text", gradient: "#e91e63", category: "creative" },
  { title: "Color Picker", description: "Extract colors from any image pixel", icon: PaintBucket, href: "/tool/colorpicker", gradient: "#8bc34a", category: "creative" },
  { title: "Grayscale", description: "Convert to black and white instantly", icon: Blend, href: "/tool/grayscale", gradient: "#607d8b", category: "effects" },
];

const comingSoon = [
  { title: "Background Remover", description: "AI-powered background removal", icon: Eraser, gradient: "#f39c12", category: "ai" },
  { title: "Watermark", description: "Protect with text or image watermarks", icon: ImagePlus, gradient: "#00bcd4", category: "creative" },
  { title: "Collage Maker", description: "Combine multiple photos beautifully", icon: Grid3X3, gradient: "#9c27b0", category: "creative" },
  { title: "AI Enhance", description: "Auto-enhance with AI upscaling", icon: Wand2, gradient: "#ff9800", category: "ai" },
];

const categories = [
  { id: "all", label: "All Tools" },
  { id: "basic", label: "Basic" },
  { id: "effects", label: "Effects" },
  { id: "adjust", label: "Adjust" },
  { id: "creative", label: "Creative" },
  { id: "ai", label: "AI (Coming)" },
];

const AllToolsPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = useMemo(() => {
    let result = allTools;
    if (activeCategory !== "all" && activeCategory !== "ai") {
      result = result.filter((t) => t.category === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  const filteredComingSoon = useMemo(() => {
    if (activeCategory !== "all" && activeCategory !== "ai") return [];
    if (search) {
      const q = search.toLowerCase();
      return comingSoon.filter(
        (t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
    }
    return comingSoon;
  }, [search, activeCategory]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <section className="hero-section py-12 sm:py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" /> {allTools.length + comingSoon.length} Tools Available
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
          >
            All <span className="gradient-text">Tools</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-muted-foreground max-w-lg mx-auto"
          >
            Professional-grade tools that run entirely in your browser. Search, filter, and start editing instantly.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border/50 bg-card/60 backdrop-blur-xl py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
        <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-accent/5 blur-3xl" />
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 py-12">
        {filteredTools.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
            {filteredTools.map((tool, i) => (
              <ToolCard key={tool.title} {...tool} index={i} />
            ))}
          </div>
        )}

        {filteredTools.length === 0 && filteredComingSoon.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">No tools found for "{search}"</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("all"); }}
              className="mt-4 text-primary hover:underline text-sm"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Coming Soon */}
        {filteredComingSoon.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 text-center"
            >
              <h2 className="mb-2 font-display text-2xl font-bold text-foreground">Coming Soon</h2>
              <p className="text-muted-foreground">AI-powered tools and more on the way.</p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {filteredComingSoon.map((tool, i) => (
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
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default AllToolsPage;
