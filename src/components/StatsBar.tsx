import { motion } from "framer-motion";
import { Zap, Shield, Clock } from "lucide-react";

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
    className="flex items-center gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 overflow-x-auto pb-2 scrollbar-none justify-center lg:justify-start"
  >
    {stats.map(({ icon: Icon, label, desc }) => (
      <div key={label} className="flex items-center gap-3 glass-card rounded-xl px-4 py-3 flex-shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="whitespace-nowrap">
          <p className="text-xs sm:text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
    ))}
  </motion.div>
);

export default StatsBar;
