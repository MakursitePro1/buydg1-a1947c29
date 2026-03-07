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
    className="mt-8 sm:mt-10"
  >
    {/* Row 1: Two cards side by side */}
    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
      {stats.slice(0, 2).map(({ icon: Icon, label, desc }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
          className="flex items-center gap-2.5 sm:gap-3 glass-card rounded-xl px-3 sm:px-4 py-2.5 sm:py-3"
        >
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-foreground truncate">{label}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">{desc}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Row 2: One card centered */}
    <div className="flex justify-center lg:justify-start">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex items-center gap-2.5 sm:gap-3 glass-card rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 w-full sm:w-auto sm:min-w-[200px]"
      >
        <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
          <stats[2].icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-foreground">{stats[2].label}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">{stats[2].desc}</p>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default StatsBar;
