import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  onDownload?: () => void;
  showDownload?: boolean;
}

const ToolLayout = ({ title, description, children, onDownload, showDownload }: ToolLayoutProps) => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1 grid-bg">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to all tools
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col sm:flex-row items-start justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{title}</h1>
            <p className="mt-1 text-muted-foreground">{description}</p>
          </div>
          {showDownload && onDownload && (
            <Button onClick={onDownload} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          )}
        </motion.div>
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

export default ToolLayout;
