
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-portfolio-blue/10 via-white to-portfolio-purple/10 dark:from-portfolio-blue/30 dark:via-black/20 dark:to-portfolio-purple/30 pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-animate">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center mb-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <div className="flex items-center p-2 px-4 rounded-full bg-portfolio-blue/10 dark:bg-portfolio-blue/20">
              <Sparkles size={18} className="text-portfolio-blue dark:text-portfolio-purple mr-2 animate-pulse-slow" />
              <span className="text-sm font-medium text-portfolio-blue dark:text-portfolio-purple">Portfolio 2025</span>
            </div>
          </div>
          
          <h1 className="heading-xl text-reveal stagger-1">
            <span className="text-gradient dark:text-gradient-dark">Creative</span> Developer & Designer
          </h1>
          
          <p className="paragraph text-xl text-reveal stagger-2">
            I craft engaging digital experiences that combine stunning design with powerful functionality. 
            Let's build something amazing together.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 text-reveal stagger-3">
            <Button asChild size="lg" className="btn-animated bg-portfolio-blue hover:bg-portfolio-purple transition-colors group relative overflow-hidden">
              <Link to="/projects" className="flex items-center">
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-white/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-animated glow-border border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white dark:border-portfolio-purple dark:text-portfolio-purple dark:hover:bg-portfolio-purple">
              <Link to="/contact" className="flex items-center">
                Contact Me <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Abstract shapes with enhanced animations */}
      <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-portfolio-blue/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-20 -right-10 w-60 h-60 rounded-full bg-portfolio-purple/10 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-2/3 left-1/4 w-20 h-20 rounded-full bg-portfolio-pink/10 blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* New floating elements */}
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-portfolio-blue/5 dark:bg-portfolio-blue/20 blur-lg animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-portfolio-purple/5 dark:bg-portfolio-purple/20 blur-xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-20 hidden md:block">
        <div className="w-8 h-8 border-2 border-portfolio-blue/20 dark:border-portfolio-blue/40 rounded-full animate-spin-slow"></div>
      </div>
      <div className="absolute bottom-40 right-20 hidden md:block">
        <div className="w-12 h-12 border-2 border-portfolio-purple/20 dark:border-portfolio-purple/40 rounded-md rotate-45 animate-float" style={{ animationDelay: '1.2s' }}></div>
      </div>
    </section>
  );
};

export default Hero;
