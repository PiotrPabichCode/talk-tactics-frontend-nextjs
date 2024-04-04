'use client';
import Feature from './_components/feature';
import Hero from './_components/hero';
import useUserStore from '@/store/useUserStore';
import { Spinner } from '@/components/ui/spinner';

export default function LandingPage() {
  const loading = useUserStore().loading;

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Hero />
      <Feature />
    </main>
  );
}
