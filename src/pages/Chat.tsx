
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, User, Clock, ChevronDown } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToMessages, addMessage, FirebaseMessage } from '@/services/chatService';

interface Message {
  id: string | number;
  content: string;
  sender: 'user' | 'owner';
  timestamp: Date;
}

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Initial message when no messages are available
    if (messages.length === 0) {
      setMessages([
        {
          id: 'initial',
          content: "Hello! Thanks for visiting my portfolio. How can I help you today?",
          sender: 'owner',
          timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
        }
      ]);
    }
    
    // Subscribe to Firebase messages
    const unsubscribe = subscribeToMessages((firebaseMessages: FirebaseMessage[]) => {
      if (firebaseMessages.length > 0) {
        const formattedMessages: Message[] = firebaseMessages.map(msg => ({
          id: msg.id,
          content: msg.content,
          sender: msg.sender,
          timestamp: msg.timestamp ? msg.timestamp.toDate() : new Date()
        }));
        setMessages(formattedMessages);
      }
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to state immediately for UI feedback
    const userMessage: Message = {
      id: Date.now(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Save message to Firebase
    try {
      await addMessage({
        content: message,
        sender: 'user'
      });
      
      // Simulate typing indicator
      setIsTyping(true);
      
      // Simulate response delay
      setTimeout(async () => {
        const responses = [
          "Thanks for your message! I'll get back to you as soon as possible.",
          "That's an interesting question. Let me think about that for a moment.",
          "I appreciate your interest! Would you like to discuss this further over a call?",
          "Great point! I've worked on several projects like that before.",
          "I'd be happy to help with your project. Could you provide more details?"
        ];
        
        const responseContent = responses[Math.floor(Math.random() * responses.length)];
        
        // Save owner response to Firebase
        await addMessage({
          content: responseContent,
          sender: 'owner'
        });
        
        setIsTyping(false);
        
        toast({
          title: "New message received",
          description: "You have a new response in your chat."
        });
      }, 1500);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      {/* Chat Hero */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-portfolio-blue/10 via-white to-portfolio-purple/10 dark:from-portfolio-blue/30 dark:via-black/20 dark:to-portfolio-purple/30 pt-28 pb-16"
      >
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="heading-xl mb-6 text-gradient dark:text-gradient-dark"
            >
              Let's Chat
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="paragraph text-xl"
            >
              Have questions or want to discuss a project? I'm here to help!
            </motion.p>
          </motion.div>
        </div>
        
        {/* Abstract shapes */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.9, 0.7]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-portfolio-blue/10 blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1 
          }}
          className="absolute bottom-0 -right-10 w-60 h-60 rounded-full bg-portfolio-purple/10 blur-3xl"
        ></motion.div>
      </motion.section>
      
      {/* Chat Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="py-16"
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="chat">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="chat" className="flex-1">Live Chat</TabsTrigger>
                    <TabsTrigger value="faq" className="flex-1">FAQ</TabsTrigger>
                  </TabsList>
                </motion.div>
                
                <TabsContent value="chat">
                  <motion.div 
                    variants={itemVariants}
                    className="perspective-1000"
                  >
                    <Card className="border-none shadow-lg overflow-hidden">
                      {/* Chat Header */}
                      <motion.div 
                        initial={{ backgroundColor: "rgb(67, 97, 238, 0.9)" }}
                        whileHover={{ backgroundColor: "rgb(67, 97, 238, 1)" }}
                        className="bg-portfolio-blue text-white p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                          >
                            <User size={20} />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold">Sumit Kumar</h3>
                            <p className="text-xs opacity-80">Usually responds within 1 hour</p>
                          </div>
                        </div>
                        <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                            <ChevronDown size={20} />
                          </Button>
                        </motion.div>
                      </motion.div>
                      
                      {/* Chat Messages */}
                      <CardContent className="p-0">
                        <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                          <AnimatePresence>
                            {messages.map((msg) => (
                              <motion.div 
                                key={msg.id} 
                                variants={messageVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                              >
                                <motion.div 
                                  whileHover={{ scale: 1.02 }}
                                  className={`max-w-[70%] rounded-lg p-3 ${
                                    msg.sender === 'user'
                                      ? 'bg-portfolio-blue text-white rounded-tr-none'
                                      : 'bg-white dark:bg-gray-800 shadow-md rounded-tl-none'
                                  }`}
                                >
                                  <p>{msg.content}</p>
                                  <div 
                                    className={`text-xs mt-1 flex items-center ${
                                      msg.sender === 'user' ? 'text-white/70 justify-end' : 'text-gray-500 dark:text-gray-400'
                                    }`}
                                  >
                                    <Clock size={12} className="mr-1" />
                                    {formatTime(msg.timestamp)}
                                  </div>
                                </motion.div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          
                          {isTyping && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="flex justify-start"
                            >
                              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md rounded-tl-none">
                                <div className="flex space-x-1">
                                  <motion.div 
                                    animate={{ scale: [0.8, 1.2, 0.8] }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                                    className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300"
                                  ></motion.div>
                                  <motion.div 
                                    animate={{ scale: [0.8, 1.2, 0.8] }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.2 }}
                                    className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300"
                                  ></motion.div>
                                  <motion.div 
                                    animate={{ scale: [0.8, 1.2, 0.8] }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.4 }}
                                    className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300"
                                  ></motion.div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                          <div ref={messageEndRef} />
                        </div>
                        
                        {/* Message Input */}
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="p-4 border-t bg-white dark:bg-gray-800"
                        >
                          <div className="flex space-x-2">
                            <Textarea 
                              placeholder="Type your message here..." 
                              className="resize-none dark:bg-gray-700"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              onKeyDown={handleKeyDown}
                            />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button 
                                onClick={handleSendMessage} 
                                className="bg-portfolio-blue hover:bg-portfolio-purple"
                                disabled={!message.trim()}
                              >
                                <Send size={18} />
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="faq">
                  <motion.div variants={itemVariants}>
                    <Card className="border-none shadow-lg">
                      <CardContent className="p-6">
                        <motion.h2 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="text-2xl font-bold mb-6 text-center text-gradient dark:text-gradient-dark"
                        >
                          Frequently Asked Questions
                        </motion.h2>
                        <motion.div 
                          variants={containerVariants}
                          className="space-y-6"
                        >
                          {[
                            {
                              question: "What services do you offer?",
                              answer: "I offer web development, UI/UX design, mobile app development, and branding services. My focus is on creating modern, responsive, and user-friendly digital experiences."
                            },
                            {
                              question: "How much do your services cost?",
                              answer: "My rates vary depending on the scope and requirements of each project. I offer customized quotes after an initial consultation to understand your specific needs."
                            },
                            {
                              question: "What is your typical process for a new project?",
                              answer: "My process typically includes discovery and requirements gathering, planning and wireframing, design mockups, development, testing, and launch. I keep clients informed and involved throughout the process."
                            },
                            {
                              question: "How long does a typical project take?",
                              answer: "Project timelines vary based on complexity and scope. A simple website might take 2-4 weeks, while more complex applications can take several months. I'll provide a detailed timeline during our initial consultation."
                            },
                            {
                              question: "Do you offer maintenance services after project completion?",
                              answer: "Yes, I offer ongoing maintenance and support services to ensure your project continues to run smoothly after launch. This can include updates, security patches, and feature additions."
                            }
                          ].map((faq, index) => (
                            <motion.div 
                              key={index} 
                              variants={itemVariants}
                              whileHover={{ scale: 1.01 }}
                              className="border-b pb-6 last:border-b-0 last:pb-0 dark:border-gray-700"
                            >
                              <motion.h3 
                                initial={{ color: "#333" }}
                                whileHover={{ color: "#4361ee" }}
                                className="text-xl font-semibold mb-2 dark:text-white"
                              >
                                {faq.question}
                              </motion.h3>
                              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </motion.div>
            </Tabs>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default ChatPage;
