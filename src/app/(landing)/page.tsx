'use client';
import { Feature } from './_components/feature';
import { Hero } from './_components/hero';

export default function LandingPage() {
  return (
    <main className='container my-4 md:mt-0'>
      <div className='mx-20 2xl:mx-0'>
        <Hero />
        <Feature />
      </div>
    </main>
  );
}
