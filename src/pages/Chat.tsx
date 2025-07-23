import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, User, Clock, ChevronDown, Bot, Code, Lightbulb } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToMessages, sendMessage, FirebaseMessage, generateSessionId } from '@/services/chatService';

interface Message {
  id: string | number;
  content: string;
  sender: 'user' | 'owner' | 'bot';
  timestamp: Date;
  isBot?: boolean;
}

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: 'welcome',
        content: `👋 **Hello! I'm Sumit Kumar, your Full Stack Development Assistant!**

I'm here to help you with:
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Backend**: Python/Django, Node.js, APIs  
- **Databases**: MongoDB, MySQL, PostgreSQL
- **Deployment**: Firebase, AWS, Vercel
- **UI/UX**: Design systems, responsive layouts

**Quick Start Questions:**
- "Help me build a React app"
- "How to create an API with Django?"
- "Database design for e-commerce"
- "Deploy my app to Firebase"
- "Tell me about your projects"

What development challenge can I help you solve today? 🚀`,
        sender: 'bot',
        timestamp: new Date(),
        isBot: true
      }
    ]);

    const unsubscribe = subscribeToMessages((firebaseMessages: FirebaseMessage[]) => {
      if (firebaseMessages.length > 0) {
        const formattedMessages: Message[] = firebaseMessages.map(msg => ({
          id: msg.id,
          content: msg.content,
          sender: msg.sender === 'admin' ? 'owner' : msg.sender === 'bot' ? 'bot' : 'user',
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
          isBot: msg.isBot || msg.sender === 'bot'
        }));
        
        // Filter out the welcome message if we have real messages
        if (formattedMessages.length > 0) {
          setMessages(formattedMessages);
        }
      }
    }, false, sessionId);

    return () => unsubscribe();
  }, [sessionId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      await sendMessage(message, 'visitor', { sessionId });
      
      // Stop typing indicator after bot responds
      setTimeout(() => {
        setIsTyping(false);
      }, 3000);

    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
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

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatMessage = (content: string) => {
    // Convert markdown-like formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</code>')
      .replace(/\n/g, '<br/>');
  };

  const quickQuestions = [
    "Help me build a React app",
    "How to create APIs with Django?",
    "Database design best practices",
    "Deploy to Firebase",
    "Tell me about your projects"
  ];

  return (
    <>
      {/* Header Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="relative pt-28 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      >
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Full Stack Development Assistant
          </motion.h1>
          <motion.p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get instant help with React, Django, databases, deployment, and more! 
            I'm here to solve your development challenges 24/7.
          </motion.p>
        </div>
      </motion.section>

      {/* Chat Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2, duration: 0.6 }} 
        className="py-16 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="w-full mb-6 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="chat" className="flex-1 flex items-center gap-2">
                <Bot size={18} />
                AI Assistant Chat
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex-1 flex items-center gap-2">
                <Lightbulb size={18} />
                Quick Help
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <Card className="border-none shadow-2xl overflow-hidden bg-white dark:bg-gray-800">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <Bot size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Sumit Kumar - Dev Assistant</h3>
                        <p className="text-sm opacity-90">Full Stack Developer • Always Online</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">Online</span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <CardContent className="p-0">
                  <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-gray-900/50">
                    <AnimatePresence>
                      {messages.map((msg) => (
                        <motion.div 
                          key={msg.id} 
                          initial={{ opacity: 0, y: 20 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: -20 }}
                          layout 
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
                            msg.sender === 'user' 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-sm' 
                              : msg.isBot 
                                ? 'bg-white dark:bg-gray-800 border-2 border-blue-100 dark:border-blue-900 rounded-tl-sm'
                                : 'bg-gray-200 dark:bg-gray-700 rounded-tl-sm'
                          }`}>
                            {msg.isBot && (
                              <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-blue-100 dark:border-blue-900">
                                <Bot size={16} className="text-blue-600 dark:text-blue-400" />
                                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">AI Assistant</span>
                              </div>
                            )}
                            <div 
                              className={`${msg.isBot ? 'prose prose-sm max-w-none dark:prose-invert' : ''}`}
                              dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                            />
                            <div className={`text-xs mt-2 flex items-center ${
                              msg.sender === 'user' ? 'text-white/70 justify-end' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              <Clock size={12} className="mr-1" />
                              {formatTime(msg.timestamp)}
                            </div>
                          </div>
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
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border-2 border-blue-100 dark:border-blue-900 rounded-tl-sm">
                          <div className="flex items-center space-x-2 mb-2">
                            <Bot size={16} className="text-blue-600 dark:text-blue-400" />
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">AI Assistant is typing...</span>
                          </div>
                          <div className="flex space-x-1">
                            {[0, 0.2, 0.4].map((delay, i) => (
                              <motion.div 
                                key={i} 
                                animate={{ scale: [0.8, 1.2, 0.8] }} 
                                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay }} 
                                className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-300" 
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messageEndRef} />
                  </div>

                  {/* Quick Questions */}
                  <div className="px-6 py-4 bg-gray-100 dark:bg-gray-800 border-t">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Quick questions:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {quickQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setMessage(question)}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-6 border-t bg-white dark:bg-gray-800">
                    <div className="flex space-x-3">
                      <Textarea
                        placeholder="Ask me anything about full-stack development..."
                        className="resize-none dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={2}
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6"
                        disabled={!message.trim()}
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Press Enter to send • Shift+Enter for new line
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card className="border-none shadow-2xl bg-white dark:bg-gray-800">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Development Help Center
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      {
                        category: "Frontend Development",
                        icon: "🎨",
                        questions: [
                          "How to build React components?",
                          "State management with Redux/Context",
                          "Responsive design with Tailwind CSS",
                          "TypeScript best practices"
                        ]
                      },
                      {
                        category: "Backend Development", 
                        icon: "⚡",
                        questions: [
                          "Creating REST APIs with Django",
                          "Node.js and Express setup",
                          "Database integration",
                          "Authentication & Authorization"
                        ]
                      },
                      {
                        category: "Database Design",
                        icon: "🗄️", 
                        questions: [
                          "MongoDB vs MySQL comparison",
                          "Database schema design",
                          "Query optimization",
                          "Data relationships"
                        ]
                      },
                      {
                        category: "Deployment & DevOps",
                        icon: "🚀",
                        questions: [
                          "Deploy to Firebase/Vercel",
                          "Docker containerization", 
                          "CI/CD with GitHub Actions",
                          "Environment configuration"
                        ]
                      }
                    ].map((section, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <span className="text-2xl">{section.icon}</span>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{section.category}</h3>
                        </div>
                        <div className="space-y-3">
                          {section.questions.map((question, j) => (
                            <button
                              key={j}
                              onClick={() => {
                                setMessage(question);
                                // Switch to chat tab
                                const chatTab = document.querySelector('[value="chat"]') as HTMLElement;
                                chatTab?.click();
                              }}
                              className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>
    </>
  );
};

export default ChatPage;