import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { functions } from '@/lib/firebase';
import { httpsCallable } from 'firebase/functions';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    try {
      // Call Firebase Function to send email
      const sendEmail = httpsCallable(functions, 'emailService');
      
      const response = await sendEmail({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        type: 'contact'
      });

      console.log("Email sent successfully:", response);
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly at iamsumitK03@gmail.com",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      {/* Contact Hero */}
      <section className="relative bg-gradient-to-br from-portfolio-blue/10 via-white to-portfolio-purple/10 pt-28 pb-16 dark:from-portfolio-blue/20 dark:via-gray-900 dark:to-portfolio-purple/20">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="heading-xl mb-6 text-gray-800 dark:text-gray-100">Contact Me</h1>
            <p className="paragraph text-xl text-gray-600 dark:text-gray-300">
              Have a question or want to work together? I'd love to hear from you!
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div>
              <Card className="border-none shadow-lg dark:bg-gray-800/80">
                <CardContent className="p-8">
                  <h2 className="heading-md mb-6 text-portfolio-blue dark:text-portfolio-purple">Send Me a Message</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 dark:text-gray-200">Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Name" {...field} className="dark:bg-gray-700/50 dark:border-gray-600" />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 dark:text-gray-200">Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} className="dark:bg-gray-700/50 dark:border-gray-600" />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-200">Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="What is this regarding?" {...field} className="dark:bg-gray-700/50 dark:border-gray-600" />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 dark:text-gray-200">Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Your message here..." 
                                className="min-h-[150px] resize-none dark:bg-gray-700/50 dark:border-gray-600"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        type="submit" 
                        className="w-full bg-portfolio-blue hover:bg-portfolio-purple text-white dark:bg-portfolio-purple dark:hover:bg-portfolio-blue"
                        disabled={form.formState.isSubmitting}
                      >
                        <Send className="mr-2" size={16} />
                        {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-md mb-6 text-portfolio-blue dark:text-portfolio-purple">Get in Touch</h2>
                <p className="paragraph mb-8 text-gray-600 dark:text-gray-300">
                  Feel free to reach out with any questions, project inquiries, or just to say hello. 
                  I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-md dark:bg-gray-800/80">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-portfolio-blue/10 text-portfolio-blue dark:bg-portfolio-blue/20">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">iamsumitK03@gmail.com</p>
                      <p className="text-gray-600 dark:text-gray-400">sr8171067@gmail.com</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-md dark:bg-gray-800/80">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-portfolio-blue/10 text-portfolio-blue dark:bg-portfolio-blue/20">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-400">+91 9097382997</p>
                      <p className="text-gray-600 dark:text-gray-400">Mon-Fri, 9am-5pm</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-md dark:bg-gray-800/80">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-portfolio-blue/10 text-portfolio-blue dark:bg-portfolio-blue/20">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Location</h3>
                      <p className="text-gray-600 dark:text-gray-400">Ameerpet, Hyderabad</p>
                      <p className="text-gray-600 dark:text-gray-400">India</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-md dark:bg-gray-800/80">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-portfolio-blue/10 text-portfolio-blue dark:bg-portfolio-blue/20">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Working Hours</h3>
                      <p className="text-gray-600 dark:text-gray-400">Monday - Friday</p>
                      <p className="text-gray-600 dark:text-gray-400">9:00 AM - 5:00 PM</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Map */}
              <Card className="border-none shadow-lg overflow-hidden dark:bg-gray-800/80">
                <CardContent className="p-0 h-[300px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15225.712917879695!2d78.4343206312346!3d17.43920620685769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c55bb43183%3A0x1abc135b23ee2703!2sAmeerpet%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1748321486245!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}  
                    allowFullScreen 
                    loading="lazy"  
                    title="Location Map"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;