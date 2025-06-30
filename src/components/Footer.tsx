import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Instagram, Mail, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-slate-900 dark:bg-gray-950 text-white overflow-hidden transition-colors duration-300">
      {/* Underwater Background Pattern */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 via-teal-900/20 to-slate-900/90 dark:from-emerald-900/20 dark:via-teal-900/30 dark:to-gray-950/90"></div>
        
        {/* Underwater wave pattern */}
        <svg className="absolute bottom-0 w-full h-32 opacity-20 dark:opacity-30" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
        </svg>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-30 dark:opacity-40">
          <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-1 h-1 bg-teal-300 dark:bg-teal-200 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-48 left-1/3 w-1.5 h-1.5 bg-emerald-300 dark:bg-emerald-200 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-64 right-1/3 w-1 h-1 bg-teal-400 dark:bg-teal-300 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>
      
      <div className="relative z-10 pt-16 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center transform rotate-12">
                  <span className="text-white font-bold text-lg transform -rotate-12">P</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Portfolio
                </h3>
              </div>
              <p className="text-slate-400 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
                A showcase of my professional work, skills, and experiences as a developer focused on creating meaningful digital experiences.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" 
                   className="p-2 rounded-lg bg-slate-800/50 dark:bg-gray-800/50 hover:bg-emerald-600/20 hover:text-emerald-400 dark:hover:text-emerald-300 transition-all duration-300 group">
                  <Github size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="sr-only">Github</span>
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" 
                   className="p-2 rounded-lg bg-slate-800/50 dark:bg-gray-800/50 hover:bg-emerald-600/20 hover:text-emerald-400 dark:hover:text-emerald-300 transition-all duration-300 group">
                  <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" 
                   className="p-2 rounded-lg bg-slate-800/50 dark:bg-gray-800/50 hover:bg-emerald-600/20 hover:text-emerald-400 dark:hover:text-emerald-300 transition-all duration-300 group">
                  <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" 
                   className="p-2 rounded-lg bg-slate-800/50 dark:bg-gray-800/50 hover:bg-emerald-600/20 hover:text-emerald-400 dark:hover:text-emerald-300 transition-all duration-300 group">
                  <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
            
            {/* Quick Links Column */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold text-slate-300 dark:text-gray-300 uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Projects', 'Blog', 'Chat', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="flex items-center text-slate-400 dark:text-gray-400 hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200 text-sm group"
                    >
                      <ChevronRight size={14} className="mr-2 group-hover:translate-x-1 transition-transform" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Latest Posts Column */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold text-slate-300 dark:text-gray-300 uppercase tracking-wider">
                Latest Posts
              </h4>
              <ul className="space-y-3">
                {[
                  'The Future of Web Development',
                  'Mastering React Hooks',
                  'UI Design Trends in 2025'
                ].map((post) => (
                  <li key={post}>
                    <Link 
                      to="/blog"
                      className="block text-slate-400 dark:text-gray-400 hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors duration-200 text-sm leading-relaxed"
                    >
                      {post}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Column */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold text-slate-300 dark:text-gray-300 uppercase tracking-wider">
                Contact Me
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail size={18} className="text-emerald-400 dark:text-emerald-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <a href="mailto:iamsumitK03@gmail.com" className="text-slate-400 dark:text-gray-400 hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors text-sm">
                      iamsumitK03@gmail.com
                    </a>
                  </div>
                </div>
                <p className="text-slate-400 dark:text-gray-400 text-sm leading-relaxed">
                  Have a project in mind or just want to say hello? Feel free to reach out anytime.
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
                >
                  Get In Touch
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-slate-800/50 dark:border-gray-800/50">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-slate-500 dark:text-gray-500 text-sm">
                  © {currentYear} Portfolio. All rights reserved.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-pulse"></div>
                <span className="text-slate-500 dark:text-gray-500 text-sm">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;