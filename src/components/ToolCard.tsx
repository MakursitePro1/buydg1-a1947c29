import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  index: number;
}

const ToolCard = ({ title, description, icon: Icon, href, gradient, index }: ToolCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    viewport={{ once: true }}
  >
    <Link to={href} className="glass-card group block rounded-2xl p-6 relative overflow-hidden">
      {/* Gradient glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(300px circle at 50% 0%, ${gradient}15, transparent)` }}
      />
      <div className="relative">
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl tool-icon-wrap"
          style={{ background: `linear-gradient(135deg, ${gradient}20, ${gradient}08)` }}
        >
          <Icon className="h-6 w-6" style={{ color: gradient }} />
        </div>
        <h3 className="mb-1.5 font-display text-lg font-semibold text-foreground group-hover:gradient-text transition-all">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
        <div className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-8px] group-hover:translate-x-0">
          Open Tool <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  </motion.div>
);

export default ToolCard;
