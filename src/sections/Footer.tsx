'use client';

import React from 'react';
import {
  faYoutube,
  faXTwitter,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const navItems = [
  {
    name: 'Features',
    href: '#features',
  },
  {
    name: 'Testimonials',
    href: '#testimonials',
  },
  
];

export const socialLinks = [
  {
    name: 'Youtube',
    icon: faYoutube,
    href: '#',
  },
  {
    name: 'X',
    icon: faXTwitter,
    href: '#',
  },
  {
    name: 'Discord',
    icon: faDiscord,
    href: '#',
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-8">
          <div className="font-extrabold text-2xl">Renaissance</div>
          <nav className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="uppercase text-xs tracking-widest font-bold text-gray-400"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col md:flex-row-reverse md:justify-between items-center gap-8">
          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <div className="size-10 rounded-full bg-gray-900 inline-flex items-center justify-center">
                  <FontAwesomeIcon icon={link.icon} className="size-4 " />
                </div>
              </Link>
            ))}
          </div>

          <div className="flex gap-2 items-center text-gray-500">
            <small>&copy; Mainakverse {new Date().getFullYear()}.</small>
            <small>All rights reserved</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
