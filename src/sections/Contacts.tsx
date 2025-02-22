'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface SubmitStatus {
  type: 'success' | 'error' | null;
  message: string;
}

const ContactForm: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(() => setSubmitStatus({ type: null, message: '' }), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbznwH88CIPUvBpH8g03M9UL54WGlK64RWcT4K7NKJbLyMGR1IXKdTA_UQJa7qxliWG5Hg/exec',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            yourName: formData.name,
            yourEmail: formData.email,
            yourMessage: formData.message,
          }),
          mode: 'no-cors',
        }
      );

      setSubmitStatus({ type: 'success', message: "Thank you for your message! We'll get back to you soon." });
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to submit form. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="container mx-auto p-6" id="contacts">
      <div className="bg-black/65 border border-cyan-500 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">Send Us a Message</h2>

        {submitStatus.type && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-md ${submitStatus.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
          >
            {submitStatus.message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              id="name"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-900/50 text-green-500 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                  message: 'Invalid email address',
                },
              })}
              type="email"
              id="email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-900/50 text-green-500 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Your Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              id="message"
              rows={4}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-900/50 text-green-500 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Your Message"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Send Message'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;