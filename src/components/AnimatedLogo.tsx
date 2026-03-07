import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AnimatedLogo = ({ size = "default" }: { size?: "default" | "large" }) => {
  const isLarge = size === "large";

  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      {/* Animated icon mark */}
      <motion.div
        className={`relative flex items-center justify-center rounded-2xl bg-primary overflow-hidden ${isLarge ? "h-12 w-12" : "h-9 w-9"}`}
        whileHover={{ scale: 1.1, rotate: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
          animate={{ x: ["-200%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
        {/* B letter */}
        <span className={`font-display font-bold text-primary-foreground relative z-10 ${isLarge ? "text-2xl" : "text-lg"}`}>
          B
        </span>
        {/* Glow dot */}
        <motion.div
          className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-accent"
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Text */}
      <span className={`font-display font-bold text-foreground ${isLarge ? "text-2xl" : "text-lg sm:text-xl"}`}>
        Bangla<span className="gradient-text">feel</span>
      </span>
    </Link>
  );
};

export default AnimatedLogo;
