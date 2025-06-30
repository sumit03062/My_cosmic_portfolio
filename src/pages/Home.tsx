import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Palette, Lightbulb, MessageSquare, Calendar, Play, CheckCircle, Users, Zap, Shield, Globe, Smartphone, Database, Server, Layers, Figma, Brush, Keyboard, Command, BarChart3, Target } from 'lucide-react';
import Hero from '../components/Hero';

export default function Home() {
  const services = [
    {
      title: 'Web Development',
      description: 'Creating responsive, fast, and modern web applications using the latest technologies.',
      icon: Code,
    },
    {
      title: 'UI/UX Design',
      description: 'Designing beautiful and intuitive user interfaces that provide exceptional user experience.',
      icon: Palette,
    },
    {
      title: 'Creative Solutions',
      description: 'Developing innovative solutions to complex problems with a creative approach.',
      icon: Lightbulb,
    },
    {
      title: 'Consultation',
      description: 'Providing expert advice and insights to help you make the best technical decisions.',
      icon: MessageSquare,
    },
  ];

  const projects = [
    {
      title: 'AI Interview Mocker',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1536242918817-db5e90dd7a29?q=80&w=2070',
    },
    {
      title: 'Chat Bot',
      category: 'React',
      image: 'https://images.unsplash.com/photo-1626908013351-800ddd734b8a?q=80&w=2070',
    },
    {
      title: 'Student Management System',
      category: 'Web Application',
      image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=2070',
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development in 2025",
      excerpt: "Exploring upcoming trends and technologies that will shape the web development landscape in the next few years.",
      date: "May 15, 2025",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1974",
    },
    {
      id: 2,
      title: "Mastering React Hooks: Advanced Patterns",
      excerpt: "Deep dive into advanced React hooks patterns to build more efficient and maintainable components.",
      date: "April 28, 2025",
      category: "React",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
    },
    {
      id: 3,
      title: "UI Design Trends for Modern Applications",
      excerpt: "Examining the latest UI design trends that are defining modern web and mobile applications.",
      date: "April 10, 2025",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000",
    },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.observe-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />

      {/* Features Section - UI/UX Design & Web Development Services */}
      <section className="observe-section py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden transition-colors duration-300">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Code className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              UI/UX Design & Web Development Services
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              I specialize in creating beautiful, user-centered designs and bringing them to life with modern web technologies.
              From wireframes to fully functional applications, I deliver complete digital solutions.
            </p>
          </div>

          {/* Main Services Dashboard */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>

              {/* Dashboard Container */}
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg"></div>
                    <h3 className="text-white font-semibold text-lg">Design & Development Services</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Services */}
                  <div className="lg:col-span-2 space-y-4">
                    <h4 className="text-gray-300 font-medium mb-4">Core Services</h4>

                    {/* Service Items */}
                    {[
                      {
                        name: 'UI/UX Design',
                        tech: 'Figma, Adobe XD, Prototyping',
                        icon: Palette,
                        description: 'User-centered design and intuitive interfaces',
                        gradient: 'from-pink-500 to-purple-600'
                      },
                      {
                        name: 'Frontend Development',
                        tech: 'React, TypeScript, Tailwind CSS',
                        icon: Globe,
                        description: 'Modern, responsive user interfaces',
                        gradient: 'from-blue-500 to-cyan-600'
                      },
                      {
                        name: 'Full-Stack Applications',
                        tech: 'Node.js, Express, MongoDB',
                        icon: Server,
                        description: 'Complete web application solutions',
                        gradient: 'from-green-500 to-emerald-600'
                      },
                      {
                        name: 'Creative Solutions',
                        tech: 'Problem Solving, Innovation',
                        icon: Lightbulb,
                        description: 'Innovative approaches to complex challenges',
                        gradient: 'from-yellow-500 to-orange-600'
                      },
                      {
                        name: 'Mobile-First Design',
                        tech: 'Responsive Design, PWA',
                        icon: Smartphone,
                        description: 'Optimized for all devices and platforms',
                        gradient: 'from-purple-500 to-indigo-600'
                      },
                      {
                        name: 'Consultation & Strategy',
                        tech: 'Technical Guidance, Planning',
                        icon: MessageSquare,
                        description: 'Expert advice and project planning',
                        gradient: 'from-teal-500 to-blue-600'
                      }
                    ].map((service, index) => (
                      <div key={index} className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <service.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="text-white font-semibold text-lg">{service.name}</h5>
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                            <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                            <div className="flex items-center space-x-2">
                              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                                {service.tech}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Skills & Stats Panel */}
                  <div className="space-y-6">
                    <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-medium">Experience</span>
                      </div>
                      <div className="text-2xl font-bold text-green-400 mb-2">3+ Years</div>
                      <div className="text-gray-400 text-sm mb-4">Design & Development</div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Projects Completed</span>
                          <span className="text-white">25+</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Design Tools Used</span>
                          <span className="text-white">8+</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Technologies Used</span>
                          <span className="text-white">15+</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Client Satisfaction</span>
                          <span className="text-green-400">98%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Your vision, my expertise.
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  I combine creative design thinking with technical expertise to deliver exceptional digital experiences.
                  From initial concept and user research to final implementation and deployment, I handle every aspect
                  of the design and development process.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-pink-400 hover:text-pink-300 transition-colors font-medium group"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Service Categories */}
              <div className="space-y-4">
                {[
                  {
                    title: 'UI/UX Design',
                    description: 'User research, wireframing, prototyping, and visual design using Figma and Adobe Creative Suite.',
                    link: 'Explore Design Services',
                    icon: Figma
                  },
                  {
                    title: 'Frontend Development',
                    description: 'React, Vue.js, TypeScript, and modern CSS frameworks for stunning, responsive interfaces.',
                    link: 'Learn about Frontend',
                    icon: Code
                  },
                  {
                    title: 'Full-Stack Solutions',
                    description: 'Complete web applications with seamless design-to-development integration.',
                    link: 'Discover Full-Stack',
                    icon: Layers
                  }
                ].map((item, index) => (
                  <div key={index} className="border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                        <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                        <Link
                          to="/services"
                          className="text-pink-400 hover:text-pink-300 text-sm font-medium transition-colors"
                        >
                          {item.link} →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - About Me */}
            <div className="relative">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 shadow-xl">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    SK
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-white text-lg leading-relaxed mb-4">
                      "I believe great digital products start with understanding users and their needs. My approach combines
                      creative design thinking with solid technical implementation to create experiences that are both
                      beautiful and functional."
                    </blockquote>
                    <div>
                      <div className="text-white font-semibold">Sumit Kumar</div>
                      <div className="text-gray-400 text-sm">UI/UX Designer & Full Stack Developer</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Design Tools Card */}
              <div className="absolute -bottom-6 -right-6 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 shadow-xl max-w-xs">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Brush className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Design & Dev Stack</div>
                    <div className="text-gray-400 text-xs">Current Tools</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {['Figma', 'React', 'TypeScript', 'Tailwind CSS'].map((tech, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
                      <span className="text-gray-300 text-xs">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {/* <section className="observe-section py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Portfolio
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
              Lorem ipsum is common placeholder text used to demonstrate the graphic elements of a document or visual presentation.
            </p>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-24 h-24 bg-white/20 dark:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 dark:hover:bg-white/40 transition-all duration-300 group">
                  <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-blue-500/20"></div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Featured Projects Section */}
      <section className="observe-section py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                Check out some of my recent work that showcases my skills and expertise.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link
                key={index}
                to="/projects"
                className="group block"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-gray-900/30 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-pink-500 dark:text-pink-400 mb-2 font-medium">{project.category}</p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="observe-section py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Latest <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Posts</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                Insights, thoughts, and tutorials on web development, design, and technology.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-gray-900/30 transition-all duration-500 hover:transform hover:scale-105"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-pink-500 dark:hover:text-pink-400 transition-colors">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-pink-500 dark:text-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors group"
                  >
                    Read More <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="observe-section py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Informed
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Sign Up for Artistic Inspiration, Updates, and More.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your best email…"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium rounded-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                Early access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Dark Design */}
      <section className="observe-section bg-slate-950 dark:bg-gray-950 text-white py-32 relative overflow-hidden transition-colors duration-300">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900/50 via-gray-900/30 to-slate-950/50"></div>
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Elevate Your Digital Presence
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              From elegant UI/UX design to high-performance web development and smart software solutions, I help brands and businesses bring ideas to life with clarity, creativity, and code.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Built for your keyboard */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8 h-full relative overflow-hidden">
                {/* Keyboard Visual */}
                <div className="relative mb-8">
                  <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700/50">
                    {/* Keyboard Layout */}
                    <div className="grid grid-cols-12 gap-2 mb-4">
                      {/* Top Row */}
                      {['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Delete'].map((key, index) => (
                        <div key={index} className={`${key === 'Tab' || key === 'Delete' ? 'col-span-2' : 'col-span-1'} bg-gray-700/50 hover:bg-gray-600/50 rounded-lg p-3 text-center text-xs text-gray-300 transition-colors cursor-pointer`}>
                          {key}
                        </div>
                      ))}
                    </div>
                    {/* Middle Row */}
                    <div className="grid grid-cols-12 gap-2 mb-4">
                      {['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Return'].map((key, index) => (
                        <div key={index} className={`${key === 'Caps' ? 'col-span-2' : key === 'Return' ? 'col-span-2' : 'col-span-1'} bg-gray-700/50 hover:bg-gray-600/50 rounded-lg p-3 text-center text-xs text-gray-300 transition-colors cursor-pointer`}>
                          {key}
                        </div>
                      ))}
                    </div>
                    {/* Bottom Row */}
                    <div className="grid grid-cols-12 gap-2 mb-4">
                      {['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Shift'].map((key, index) => (
                        <div key={index} className={`${key === 'Shift' ? (index === 0 ? 'col-span-2' : 'col-span-3') : 'col-span-1'} bg-gray-700/50 hover:bg-gray-600/50 rounded-lg p-3 text-center text-xs text-gray-300 transition-colors cursor-pointer`}>
                          {key}
                        </div>
                      ))}
                    </div>
                    {/* Space Bar Row */}
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-2 bg-gray-700/50 rounded-lg p-3"></div>
                      <div className="col-span-8 bg-gray-600/50 rounded-lg p-3 text-center text-xs text-gray-300">Space</div>
                      <div className="col-span-2 bg-gray-700/50 rounded-lg p-3"></div>
                    </div>
                  </div>

                  {/* Command Indicator */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2 flex items-center space-x-2">
                    <Command className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-300">Opens command line</span>
                    <span className="text-xs text-gray-500">⌘K</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    Tailored Digital Solutions, Built for You
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    From sleek user interfaces to powerful backend systems, I craft web experiences that are intuitive, fast, and user-focused. Whether it’s building full-scale websites, designing seamless UI/UX, writing engaging blogs, or developing smart software—every line of code is made with purpose.
                  </p>
                </div>
              </div>
            </div>

            {/* Breathtakingly fast */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8 relative overflow-hidden">
              {/* Performance Chart */}
              <div className="relative mb-8">
                <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-end justify-center space-x-1 h-32">
                    {[20, 40, 60, 80, 100, 85, 95, 75, 90, 100, 95, 100].map((height, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm flex-1 transition-all duration-1000 hover:from-blue-500 hover:to-blue-300"
                        style={{ height: `${height}%`, animationDelay: `${index * 100}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  Blazing Fast Experiences
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Optimized for speed and performance—whether it's loading a website, navigating an app, or syncing data in real-time. Your users get seamless, smooth, and lightning-fast interactions.
                </p>
              </div>
            </div>

            {/* Designed for modern software teams */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8 relative overflow-hidden">
              {/* Team Workflow Visual */}
              <div className="relative mb-8">
                <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700/50">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 bg-gray-700/50 rounded-lg h-3"></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 bg-gray-700/50 rounded-lg h-3"></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                        <Code className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 bg-gray-700/50 rounded-lg h-3"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  Crafted for Modern Digital Needs
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Designed with creators, startups, and teams in mind—my solutions bring structure, clarity, and innovation to every digital product. Whether it's a website, UI design, blog, or custom software, everything aligns with modern workflow demands.
                </p>
              </div>

            </div>

            {/* Meet your command line */}
            <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8 relative overflow-hidden">
              {/* Command Line Interface */}
              <div className="relative mb-8">
                <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700/50">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                        <Command className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium">Meet your command line</span>
                    </div>

                    <div className="bg-gray-900/80 rounded-lg p-4 border border-gray-700/30">
                      <div className="text-gray-400 text-sm mb-2">Type a command or search...</div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-2 hover:bg-gray-700/30 rounded-lg transition-colors cursor-pointer">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-gray-300 text-sm">Assign to...</span>
                        </div>
                        <div className="flex items-center space-x-3 p-2 hover:bg-gray-700/30 rounded-lg transition-colors cursor-pointer">
                          <Target className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">Change status...</span>
                        </div>
                        <div className="flex items-center space-x-3 p-2 hover:bg-gray-700/30 rounded-lg transition-colors cursor-pointer">
                          <BarChart3 className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-300 text-sm">Change priority...</span>
                        </div>
                        <div className="flex items-center space-x-3 p-2 hover:bg-gray-700/30 rounded-lg transition-colors cursor-pointer">
                          <Palette className="w-4 h-4 text-pink-400" />
                          <span className="text-gray-300 text-sm">Add labels...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  Power at Your Fingertips
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Navigate your ideas or digital product with precision. From quick actions to intuitive flows, I build interfaces that feel as fast and responsive as a command line—no delays, just results.
                </p>
              </div>

            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="max-w-3xl mx-auto mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to elevate your digital presence?
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Let’s build impactful web experiences, pixel-perfect designs, and powerful software solutions—crafted for creators, brands, and future-forward businesses.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center px-8 py-4 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 group"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}