import { motion } from "framer-motion";
import { Users, Globe, ImageIcon, Download } from "lucide-react";

const metrics = [
  { icon: Users, value: "50,000+", label: "সক্রিয় ব্যবহারকারী" },
  { icon: ImageIcon, value: "2M+", label: "ছবি এডিট হয়েছে" },
  { icon: Globe, value: "120+", label: "দেশ থেকে ব্যবহৃত" },
  { icon: Download, value: "500K+", label: "ডাউনলোড সম্পন্ন" },
];

const TrustedBySection = () => (
  <section className="py-16 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-card rounded-3xl p-8 sm:p-10"
        style={{ transform: "none" }}
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <m.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">{m.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default TrustedBySection;
