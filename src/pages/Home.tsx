
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Code, Palette, Lightbulb, MessageSquare, Calendar } from 'lucide-react';
import Hero from '@/components/Hero';

const Home = () => {
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
      title: 'Student mangement system',
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
    // Add intersection observer to animate sections as they come into view
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Get all section elements and observe them
    document.querySelectorAll('.observe-section').forEach((section) => {
      section.classList.remove('section-animate');
      observer.observe(section);
    });

    return () => {
      // Clean up
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Hero />
      
      {/* Services Section */}
      <section className="observe-section section-padding bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <h2 className="heading-lg mb-4 dark:text-white text-gradient dark:text-gradient-dark">My Services</h2>
            <p className="paragraph dark:text-gray-300">I offer a range of services to help bring your digital ideas to life with creativity and technical excellence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="border-none shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group dark:bg-gray-800/50 dark:border-gray-700 card-3d card-hover shimmer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-4 rounded-full bg-portfolio-blue/10 text-portfolio-blue mb-5 group-hover:bg-portfolio-blue group-hover:text-white transition-colors dark:bg-portfolio-blue/20 transform group-hover:scale-110 transition-transform duration-300">
                      <service.icon size={28} className="animate-pulse-slow" />
                    </div>
                    <h3 className="heading-sm mb-3 dark:text-white group-hover:text-portfolio-blue dark:group-hover:text-portfolio-purple transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground dark:text-gray-300">{service.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="observe-section section-padding bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="heading-lg mb-4 dark:text-white text-gradient dark:text-gradient-dark">Featured Projects</h2>
              <p className="paragraph max-w-xl dark:text-gray-300">Check out some of my recent work that showcases my skills and expertise.</p>
            </div>
            <Button asChild variant="outline" className="btn-animated border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white dark:border-portfolio-purple dark:text-portfolio-purple dark:hover:bg-portfolio-purple">
              <Link to="/projects" className="flex items-center group">
                View All Projects <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link 
                key={index} 
                to="/projects" 
                className="group cursor-glow"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 card-hover glow-border dark:shadow-gray-900/30">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 bg-white dark:bg-gray-800 transition-colors duration-300">
                    <p className="text-sm text-portfolio-blue mb-2 dark:text-portfolio-purple slide-in-left" style={{ animationDelay: '0.3s' }}>{project.category}</p>
                    <h3 className="text-xl font-bold transition-colors group-hover:text-portfolio-blue dark:text-white dark:group-hover:text-portfolio-purple slide-in-bottom" style={{ animationDelay: '0.4s' }}>{project.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Latest Blog Posts Section */}
      <section className="observe-section section-padding bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="heading-lg mb-4 dark:text-white text-gradient dark:text-gradient-dark">Latest Blog Posts</h2>
              <p className="paragraph max-w-xl dark:text-gray-300">Insights, thoughts, and tutorials on web development, design, and technology.</p>
            </div>
            <Button asChild variant="outline" className="btn-animated border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue hover:text-white dark:border-portfolio-purple dark:text-portfolio-purple dark:hover:bg-portfolio-purple">
              <Link to="/blog" className="flex items-center group">
                View All Posts <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card 
                key={post.id} 
                className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-500 dark:bg-gray-800 card-hover shimmer"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-portfolio-blue/10 text-portfolio-blue text-sm rounded-full dark:bg-portfolio-purple/20 dark:text-portfolio-purple slide-in-left" style={{ animationDelay: '0.2s' }}>
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm dark:text-gray-400 slide-in-right" style={{ animationDelay: '0.3s' }}>
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 hover:text-portfolio-blue transition-colors dark:text-white dark:hover:text-portfolio-purple slide-in-bottom" style={{ animationDelay: '0.4s' }}>
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 dark:text-gray-300 slide-in-bottom" style={{ animationDelay: '0.5s' }}>
                    {post.excerpt}
                  </p>
                  <Button asChild variant="ghost" className="p-0 hover:bg-transparent text-portfolio-blue hover:text-portfolio-purple dark:text-portfolio-purple group">
                    <Link to={`/blog/${post.id}`} className="flex items-center">
                      Read More <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="observe-section bg-portfolio-blue text-white py-16 dark:bg-gradient-to-r dark:from-portfolio-blue dark:to-portfolio-purple bg-animate">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-reveal">Ready to start your project?</h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 text-reveal stagger-1">
              I'm available for freelance projects, full-time positions, or consultations. Let's create something amazing together.
            </p>
            <Button asChild size="lg" className="btn-animated bg-white text-portfolio-blue hover:bg-gray-200 dark:bg-gray-900 dark:text-portfolio-purple dark:hover:bg-gray-800 text-reveal stagger-2">
              <Link to="/contact" className="group flex items-center">
                Get in Touch <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
