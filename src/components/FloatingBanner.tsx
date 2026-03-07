import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingBanner = () => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="container mx-auto px-4 py-10"
  >
    <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center"
      style={{ background: "linear-gradient(135deg, hsl(28 100% 55% / 0.15), hsl(260 80% 65% / 0.1), hsl(340 80% 55% / 0.08))" }}
    >
      {/* Animated orbs */}
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-block mb-4"
        >
          <Sparkles className="h-10 w-10 text-primary" />
        </motion.div>
        <h2 className="mb-3 font-display text-2xl sm:text-3xl font-bold text-foreground">
          আজই শুরু করুন — <span className="gradient-text">সম্পূর্ণ ফ্রি!</span>
        </h2>
        <p className="mb-6 text-muted-foreground max-w-md mx-auto">
          কোনো সাইন আপ নেই, কোনো লিমিট নেই। আপনার ছবি কখনো আপলোড হয় না — সম্পূর্ণ প্রাইভেট।
        </p>
        <Link
          to="/tool/resize"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
          style={{ boxShadow: "0 8px 32px hsl(28 100% 55% / 0.3)" }}
        >
          এখনই শুরু করুন <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </motion.section>
);

export default FloatingBanner;
