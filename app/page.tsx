import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import WhyChoose from '@/components/WhyChoose';
import HowItWorks from '@/components/HowItWorks';
import Roadmap from '@/components/Roadmap';
import Footer from '@/components/Footer';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  return (
    <div id="inicio" className="bg-slate-50 text-slate-800 min-h-screen font-sans relative overflow-hidden selection:bg-cyan-500/20 selection:text-cyan-800">
      {/* Fondo decorativo global */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-100 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-100 rounded-full blur-[100px] opacity-40"></div>

      {/* La Navbar se queda fija normalmente */}
      <Navbar />
      
      {/* El Hero aparece de primero */}
      <FadeIn>
        <Hero />
      </FadeIn>

      {/* Las demás secciones se animan suavemente al hacer scroll */}
      <FadeIn>
        <Features />
      </FadeIn>

      <FadeIn>
        <UseCases />
      </FadeIn>

      <FadeIn>
        <WhyChoose />
      </FadeIn>

      <FadeIn>
        <HowItWorks />
      </FadeIn>

      <FadeIn>
        <Roadmap />
      </FadeIn>

      <Footer />
    </div>
  );
}