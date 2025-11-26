import Hero from '@/app/components/site/landing/Hero';
import Section1 from '@/app/components/site/landing/Section_1';
import Section2 from '@/app/components/site/landing/Section_2';
import Section3 from '@/app/components/site/landing/Section_3';
import Section4 from '@/app/components/site/landing/Section_4';
import Section5 from '@/app/components/site/landing/Section_5';
import Section6 from '@/app/components/site/landing/Section_6';
import Footer from '@/app/components/site/landing/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mozza',
};

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Section 1 */}
      <Section1 />

      {/* Section 2 */}
      <Section2 />

      {/* Section 3 */}
      <Section3 />

      {/* Section 4 */}
      <Section4 />

      {/* Section 5 */}
      <Section5 />

      {/* Section 6 */}
      <Section6 />

      {/* Footer */}
      <Footer />

    </main>
  )
};