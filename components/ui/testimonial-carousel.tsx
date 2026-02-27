"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

type TestimonialCarouselProps = {
  items: Testimonial[];
};

export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [items.length]);

  const goTo = (nextIndex: number) =>
    setIndex((nextIndex + items.length) % items.length);

  return (
    <div className="relative mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-[#0f2b46]/5 sm:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
          <Quote className="h-4 w-4" />
          Témoignages clients
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-[#0F2B46] hover:text-[#0F2B46]"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-[#0F2B46] hover:text-[#0F2B46]"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={`${items[index].author}-${index}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
              “{items[index].quote}”
            </p>
            <footer>
              <p className="text-base font-semibold text-[#0F2B46]">
                {items[index].author}
              </p>
              <p className="text-sm text-slate-500">{items[index].role}</p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {items.map((item, dotIndex) => (
          <button
            key={`${item.author}-${dotIndex}`}
            type="button"
            onClick={() => goTo(dotIndex)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              dotIndex === index ? "bg-emerald-500" : "bg-slate-300"
            }`}
            aria-label={`Aller au témoignage ${dotIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
