
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Instagram, Mail, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-portfolio-dark text-white pt-16 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Portfolio</h3>
            <p className="text-gray-300 pr-4">
              A showcase of my professional work, skills, and experiences as a developer focused on creating meaningful digital experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-portfolio-blue transition-colors">
                <Github size={20} />
                <span className="sr-only">Github</span>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-portfolio-blue transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-portfolio-blue transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-portfolio-blue transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Blog', 'Chat', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="flex items-center text-gray-300 hover:text-portfolio-blue transition-colors"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3 - Latest Posts */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Latest Posts</h3>
            <ul className="space-y-3">
              {[
                'The Future of Web Development',
                'Mastering React Hooks',
                'UI Design Trends in 2025'
              ].map((post) => (
                <li key={post}>
                  <Link 
                    to="/blog" 
                    className="block text-gray-300 hover:text-portfolio-blue transition-colors"
                  >
                    {post}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Me</h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-300">
                <Mail size={18} className="mr-2 text-portfolio-blue" />
                iamsumitK03@gmail.com
              </p>
              <p className="text-gray-300">
                Have a project in mind or just want to say hello? Feel free to reach out anytime.
              </p>
              <Link 
                to="/contact"
                className="inline-block bg-portfolio-blue hover:bg-portfolio-purple text-white px-4 py-2 rounded-md transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
          <p>© {currentYear} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
