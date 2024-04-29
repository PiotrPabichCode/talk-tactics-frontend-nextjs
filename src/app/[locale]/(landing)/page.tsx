'use client';
import { Modes } from './_components/modes';
import { Hero } from './_components/hero';
import { Friends } from './_components/friends';

export default function LandingPage() {
  return (
    <main className='md:container my-4 md:mt-0'>
      <div className='mx-5 md:mx-20 2xl:mx-0'>
        <Hero />
        <Modes />
        <Friends />
      </div>
    </main>
  );
}
