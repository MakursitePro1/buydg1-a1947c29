import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  onDownload?: () => void;
  showDownload?: boolean;
}

const ToolLayout = ({ title, description, children, onDownload, showDownload }: ToolLayoutProps) => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to all tools
        </Link>
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{title}</h1>
            <p className="mt-1 text-muted-foreground">{description}</p>
          </div>
          {showDownload && onDownload && (
            <Button onClick={onDownload} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          )}
        </div>
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

export default ToolLayout;
