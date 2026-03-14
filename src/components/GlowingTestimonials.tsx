import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "রাফি আহমেদ", role: "গ্রাফিক ডিজাইনার", text: "Makursite আমার ডেইলি ওয়ার্কফ্লো সম্পূর্ণ বদলে দিয়েছে। এত সহজ এবং দ্রুত টুলস আর কোথাও পাইনি!", stars: 5 },
  { name: "তানিয়া ইসলাম", role: "কন্টেন্ট ক্রিয়েটর", text: "সব কিছু ব্রাউজারেই হয়ে যায়, কোন সফটওয়্যার ইনস্টল লাগে না। ফটো এডিটিং এত সহজ হতে পারে ভাবিনি!", stars: 5 },
  { name: "সাকিব হাসান", role: "ফটোগ্রাফার", text: "AI টুলস গুলো অসাধারণ কাজ করে। এক ক্লিকেই ছবি প্রফেশনাল লেভেলের হয়ে যায়!", stars: 5 },
  { name: "নাদিয়া করিম", role: "ইউটিউবার", text: "থাম্বনেইল বানানো থেকে শুরু করে ফটো এডিট — সবকিছুই করি Makursite দিয়ে। অসাধারণ!", stars: 5 },
  { name: "ইমরান হোসেন", role: "ওয়েব ডেভেলপার", text: "ওয়েবসাইটের জন্য ইমেজ অপটিমাইজ করতে এর চেয়ে ভালো টুল নেই। কম্প্রেশন কোয়ালিটি চমৎকার!", stars: 5 },
  { name: "ফারহানা আক্তার", role: "স্টুডেন্ট", text: "প্রেজেন্টেশনের জন্য ইমেজ এডিট করতে হয়। ফ্রি এবং সহজ হওয়ায় সবার কাছে রেকমেন্ড করি!", stars: 5 },
];

const GlowingTestimonials = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          ❤️ ব্যবহারকারীদের মতামত
        </span>
        <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
          সবাই <span className="gradient-text">ভালোবাসে</span> Makursite
        </h2>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 relative group"
          >
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.stars }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
            <div>
              <p className="font-display text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default GlowingTestimonials;
