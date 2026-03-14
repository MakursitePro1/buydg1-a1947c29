import { Github, Twitter, Heart, ExternalLink, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";

const footerTools = [
  { name: "Resize", href: "/tool/resize" },
  { name: "Crop", href: "/tool/crop" },
  { name: "Filters", href: "/tool/filters" },
  { name: "Compress", href: "/tool/compress" },
  { name: "Convert", href: "/tool/convert" },
  { name: "Rotate", href: "/tool/rotate" },
];

const footerLinks = [
  { name: "All Tools", href: "/tools" },
  { name: "FAQ", href: "/#faq" },
];

const Footer = () => (
  <footer className="px-3 pb-4 pt-8 sm:px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto max-w-6xl rounded-3xl border border-border/40 bg-card/40 backdrop-blur-2xl shadow-2xl overflow-hidden"
    >
      {/* Top gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="py-10 px-6 sm:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <AnimatedLogo />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Free online photo editing & AI tools. All processing happens locally — your images never leave your device.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Mail, href: "mailto:hello@makursite.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/80 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="h-1 w-4 rounded-full bg-primary" />
              Popular Tools
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerTools.map((t) => (
                <Link
                  key={t.name}
                  to={t.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                >
                  {t.name}
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="h-1 w-4 rounded-full bg-accent" />
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="h-1 w-4 rounded-full bg-primary/60" />
              Privacy First
            </h4>
            <div className="glass-card rounded-xl p-4" style={{ transform: "none" }}>
              <p className="text-sm text-muted-foreground leading-relaxed">
                🔒 Zero uploads. 100% client-side. Your photos stay on your device.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30 px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          © 2026 Makursite. Built with <Heart className="h-3 w-3 text-destructive fill-destructive" /> for creators everywhere.
        </p>
        <p className="text-xs text-muted-foreground">
          All processing is done in your browser.
        </p>
      </div>
    </motion.div>
  </footer>
);

export default Footer;
