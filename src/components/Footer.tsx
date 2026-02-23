import { Image } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card py-10">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
          <Image className="h-5 w-5 text-accent" />
          PixelForge
        </div>
        <p className="max-w-md text-sm text-muted-foreground">
          Free online photo editing tools. Resize, crop, compress, convert, and apply filters — all in your browser.
        </p>
        <p className="text-xs text-muted-foreground">© 2026 PixelForge. All processing happens locally in your browser.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
