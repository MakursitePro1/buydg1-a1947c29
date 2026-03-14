import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Tools", href: "/tools" },
  { label: "Resize", href: "/tool/resize" },
  { label: "Filters", href: "/tool/filters" },
  { label: "Compress", href: "/tool/compress" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl rounded-2xl border border-border/40 bg-background/50 backdrop-blur-2xl shadow-2xl"
      >
        {/* Top gradient accent */}
        <div className="h-[1px] w-full rounded-t-2xl bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <AnimatedLogo />

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/tools"
              className="ml-2 inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{ boxShadow: "0 4px 20px hsl(28 100% 55% / 0.25)" }}
            >
              <Sparkles className="h-3 w-3" /> Explore
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-2 rounded-lg hover:bg-secondary transition-colors">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-border/30 md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;
