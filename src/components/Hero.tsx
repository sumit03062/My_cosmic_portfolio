import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main gradient shape */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="999" height="931" className="absolute top-0 left-0 w-full h-full object-cover opacity-30 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="92.827%" y1="0%" x2="53.422%" y2="80.087%" id="hero-shape-a">
                <stop stopColor="#F9425F" offset="0%"></stop>
                <stop stopColor="#F97C58" stopOpacity="0" offset="100%"></stop>
              </linearGradient>
              <linearGradient x1="92.827%" y1="0%" x2="53.406%" y2="80.12%" id="hero-shape-b">
                <stop stopColor="#47A1F9" offset="0%"></stop>
                <stop stopColor="#F9425F" stopOpacity="0" offset="80.532%"></stop>
                <stop stopColor="#FDFFDA" stopOpacity="0" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <path d="M680.188 0c-23.36 69.79-58.473 98.3-105.34 85.531-70.301-19.152-189.723-21.734-252.399 91.442-62.676 113.175-144.097 167.832-215.195 118.57C59.855 262.702 24.104 287.85 0 370.988L306.184 566.41c207.164-4.242 305.67-51.612 295.52-142.11-10.152-90.497 34.533-163.55 134.054-219.16l4.512-119.609L680.188 0z" fill="url(#hero-shape-a)" className="animate-pulse"></path>
              <path d="M817.188 222c-23.36 69.79-58.473 98.3-105.34 85.531-70.301-19.152-189.723-21.734-252.399 91.442-62.676 113.175-144.097 167.832-215.195 118.57-47.399-32.841-83.15-7.693-107.254 75.445L443.184 788.41c207.164-4.242 305.67-51.612 295.52-142.11-10.152-90.497 34.533-163.55 134.054-219.16l4.512-119.609L817.188 222z" fill="url(#hero-shape-b)" className="animate-pulse" style={{ animationDelay: '1s' }}></path>
            </g>
          </svg>
        </div>

        {/* Floating dots */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-20 w-2 h-2 bg-pink-400 dark:bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-yellow-300 dark:bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-48 right-1/3 w-2 h-2 bg-purple-400 dark:bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Crafting digital experiences for{' '}
                <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                  brands & innovators
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                I help businesses and creators stand out with sleek websites, intuitive UI/UX design, tailored software, and engaging blogs — all optimized for performance and impact.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Learn more
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              {/* Phone mockup background */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-500 rounded-3xl transform rotate-6 scale-105 opacity-20 animate-pulse"></div>
                <div className="relative bg-gray-900 dark:bg-gray-800 rounded-3xl p-2 shadow-2xl dark:shadow-gray-900/50">
                  <div className="bg-gray-800 dark:bg-gray-700 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-blue-500 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-600 dark:bg-gray-500 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-700 dark:bg-gray-600 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-32 bg-gradient-to-br from-pink-400 to-blue-500 rounded-lg"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-600 dark:bg-gray-500 rounded"></div>
                        <div className="h-3 bg-gray-700 dark:bg-gray-600 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-700 dark:bg-gray-600 rounded w-4/6"></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1 h-8 bg-gray-700 dark:bg-gray-600 rounded"></div>
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-blue-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-300 dark:bg-yellow-400 rounded-full opacity-80 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-400 dark:bg-pink-300 rounded-full opacity-80 animate-bounce" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;