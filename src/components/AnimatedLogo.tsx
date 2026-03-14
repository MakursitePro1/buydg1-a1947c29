import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/makursite-logo.png";

const AnimatedLogo = ({ size = "default" }: { size?: "default" | "large" }) => {
  const isLarge = size === "large";

  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <motion.div
        className={`relative flex items-center justify-center overflow-hidden ${isLarge ? "h-10 w-10" : "h-8 w-8"}`}
        whileHover={{ scale: 1.1, rotate: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={logo} alt="Makursite Logo" className="h-full w-full object-contain" />
      </motion.div>

      <span className={`font-display font-bold text-foreground ${isLarge ? "text-2xl" : "text-lg sm:text-xl"}`}>
        Makur<span className="gradient-text">site</span>
      </span>
    </Link>
  );
};

export default AnimatedLogo;
