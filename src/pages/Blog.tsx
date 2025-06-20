
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development in 2025",
      excerpt: "Exploring upcoming trends and technologies that will shape the web development landscape in the next few years.",
      date: "May 15, 2025",
      author: "Sumit Kumar",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1974",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Mastering React Hooks: Advanced Patterns",
      excerpt: "Deep dive into advanced React hooks patterns to build more efficient and maintainable components.",
      date: "April 28, 2025",
      author: "Sumit Kumar",
      category: "React",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "UI Design Trends for Modern Applications",
      excerpt: "Examining the latest UI design trends that are defining modern web and mobile applications.",
      date: "April 10, 2025",
      author: "Sumit Kumar",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Building Accessible Web Applications",
      excerpt: "Best practices and techniques for creating web applications that are accessible to all users.",
      date: "March 22, 2025",
      author: "Sumit Kumar",
      category: "Accessibility",
      image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?q=80&w=2070",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Performance Optimization Techniques for React",
      excerpt: "Strategies to optimize React applications for better performance and user experience.",
      date: "March 8, 2025",
      author: "Sumit Kumar",
      category: "React",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
      readTime: "10 min read"
    },
    {
      id: 6,
      title: "The Role of AI in Modern Web Development",
      excerpt: "Exploring how artificial intelligence is transforming the web development process and user experiences.",
      date: "February 25, 2025",
      author: "Sumit Kumar",
      category: "AI",
      image: "https://images.unsplash.com/photo-1677442135136-760c813029fb?q=80&w=2032",
      readTime: "9 min read"
    }
  ];
  
  const filteredPosts = searchQuery 
    ? blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogPosts;
    
  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  return (
    <>
      {/* Blog Hero */}
      <section className="relative bg-gradient-to-br from-portfolio-blue/10 via-white to-portfolio-purple/10 pt-28 pb-16 dark:from-portfolio-blue/20 dark:via-gray-900 dark:to-portfolio-purple/20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="heading-xl mb-6 text-gray-800 dark:text-gray-100">Blog</h1>
            <p className="paragraph text-xl text-gray-600 dark:text-gray-300">
              Insights, thoughts, and tutorials on web development, design, and technology.
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                  <Input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="pl-10 pr-4 py-6 border-gray-200 dark:bg-gray-800/80 dark:border-gray-700" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Blog Posts */}
              <div className="space-y-8">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <Card key={post.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 dark:bg-gray-800/80">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-60 md:h-auto">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="md:w-2/3 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-4 mb-3">
                              <span className="px-3 py-1 bg-portfolio-blue/10 text-portfolio-blue text-sm rounded-full dark:bg-portfolio-blue/20 dark:text-portfolio-purple">
                                {post.category}
                              </span>
                              <div className="flex items-center text-gray-500 text-sm dark:text-gray-400">
                                <Calendar size={14} className="mr-1" />
                                {post.date}
                              </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-portfolio-blue transition-colors dark:text-gray-100 dark:hover:text-portfolio-purple">
                              <Link to={`/blog/${post.id}`}>{post.title}</Link>
                            </h3>
                            <p className="text-gray-600 mb-4 dark:text-gray-300">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime}</span>
                            <Button asChild variant="ghost" className="p-0 hover:bg-transparent text-portfolio-blue hover:text-portfolio-purple dark:text-portfolio-purple dark:hover:text-portfolio-blue">
                              <Link to={`/blog/${post.id}`} className="flex items-center">
                                Read More <ArrowRight size={16} className="ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2 text-gray-700 dark:text-gray-300">No articles found</h3>
                    <p className="text-muted-foreground dark:text-gray-400">Try searching with different keywords</p>
                    <Button onClick={() => setSearchQuery('')} variant="outline" className="mt-4 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="w-full lg:w-1/3 space-y-8">
              {/* Categories */}
              <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800/80">
                <h3 className="text-xl font-bold mb-4 pb-2 border-b text-gray-800 dark:text-gray-100 dark:border-gray-700">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => setSearchQuery(category === "All" ? "" : category)}
                      className={`w-full justify-start dark:text-gray-300 dark:hover:bg-gray-700 ${searchQuery === category ? "bg-portfolio-blue/10 text-portfolio-blue dark:bg-portfolio-purple/20 dark:text-portfolio-purple" : ""}`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Recent Posts */}
              <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800/80">
                <h3 className="text-xl font-bold mb-4 pb-2 border-b text-gray-800 dark:text-gray-100 dark:border-gray-700">Recent Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map(post => (
                    <div key={post.id} className="flex gap-4">
                      <div className="w-16 h-16 shrink-0">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2 text-gray-700 hover:text-portfolio-blue transition-colors dark:text-gray-300 dark:hover:text-portfolio-purple">
                          <Link to={`/blog/${post.id}`}>{post.title}</Link>
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="bg-portfolio-blue text-white p-6 rounded-lg shadow-md dark:bg-portfolio-purple">
                <h3 className="text-xl font-bold mb-2 text-white">Subscribe to Newsletter</h3>
                <p className="text-sm mb-4 opacity-90 text-white">Get the latest articles and resources directly to your inbox.</p>
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-white/10 border-white/20 placeholder:text-white/70 mb-3 text-white"
                />
                <Button className="w-full bg-white text-portfolio-blue hover:bg-gray-100 dark:text-portfolio-purple">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
