import { Link } from "react-router-dom";
import { Image, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "All Tools", href: "/" },
  { label: "Resize", href: "/tool/resize" },
  { label: "Filters", href: "/tool/filters" },
  { label: "Crop", href: "/tool/crop" },
  { label: "Compress", href: "/tool/compress" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="mx-auto max-w-6xl rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl shadow-lg">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground sm:text-xl">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-primary sm:h-9 sm:w-9">
              <Image className="h-4 w-4 text-primary-foreground" />
              <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-primary" />
            </div>
            <span>
              Pixel<span className="gradient-text">Forge</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
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
              className="border-t border-border/50 md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
