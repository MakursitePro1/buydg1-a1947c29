import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain, Sparkles, Wand2, Palette, Type, ImagePlus,
  Focus, Contrast, SunMedium, PaintBucket, Blend, Layers,
  Zap, ArrowRight,
} from "lucide-react";

const aiTools = [
  {
    title: "AI Image Enhance",
    desc: "AI দিয়ে ছবির কোয়ালিটি বাড়ান — ঝাপসা ছবিও শার্প করুন",
    icon: Sparkles,
    color: "28 100% 55%",
    href: "/tool/sharpen",
    tag: "Popular",
  },
  {
    title: "AI Color Correction",
    desc: "স্মার্ট কালার কারেকশন — একটি ক্লিকেই পারফেক্ট কালার",
    icon: Palette,
    color: "340 80% 55%",
    href: "/tool/brightness",
    tag: "New",
  },
  {
    title: "AI Background Edit",
    desc: "ব্যাকগ্রাউন্ড পরিবর্তন বা রিমুভ করুন সহজেই",
    icon: ImagePlus,
    color: "160 70% 45%",
    href: "/tool/crop",
    tag: null,
  },
  {
    title: "AI Smart Resize",
    desc: "কন্টেন্ট-অ্যাওয়্যার রিসাইজ — ছবির গুরুত্বপূর্ণ অংশ অক্ষত রাখে",
    icon: Wand2,
    color: "220 80% 60%",
    href: "/tool/resize",
    tag: null,
  },
  {
    title: "AI Filters",
    desc: "প্রফেশনাল ফিল্টার প্রেসেট — মুহূর্তেই ছবি ট্রান্সফর্ম করুন",
    icon: Layers,
    color: "260 80% 65%",
    href: "/tool/filters",
    tag: "Hot",
  },
  {
    title: "AI Text Overlay",
    desc: "স্মার্ট টেক্সট প্লেসমেন্ট — ছবির উপর সুন্দর টেক্সট যোগ করুন",
    icon: Type,
    color: "330 80% 55%",
    href: "/tool/text",
    tag: null,
  },
  {
    title: "AI Blur Effect",
    desc: "প্রফেশনাল ব্লার ইফেক্ট — DSLR স্টাইল ডেপথ অব ফিল্ড",
    icon: Focus,
    color: "190 80% 50%",
    href: "/tool/blur",
    tag: null,
  },
  {
    title: "AI Color Picker",
    desc: "যেকোনো ছবি থেকে কালার প্যালেট এক্সট্র্যাক্ট করুন",
    icon: PaintBucket,
    color: "80 60% 50%",
    href: "/tool/colorpicker",
    tag: null,
  },
];

const AIToolsSection = () => (
  <section id="ai-tools" className="py-20 relative overflow-hidden">
    {/* Ambient background glows */}
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

    <div className="container mx-auto px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <motion.span
          className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
          animate={{ boxShadow: ["0 0 0px hsl(260 80% 65% / 0)", "0 0 20px hsl(260 80% 65% / 0.3)", "0 0 0px hsl(260 80% 65% / 0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Brain className="h-3.5 w-3.5" /> AI-Powered Tools
        </motion.span>
        <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          AI দিয়ে <span className="gradient-text">ফটো এডিটিং</span>
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground leading-relaxed">
          আমাদের AI টুলস দিয়ে আপনার ছবি এডিট করুন — সবকিছু ব্রাউজারেই, কোনো সফটওয়্যার লাগবে না।
        </p>
      </motion.div>

      {/* Tools Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {aiTools.map((tool, i) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link
              to={tool.href}
              className="glass-card group block rounded-2xl p-5 relative overflow-hidden h-full"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(300px circle at 50% 0%, hsl(${tool.color} / 0.12), transparent)` }}
              />

              <div className="relative">
                {/* Tag */}
                {tool.tag && (
                  <span className="absolute -top-1 -right-1 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {tool.tag}
                  </span>
                )}

                {/* Icon */}
                <motion.div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `hsl(${tool.color} / 0.1)`, color: `hsl(${tool.color})` }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <tool.icon className="h-6 w-6" />
                </motion.div>

                <h3 className="mb-1 font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{tool.desc}</p>

                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Try Now <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 text-center"
      >
        <a
          href="#tools"
          className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-6 py-3 font-display text-sm font-semibold text-primary hover:bg-primary/20 transition-all"
        >
          <Zap className="h-4 w-4" /> সকল টুলস দেখুন
        </a>
      </motion.div>
    </div>
  </section>
);

export default AIToolsSection;
