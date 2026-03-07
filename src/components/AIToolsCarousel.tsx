import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, Sparkles, Wand2, MessageSquare, Globe, FileSearch,
  Palette, Type, ImagePlus, AudioLines, Video, Bot,
} from "lucide-react";

const aiCategories = [
  { title: "AI Image Enhance", desc: "Upscale & enhance photos with AI", icon: Sparkles, color: "#f59e0b", href: "/tool/filters" },
  { title: "AI Text Generator", desc: "Generate creative content instantly", icon: Type, color: "#8b5cf6", href: "/tool/text" },
  { title: "Smart Color", desc: "AI-powered color correction", icon: Palette, color: "#ec4899", href: "/tool/brightness" },
  { title: "AI Background", desc: "Remove & replace backgrounds", icon: ImagePlus, color: "#10b981", href: "/tool/crop" },
  { title: "Smart Resize", desc: "Content-aware intelligent resize", icon: Wand2, color: "#3b82f6", href: "/tool/resize" },
  { title: "AI Sharpen", desc: "Intelligent detail enhancement", icon: Brain, color: "#ef4444", href: "/tool/sharpen" },
  { title: "AI Chat", desc: "Ask anything about your images", icon: MessageSquare, color: "#06b6d4", href: "/tool/filters" },
  { title: "Translation", desc: "Translate text in images", icon: Globe, color: "#f97316", href: "/tool/text" },
  { title: "AI Analyze", desc: "Extract data from photos", icon: FileSearch, color: "#84cc16", href: "/tool/colorpicker" },
  { title: "Audio AI", desc: "AI audio processing tools", icon: AudioLines, color: "#a855f7", href: "/tool/filters" },
  { title: "Video AI", desc: "Smart video editing tools", icon: Video, color: "#14b8a6", href: "/tool/filters" },
  { title: "AI Assistant", desc: "Your smart editing companion", icon: Bot, color: "#e11d48", href: "/tool/filters" },
];

// Duplicate for seamless infinite loop
const duplicated = [...aiCategories, ...aiCategories];

const AIToolsCarousel = () => (
  <section className="py-20 overflow-hidden">
    <div className="container mx-auto px-4 mb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          <Brain className="h-3.5 w-3.5" /> AI-Powered Tools
        </span>
        <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
          Explore <span className="gradient-text">AI Tools</span>
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground">
          Next-generation AI tools to supercharge your creative workflow.
        </p>
      </motion.div>
    </div>

    {/* Infinite scrolling carousel */}
    <div className="relative">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-5 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ x: { duration: 40, repeat: Infinity, ease: "linear" } }}
      >
        {duplicated.map((cat, i) => (
          <Link
            key={`${cat.title}-${i}`}
            to={cat.href}
            className="glass-card group flex-shrink-0 w-[220px] sm:w-[260px] rounded-2xl p-5 relative overflow-hidden cursor-pointer"
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(200px circle at 50% 0%, ${cat.color}20, transparent)` }}
            />
            <div className="relative">
              <motion.div
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `${cat.color}15`, color: cat.color }}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <cat.icon className="h-6 w-6" />
              </motion.div>
              <h3 className="mb-1 font-display text-sm font-semibold text-foreground">{cat.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  </section>
);

export default AIToolsCarousel;
