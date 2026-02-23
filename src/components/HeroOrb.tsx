import { motion } from "framer-motion";
import {
  Scaling, Crop, Palette, RotateCw, FileDown, FileType,
  Eraser, Type, ImagePlus, Layers, SunMedium, Droplets,
  PaintBucket, Wand2, Focus, Contrast, Grid3X3, Blend,
} from "lucide-react";

const orbitIcons = [
  { icon: Scaling, color: "#e67e22", delay: 0 },
  { icon: Crop, color: "#3498db", delay: 1 },
  { icon: Palette, color: "#9b59b6", delay: 2 },
  { icon: RotateCw, color: "#2ecc71", delay: 3 },
  { icon: FileDown, color: "#e74c3c", delay: 4 },
  { icon: Wand2, color: "#f39c12", delay: 5 },
];

const HeroOrb = () => (
  <div className="relative hidden lg:flex items-center justify-center w-[320px] h-[320px]">
    {/* Central glow */}
    <motion.div
      className="absolute w-32 h-32 rounded-full"
      style={{ background: "radial-gradient(circle, hsl(28 100% 55% / 0.3), transparent)" }}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />

    {/* Center icon */}
    <motion.div
      className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg"
      style={{ boxShadow: "0 0 40px hsl(28 100% 55% / 0.4)" }}
      animate={{ rotate: [0, 5, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
    >
      <Wand2 className="h-9 w-9 text-primary-foreground" />
    </motion.div>

    {/* Orbiting icons */}
    {orbitIcons.map(({ icon: Icon, color, delay }, i) => {
      const angle = (i * 360) / orbitIcons.length;
      const radius = 130;
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;

      return (
        <motion.div
          key={i}
          className="absolute flex h-11 w-11 items-center justify-center rounded-xl glass-card"
          style={{ left: `calc(50% + ${x}px - 22px)`, top: `calc(50% + ${y}px - 22px)` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + delay * 0.1, duration: 0.5, type: "spring" }}
          whileHover={{ scale: 1.2 }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </motion.div>
      );
    })}

    {/* Animated rings */}
    <motion.div
      className="absolute inset-4 rounded-full border border-muted/30"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute inset-[-20px] rounded-full border border-muted/15"
      animate={{ rotate: -360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default HeroOrb;
