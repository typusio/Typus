import React from 'react';
import { NavBar } from './NavBar';
import { Hero } from './Hero';
import { Features } from './Features';
import { Notifications } from './Notifications';
import { CTA } from './CTA';
import { Footer } from './Footer';

export const HomePage = () => {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <svg className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8" width="640" height="784" fill="none" viewBox="0 0 640 784">
          <defs>
            <pattern id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect y="72" width="640" height="640" className="text-gray-50" fill="currentColor" />
          <rect x="118" width="404" height="784" fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
        </svg>

        <NavBar />
        <Hero />
        <Features />
        <Notifications />
        <CTA />
        <Footer />
      </div>
    </div>
  );
};
