import { Image, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-card/50 py-12">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground mb-3">
            <Image className="h-5 w-5 text-primary" />
            Pixel<span className="gradient-text">Forge</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Free online photo editing tools. All processing happens locally — your images never leave your device.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-3">Tools</h4>
          <div className="grid grid-cols-2 gap-1.5">
            {["Resize", "Crop", "Filters", "Rotate", "Compress", "Convert"].map((t) => (
              <Link key={t} to={`/tool/${t.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-foreground mb-3">Privacy First</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            🔒 Zero uploads. 100% client-side. Your photos stay on your device.
          </p>
          <div className="flex gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <Github className="h-4 w-4" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <Twitter className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        © 2026 PixelForge. Built with ❤️ for creators everywhere.
      </div>
    </div>
  </footer>
);

export default Footer;
