import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolCard from "@/components/ToolCard";
import HeroOrb from "@/components/HeroOrb";
import StatsBar from "@/components/StatsBar";
import AIToolsCarousel from "@/components/AIToolsCarousel";
import AIToolsSection from "@/components/AIToolsSection";
import ParticleField from "@/components/ParticleField";
import GlowingTestimonials from "@/components/GlowingTestimonials";
import CounterSection from "@/components/CounterSection";
import FloatingBanner from "@/components/FloatingBanner";
import TrustedBySection from "@/components/TrustedBySection";
import FAQSection from "@/components/FAQSection";
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
      <section className="hero-section relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-28">
        <ParticleField />
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left gap-8 lg:gap-12">
            <div className="max-w-2xl w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-primary"
              >
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> 12+ Free Tools — No Sign Up
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mb-4 sm:mb-5 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground"
              >
                Edit Photos{" "}
                <span className="gradient-text">Instantly</span>
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                Right in Your Browser
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-6 sm:mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                Resize, crop, compress, add filters, and much more — all for free.
                Your images never leave your device. Zero uploads. Total privacy.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-3"
              >
                <a
                  href="#tools"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 sm:px-6 py-2.5 sm:py-3 font-display text-xs sm:text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap"
                  style={{ boxShadow: "0 8px 32px hsl(28 100% 55% / 0.3)" }}
                >
                  Explore Tools
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 sm:px-6 py-2.5 sm:py-3 font-display text-xs sm:text-sm font-semibold text-foreground hover:bg-secondary transition-all whitespace-nowrap"
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
        <div className="absolute top-20 right-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-36 sm:w-56 lg:w-72 h-36 sm:h-56 lg:h-72 rounded-full bg-accent/5 blur-3xl" />
      </section>

      {/* AI Tools Carousel */}
      <AIToolsCarousel />

      {/* Dedicated AI Tools Section */}
      <AIToolsSection />

      {/* Trusted By / Metrics */}
      <TrustedBySection />

      {/* Animated Counters */}
      <CounterSection />

      {/* Tools Grid */}
      <section id="tools" className="container mx-auto px-4 py-20">
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

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Simple & Fast
          </span>
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Three simple steps to edit your photos — no sign up, no uploads, no hassle.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { step: "1", title: "Upload Image", desc: "Drag & drop or click to upload any image from your device. Supports PNG, JPG, WebP, GIF, and BMP." },
            { step: "2", title: "Edit & Adjust", desc: "Choose a tool, tweak the settings, and see changes in real-time. Use undo/redo anytime." },
            { step: "3", title: "Download Result", desc: "Download your edited image instantly. No watermarks, no limits, completely free." },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 font-display text-2xl font-bold text-primary">
                {item.step}
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <GlowingTestimonials />

      {/* CTA Banner */}
      <FloatingBanner />

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

      {/* FAQ */}
      <FAQSection />

      <Footer />
    </div>
  );
};

export default Index;
