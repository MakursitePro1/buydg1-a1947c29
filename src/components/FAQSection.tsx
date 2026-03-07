import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Is Banglafeel really free to use?",
    a: "Yes, 100% free! There are no hidden charges, no subscriptions, and no limits on how many images you can edit. All tools are available without signing up.",
  },
  {
    q: "Do my images get uploaded to a server?",
    a: "No. All processing happens directly in your browser using JavaScript. Your images never leave your device, ensuring complete privacy and security.",
  },
  {
    q: "What image formats are supported?",
    a: "Banglafeel supports PNG, JPEG, WebP, GIF, and BMP formats. You can also convert between these formats using our Convert tool.",
  },
  {
    q: "Can I use Banglafeel on my phone?",
    a: "Absolutely! Banglafeel is fully responsive and works on all devices — smartphones, tablets, and desktops. No app installation needed.",
  },
  {
    q: "What AI tools are available?",
    a: "We offer AI-powered tools including smart enhancement, color correction, background editing, intelligent resize, AI filters, text overlay, blur effects, and color picker — all running in your browser.",
  },
  {
    q: "Is there an undo/redo feature?",
    a: "Yes! Every editing tool includes undo/redo functionality, so you can freely experiment and go back to any previous state with a single click.",
  },
  {
    q: "Do edited images have watermarks?",
    a: "Never. All images you download from Banglafeel are completely watermark-free. What you edit is exactly what you get.",
  },
];

const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl overflow-hidden"
      style={{ transform: open ? "none" : undefined }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left hover:bg-secondary/30 transition-colors"
      >
        <span className="font-display text-sm sm:text-base font-semibold text-foreground pr-2">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => (
  <section id="faq" className="py-20 relative overflow-hidden">
    {/* Ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <motion.span
          className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          animate={{ boxShadow: ["0 0 0px hsl(28 100% 55% / 0)", "0 0 15px hsl(28 100% 55% / 0.2)", "0 0 0px hsl(28 100% 55% / 0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <HelpCircle className="h-3.5 w-3.5" /> FAQ
        </motion.span>
        <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground">
          Everything you need to know about Banglafeel and how it works.
        </p>
      </motion.div>

      <div className="mx-auto max-w-2xl grid gap-3">
        {faqs.map((faq, i) => (
          <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FAQSection;
