'use client';

import React, { useState } from 'react';
import AshwinSantiago from '@/assets/images/ashwin-santiago.jpg';
import AlecWhitten from '@/assets/images/alec-whitten.jpg';
import ReneWells from '@/assets/images/rene-wells.jpg';
import MollieHall from '@/assets/images/mollie-hall.jpg';
import { SectionBorder } from '@/components/SectionBorder';
import { SectionContent } from '@/components/SectionContent';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

export const testimonials = [
  {
    quote:
      "Renaissance has helped me redevelop my business and increase the sales. The great professional of Renaissance is commendable. I am very satisfied with the service of Renaissance and hence recommend it.",
    name: 'Abhiessekh Chaturvedi',
    title: 'CEO @ Humaxmindz Enricherz',
    image: AshwinSantiago,
  },
  {
    quote:
      "Our business was revamped and sales sky-rocketed. The maintenance charges went down strikingly. All thanks to Renaissance. We got a permanant solution to a long-term existing problem which got solved. Highly Recommended!",
    name: 'Shyam Sundar Aggarwal',
    title: 'Founder @ Taschekart',
    image: AlecWhitten,
  },
  {
    quote:
      "My real estate business flow became much streamlined and client handling became super easy. Thanks a ton to Renaissance and its founder Mainak. I am amazed by the depth of cutting edge tools used. Best wishes.",
    name: 'Arvind Kadam',
    title: 'Founder @ VaultProp',
    image: ReneWells,
  },
  {
    quote:
      "I've never seen such a great platform. It's intuitive, responsive, and has helped us streamline projects that would normally take days. The AI capabilities are unmatched in terms of accuracy and speed.",
    name: 'Ksenia Anske',
    title: 'Content Marketing Writer',
    image: MollieHall,
  },
];

export const Testimonials = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  return (
    <section id="testimonials">
      <div className="container">
        <SectionBorder borderTop>
          <SectionContent>
            <LayoutGroup>
              <motion.div
                layout
                className="border-2 border-gradient rounded-3xl  relative md:mx-10 lg:mx-20"
              >
                <div className="bg-gray-950 px-6 md:px-10 lg:p-16 py-16 lg:py-24 rounded-3xl flex flex-col md:flex-row items-center md:items-start gap-6">
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    className="absolute size-20 text-violet-400 top-0 left-6 md:left-10 lg:left-16 -translate-y-1/2"
                  />

                  <AnimatePresence mode="wait" initial={false}>
                    {testimonials.map((testimonial, index) =>
                      testimonialIndex === index ? (
                        <motion.blockquote
                          key={testimonial.name}
                          initial={{ opacity: 0, y: 25 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 25 }}
                          transition={{ duration: 0.5 }}
                          layout
                          className="flex flex-col lg:flex-row gap-12"
                        >
                          <p className="text-xl font-medium md:text-2xl">
                            {testimonial.quote}
                          </p>
                          <cite className="not-italic lg:text-right">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="rounded-xl size-28 max-w-none"
                            />
                            <div className="font-bold mt-4">
                              {testimonial.name}
                            </div>
                            <div className="text-xs text-gray-400 mt-2">
                              {testimonial.title}
                            </div>
                          </cite>
                        </motion.blockquote>
                      ) : null
                    )}
                  </AnimatePresence>

                  <motion.div
                    layout="position"
                    className="flex gap-2 md:flex-col"
                  >
                    {testimonials.map((testimonial, index) => (
                      <div
                        key={testimonial.name}
                        className="size-6 relative isolate inline-flex items-center justify-center hover:cursor-pointer"
                        onClick={() => setTestimonialIndex(index)}
                      >
                        {testimonialIndex === index && (
                          <motion.div
                            className="absolute border-2 border-gradient size-full rounded-full -z-10"
                            layoutId="testimonial-dot"
                          >
                            <div className="bg-gray-950 size-full rounded-full"></div>
                          </motion.div>
                        )}
                        <div className="size-1.5 bg-gray-200 rounded-full"></div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </LayoutGroup>
          </SectionContent>
        </SectionBorder>
      </div>
    </section>
  );
};

export default Testimonials;
