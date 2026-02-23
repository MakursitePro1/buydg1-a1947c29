import { Link } from "react-router-dom";
import { Image, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
            <Image className="h-5 w-5 text-accent-foreground" />
          </div>
          PixelForge
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            All Tools
          </Link>
          <Link to="/tool/resize" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Resize
          </Link>
          <Link to="/tool/filters" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Filters
          </Link>
          <Link to="/tool/crop" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Crop
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">All Tools</Link>
            <Link to="/tool/resize" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">Resize</Link>
            <Link to="/tool/filters" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">Filters</Link>
            <Link to="/tool/crop" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground">Crop</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
