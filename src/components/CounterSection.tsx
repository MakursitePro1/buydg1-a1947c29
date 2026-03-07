import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, Image, Cpu, Smile } from "lucide-react";

const counters = [
  { icon: Users, value: 50000, suffix: "+", label: "Active Users" },
  { icon: Image, value: 2000000, suffix: "+", label: "Photos Edited" },
  { icon: Cpu, value: 16, suffix: "+", label: "AI Tools" },
  { icon: Smile, value: 99, suffix: "%", label: "Satisfaction" },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); } },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, value]);

  const format = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(0) + "K";
    return n.toString();
  };

  return (
    <div ref={ref} className="font-display text-3xl sm:text-4xl font-bold text-foreground">
      {format(display)}{suffix}
    </div>
  );
};

const CounterSection = () => (
  <section className="py-20 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {counters.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 text-center"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <c.icon className="h-6 w-6 text-primary" />
            </div>
            <AnimatedCounter value={c.value} suffix={c.suffix} />
            <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CounterSection;
