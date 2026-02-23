import { motion } from "framer-motion";
import { ArrowDown, Zap, Shield, Clock } from "lucide-react";

const stats = [
  { icon: Zap, label: "Instant Processing", desc: "No waiting" },
  { icon: Shield, label: "100% Private", desc: "Nothing uploaded" },
  { icon: Clock, label: "Always Free", desc: "No limits" },
];

const StatsBar = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.5 }}
    className="flex flex-wrap items-center justify-center gap-6 mt-10"
  >
    {stats.map(({ icon: Icon, label, desc }) => (
      <div key={label} className="flex items-center gap-3 glass-card rounded-xl px-5 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
    ))}
  </motion.div>
);

export default StatsBar;
