import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

const ToolCard = ({ title, description, icon: Icon, href, color }: ToolCardProps) => (
  <Link to={href} className="tool-card group block rounded-xl border bg-card p-6">
    <div
      className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
      style={{ backgroundColor: color + "18", color }}
    >
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="mb-1 font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
      {title}
    </h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Link>
);

export default ToolCard;
