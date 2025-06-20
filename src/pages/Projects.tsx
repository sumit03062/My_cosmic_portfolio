
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const categories = ['All', 'Web Development', 'Mobile Apps', 'UI/UX Design', 'Branding'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  const projects = [
    {
      id: 1,
      title: 'AI Interview Mocker',
      description: 'Developed a React-based web application simulating AI-driven mock interviews to assist users in interview preparation.',
      category: 'Web Development',
      image: '',
      tools: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/sumit03062/AI-Interview-Mocker'
    },
    {
      id: 2,
      title: 'Student Management System (Django) ',
      description: 'Developed a web-based Student Management System using Django for backend development.  ',
      category: 'Web Development',
      image: '',
      tools: ['pyhton', 'Django', 'sqllite3'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/sumit03062/Django-project-students-management'
    },
    {
      id: 3,
      title: 'Smart Inventory Management System',
      description: 'Developed a full-stack Smart Inventory Management System using Django & Angular  ',
      category: 'Web Development',
      image: '',
      tools: ['Angular', 'Django', 'MongoDb'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com/sumit03062/FS_Smart-Inventory-Management-System'
    },
    {
      id: 4,
      title: 'Chat bot',
      description: '',
      category: 'React',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f36?q=80&w=2087',
      tools: ['React, Tailwind, Gemini Api'],
      liveLink: '',
      githubLink:''
    },
    {
      id: 5,
      title: 'VastraVerse',
      description: '',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=2070',
      tools: ['React',  'Node.js', 'PostgreSQL'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com'
    },
    {
      id: 6,
      title: 'portfoilo',
      description: 'A mobile app that helps users track workouts, set goals, monitor progress, and connect with fitness communities.',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=2087',
      tools: ['Flutter', 'Firebase', 'Google Fit API'],
      liveLink: 'https://example.com',
      githubLink: 'https://github.com'
    }
  ];
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <>
      {/* Projects Hero */}
      <section className="relative bg-gradient-to-br from-portfolio-blue/10 via-white to-portfolio-purple/10 pt-28 pb-16 dark:from-portfolio-blue/20 dark:via-gray-900 dark:to-portfolio-purple/20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="heading-xl mb-6 text-gray-800 dark:text-gray-100">My Projects</h1>
            <p className="paragraph text-xl text-gray-600 dark:text-gray-300">
              Explore my recent work and discover how I solve problems through design and development.
            </p>
          </div>
        </div>
      </section>
      
      {/* Projects Gallery */}
      <section className="py-16">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="mb-12 flex justify-center">
            <Tabs value={activeCategory} className="w-full max-w-3xl">
              <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent h-auto">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category}
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className="bg-white border data-[state=active]:bg-portfolio-blue data-[state=active]:text-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:data-[state=active]:bg-portfolio-purple"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <Card key={project.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group dark:bg-gray-800/80">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tools.map((tool, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-xs rounded-md text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-portfolio-blue transition-colors text-gray-800 dark:text-gray-100 dark:group-hover:text-portfolio-purple">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 dark:text-gray-300">
                    {project.description}
                  </p>
                  <div className="flex gap-3">
                    <Button asChild size="sm" variant="default" className="bg-portfolio-blue hover:bg-portfolio-purple text-white dark:bg-portfolio-purple dark:hover:bg-portfolio-blue">
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <ExternalLink size={16} className="mr-1" /> Live Demo
                      </a>
                    </Button>
                    {project.githubLink && (
                      <Button asChild size="sm" variant="outline" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <Github size={16} className="mr-1" /> Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Show if filtered list is empty */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2 text-gray-700 dark:text-gray-300">No projects found in this category</h3>
              <p className="text-muted-foreground dark:text-gray-400">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Projects;
