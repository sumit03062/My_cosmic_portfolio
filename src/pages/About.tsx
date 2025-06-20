
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, BookOpen, Award, Briefcase } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'Pyhton', percentage: 95 },
    { name: 'Django', percentage: 95 },
    { name: 'React/Next.js', percentage: 95 },
    { name: 'JavaScript/TypeScript', percentage: 90 },
    { name: 'Node.js', percentage: 85 },
    { name: 'UI/UX Design', percentage: 80 },
    { name: 'CSS/Tailwind/SCSS', percentage: 90 },
    { name: 'Database Design', percentage: 75 },
    { name: 'MysQL', percentage: 80 },
    { name: 'MongoDB', percentage: 95 },
  ];

  const experiences = [
    {
      role: ' Python Programming ',
      company: 'CDAC ',
      period: '2023',
      description: ' Developed projects including a Word and Sentence Counter and a Scientific Calculator with Tkinter GUI. Implemented Python scripts for efficient text processing and GUI-based applications.  Created a Scientific Calculator using Tkinter GUI, implementing advanced mathematical functions. . '},
    {
      role: 'Full Stack Python Developer Intern',
      company: 'CodSoft',
      period: '2024',
      description: 'Delivered efficient, scalable, and user-friendly solutions within project deadlines. '},
    {
      role: 'Full Stack Python Developer Intern',
      company: 'Invictus Solutions',
      period: '2025 - present',
      description: 'Created responsive websites and interactive applications for various clients across different industries.',
    },
  ];

  const educations = [
    {
      degree: 'Bachelor of Computer Applications (BCA)  ',
      institution: 'Lalit Narayan Mithila University (LNMU), Darbhanga  ',
      period: '2021 - 2024',
      description: 'Specialized in Human-Computer Interaction and Web Technologies.',
    },
    {
      degree: 'Intermediate (12th Grade)  ',
      institution: 'Lalit Narayan Mithila University (LNMU), Darbhanga ',
      period: '2018 - 2020',
      description: 'Graduated with honors. Participated in multiple hackathons and coding competitions.',
    },
  ];

  return (
    <>
      {/* About Hero Section */}
      <section className="relative bg-gradient-to-br from-portfolio-blue/10 via-white to-portfolio-purple/10 dark:from-portfolio-purple/20 dark:via-gray-900 dark:to-portfolio-blue/20 pt-28 pb-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="heading-xl mb-6 dark:text-gradient-dark">About Me</h1>
            <p className="paragraph text-xl dark:text-gray-300">
              Get to know more about me, my skills, experiences, and what drives me to create exceptional digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-md mb-6 text-portfolio-blue dark:text-portfolio-purple">Who I Am</h2>
              <div className="space-y-4">
                <p className="paragraph dark:text-gray-300">
I'm a passionate Full Stack Developer skilled in building responsive and user-friendly web applications. With hands-on experience in Python, Django, Angular, React, and modern databases like MySQL and MongoDB, I focus on creating efficient, scalable solutions. From developing finance tracking tools to AI-integrated platforms, I bring a blend of backend logic and frontend creativity to every project.                </p>
                <p className="paragraph dark:text-gray-300">
                  My approach combines technical expertise with creative problem-solving to deliver solutions that not only meet but exceed client expectations. I believe in writing clean, maintainable code and creating designs that are both beautiful and functional.
                </p>
                <p className="paragraph dark:text-gray-300">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and community events.
                </p>
              </div>
              
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-1 text-gray-800 dark:text-gray-200">Name:</h4>
                    <p className="text-gray-700 dark:text-gray-300">Sumit Kumar</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-800 dark:text-gray-200">Email:</h4>
                    <p className="text-gray-700 dark:text-gray-300">iamsumitK03@gmail.com</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-800 dark:text-gray-200">Location:</h4>
                    <p className="text-gray-700 dark:text-gray-300">Ameerpet,Hydrabad</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-gray-800 dark:text-gray-200">Availability:</h4>
                    <p className="text-gray-700 dark:text-gray-300">Freelance / Full-time</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Skills Section */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">My Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-portfolio-blue dark:text-portfolio-purple">{skill.percentage}%</span>
                    </div>
                    <Progress value={skill.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience & Education Tabs */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg mb-4 dark:text-gray-100">Experience & Education</h2>
            <p className="paragraph dark:text-gray-300">My professional journey and academic background that have shaped my expertise.</p>
          </div>
          
          <Tabs defaultValue="experience" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto bg-gray-100 dark:bg-gray-700">
              <TabsTrigger value="experience" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 data-[state=active]:text-portfolio-blue dark:data-[state=active]:text-portfolio-purple">
                <Briefcase size={18} />
                <span>Experience</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 data-[state=active]:text-portfolio-blue dark:data-[state=active]:text-portfolio-purple">
                <BookOpen size={18} />
                <span>Education</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="experience" className="mt-8">
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 pb-8 border-l-2 border-portfolio-blue dark:border-portfolio-purple">
                    <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-portfolio-blue dark:bg-portfolio-purple flex items-center justify-center text-white">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                      <span className="inline-block px-3 py-1 rounded text-sm bg-portfolio-blue/10 text-portfolio-blue dark:bg-portfolio-purple/20 dark:text-portfolio-purple mb-3">
                        {exp.period}
                      </span>
                      <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-100">{exp.role}</h3>
                      <h4 className="text-portfolio-purple dark:text-portfolio-blue mb-3">{exp.company}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="mt-8">
              <div className="space-y-8">
                {educations.map((edu, index) => (
                  <div key={index} className="relative pl-8 pb-8 border-l-2 border-portfolio-purple dark:border-portfolio-blue">
                    <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-portfolio-purple dark:bg-portfolio-blue flex items-center justify-center text-white">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                      <span className="inline-block px-3 py-1 rounded text-sm bg-portfolio-purple/10 text-portfolio-purple dark:bg-portfolio-blue/20 dark:text-portfolio-blue mb-3">
                        {edu.period}
                      </span>
                      <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-100">{edu.degree}</h3>
                      <h4 className="text-portfolio-blue dark:text-portfolio-purple mb-3">{edu.institution}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default About;
